import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { createFeatureApi } from '~/core/store/create-feature-api';
import { toastStore } from '~/core/store/toast-store';
import { apiUtil } from '~/core/util/api-util';
import { PostRes } from '~/core/types/api-types';
import { BookReview, tBookReviewForm } from '../types';
import { CreateBookReviewCommand, UpdateBookReviewCommand } from '../types/api-types';

const url = '/bookreviews';

export function createBookReviewApi() {
  return createFeatureApi<BookReview>(url);
}

export function createBookReviewAgent() {
  const api = createBookReviewApi();
  const { post, put, del } = api.api;
  const notifications = apiUtil.buildNotifications('Book review');
  const client = useQueryClient();

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
    mutationFn: (data: tBookReviewForm & { id: number }) => mutApi.update(data.id, data),
    onSuccess: (res, data) => {
      notifySuccess('update');
      setUpdatedData(data.id, data);
    },
  });

  const delMut = createMutation({
    mutationKey: api.keys.del,
    mutationFn: (id: number) => mutApi.del(id),
    onSuccess: (res, id) => {
      notifySuccess('delete');
      setUpdatedData(id, null);
    },
  });

  const addMut = createMutation({
    mutationKey: api.keys.add,
    mutationFn: mutApi.create,
    onSuccess: (res, data) => {
      notifySuccess('create');
      setNewData(res, data);
    },
  });

  function setUpdatedData(id: number, data: UpdateBookReviewCommand | null) {
    client.setQueryData(api.keys.id(id), data);
  }

  function setNewData(res: PostRes, data: CreateBookReviewCommand) {
    const createdId = res.id;
    client.setQueryData(api.keys.id(createdId), { ...data, id: createdId });
  }

  return {
    queryAs: api.queryAs,
    mutations: {
      update: updateMut,
      del: delMut,
      add: addMut,
    },
  };
}
