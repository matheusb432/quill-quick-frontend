import { createMutation } from '@tanstack/solid-query';
import { createFeatureApi } from '~/core/store/create-feature-api';
import { toastStore } from '~/core/store/toast-store';
import { PostRes } from '~/core/types/api-types';
import { apiUtil } from '~/core/util/api-util';
import { BookReview } from '../types';
import { CreateBookReviewCommand, UpdateBookReviewCommand } from '../types/api-types';

const url = '/bookreviews';

export function createBookReviewApi() {
  return createFeatureApi<BookReview>(url);
}

export function createBookReviewAgent() {
  const api = createBookReviewApi();
  const { post, put, del } = api.api;
  const notifications = apiUtil.buildNotifications('Book review');

  const mutApi = {
    create: (book: CreateBookReviewCommand) => post<PostRes, CreateBookReviewCommand>(url, book),
    update: (id: number, book: UpdateBookReviewCommand) =>
      put<void, UpdateBookReviewCommand>(url, { ...book, id }),
    del: (id: number) => del(`${url}/${id}`),
  };

  function notifySuccess(key: keyof (typeof notifications)['success']) {
    toastStore.actions.asSuccess(notifications.success[key]);
  }

  const updateMut = createMutation({
    mutationKey: api.keys.update,
    mutationFn: (data: UpdateBookReviewCommand) => mutApi.update(data.id, data),
    onSuccess: async () => {
      notifySuccess('update');
      await api.invalidate();
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

  const addMut = createMutation({
    mutationKey: api.keys.add,
    mutationFn: mutApi.create,
    onSuccess: async () => {
      notifySuccess('create');
      await api.invalidate();
    },
  });

  return {
    api,
    queryAs: api.queryAs,
    mutations: {
      update: updateMut,
      del: delMut,
      add: addMut,
    },
  };
}
