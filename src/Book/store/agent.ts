import { createMutation } from '@tanstack/solid-query';
import { createFeatureApi } from '~/core/store/create-feature-api';
import { toastStore } from '~/core/store/toast-store';
import { apiUtil } from '~/core/util/api-util';
import { Book } from '../types/book';

export function createBookAgent() {
  const api = createFeatureApi<Book>('/books');
  const notifications = apiUtil.buildNotifications('Book');

  function notifySuccess(key: keyof (typeof notifications)['success']) {
    toastStore.actions.asSuccess(notifications.success[key]);
  }

  const updateMut = createMutation({
    mutationKey: api.keys.update,
    mutationFn: (data: Book & { id: number }) => api.update(data.id, data),
    onSuccess: (res, data) => {
      notifySuccess('update');
      api.invalidate(data.id);
    },
  });

  const delMut = createMutation({
    mutationKey: api.keys.del,
    mutationFn: (id: number) => api.del(id),
    onSuccess: (res, id) => {
      notifySuccess('delete');
      api.invalidate(id);
    },
  });

  const duplicateMut = createMutation({
    mutationKey: api.keys.duplicate,
    mutationFn: (data: Book) => api.duplicate(data),
    onSuccess: () => {
      notifySuccess('duplicate');
      api.invalidate(undefined, { cancelRefetch: true });
    },
  });

  const addMut = createMutation({
    mutationKey: api.keys.add,
    mutationFn: (data: Book) => api.create(data),
    onSuccess: () => {
      notifySuccess('create');
      api.invalidate();
    },
  });

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
