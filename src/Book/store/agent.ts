import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { createFeatureApi } from '~/core/store/create-feature-api';
import { toastStore } from '~/core/store/toast-store';
import { apiUtil } from '~/core/util/api-util';
import { Book } from '../types/book';
import { PostRes } from '~/core/types/api-types';

export function createBookAgent() {
  const api = createFeatureApi<Book>('/books');
  const notifications = apiUtil.buildNotifications('Book');
  const client = useQueryClient();

  function notifySuccess(key: keyof (typeof notifications)['success']) {
    toastStore.actions.asSuccess(notifications.success[key]);
  }

  const updateMut = createMutation({
    mutationKey: api.keys.update,
    mutationFn: (data: Book & { id: number }) => api.update(data.id, data),
    onSuccess: (res, data) => {
      notifySuccess('update');
      setUpdatedData(data.id, data);
    },
  });

  const delMut = createMutation({
    mutationKey: api.keys.del,
    mutationFn: (id: number) => api.del(id),
    onSuccess: (res, id) => {
      notifySuccess('delete');
      setUpdatedData(id, null);
    },
  });

  const duplicateMut = createMutation({
    mutationKey: api.keys.duplicate,
    mutationFn: (data: Book) => api.duplicate(data),
    onSuccess: (res, data) => {
      notifySuccess('duplicate');
      setNewData(res, data);
    },
  });

  const addMut = createMutation({
    mutationKey: api.keys.add,
    mutationFn: (data: Book) => api.create(data),
    onSuccess: (res, data) => {
      notifySuccess('create');
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
    queryAs: api.queryAs,
    mutations: {
      update: updateMut,
      del: delMut,
      duplicate: duplicateMut,
      add: addMut,
    },
  };
}
