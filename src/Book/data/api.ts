import axios from 'axios';
import { apiUtil } from '~/core/util/api-util';
import { Book } from '../types/book';
import { PostRes } from '~/core/types/api-types';

const api = axios.create({
  baseURL: apiUtil.createUrl('books'),
});

function get() {
  return api.get<Book[]>('');
}

function create(book: Book) {
  return api.post<PostRes>('', book);
}

function update(book: Book) {
  return api.put<void>('', book);
}

function remove(id: number) {
  return api.delete<void>(`/${id}`);
}

export const bookApi = {
  get,
  create,
  update,
  remove,
};
