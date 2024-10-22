import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { createFeatureApi } from '~/core/store/create-feature-api';
import { toastStore } from '~/core/store/toast-store';
import { apiUtil } from '~/core/util/api-util';
import { Book } from '../types/book';
import { PostRes } from '~/core/types/api-types';

const url = '/books';

export function createBookApi() {
  return createFeatureApi<Book>(url);
}

export function createBookAgent() {
  const api = createBookApi();
  const { post, put, del } = api.api;
  const notifications = apiUtil.buildNotifications('Book');
  const client = useQueryClient();

  type tBookForm = Omit<Book, 'id'>;

  const mutApi = {
    create: (book: tBookForm) => post<PostRes, tBookForm>(url, book),
    duplicate: (book: tBookForm) => mutApi.create(book),
    update: (id: number, book: tBookForm) => put<void, Book>(url, { ...book, id }),
    del: (id: number) => del(`${url}/${id}`),
  };

  function notifySuccess(key: keyof (typeof notifications)['success']) {
    toastStore.actions.asSuccess(notifications.success[key]);
  }

  const updateMut = createMutation({
    mutationKey: api.keys.update,
    mutationFn: (data: Book & { id: number }) => mutApi.update(data.id, data),
    onSuccess: async (res, data) => {
      notifySuccess('update');
      await api.invalidate();
      setUpdatedData(data.id, data);
    },
  });

  const delMut = createMutation({
    mutationKey: api.keys.del,
    mutationFn: (id: number) => mutApi.del(id),
    onSuccess: async () => {
      notifySuccess('delete');
      await api.invalidate();
    },
  });

  const duplicateMut = createMutation({
    mutationKey: api.keys.duplicate,
    mutationFn: (data: Book) => mutApi.duplicate(data),
    onSuccess: async (res, data) => {
      notifySuccess('duplicate');
      await api.invalidate();
      setNewData(res, data);
    },
  });

  const addMut = createMutation({
    mutationKey: api.keys.add,
    mutationFn: (data: Book) => mutApi.create(data),
    onSuccess: async (res, data) => {
      notifySuccess('create');
      await api.invalidate();
      setNewData(res, data);
    },
  });

  function setUpdatedData(id: number, data: Book | null) {
    client.setQueryData(api.keys.id(id), data);
  }

  function setNewData(res: PostRes, data: Book) {
    const createdId = res.id;
    client.setQueryData(api.keys.id(createdId), { ...data, id: createdId });
  }

  return {
    api,
    queryAs: api.queryAs,
    mutations: {
      update: updateMut,
      del: delMut,
      duplicate: duplicateMut,
      add: addMut,
    },
  };
}
