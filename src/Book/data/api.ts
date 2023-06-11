import axios from 'axios';
import { apiUtil } from '~/core/util/api-util';
import { Book } from '../types/book';
import { PostRes } from '~/core/types/api-types';
import { ODataOptions } from '~/core/types/odata-types';
import { odataUtil } from '~/core/util/odata-util';

const api = axios.create({
  baseURL: apiUtil.createUrl('books'),
});

function get(options: ODataOptions = {}) {
  const params = odataUtil.buildParams(options);
  return apiUtil.reqToData(api.get<Book[]>('', { params }));
}

async function getById(id: number) {
  const res = await get({ filter: { id } });
  return res[0] ?? null;
}

function create(book: Book) {
  return apiUtil.reqToData(api.post<PostRes>('', book));
}

function update(book: Book) {
  return api.put<void>('', book);
}

function remove(id: number) {
  return api.delete<void>(`/${id}`);
}

export const bookApi = {
  get,
  getById,
  create,
  update,
  remove,
};
