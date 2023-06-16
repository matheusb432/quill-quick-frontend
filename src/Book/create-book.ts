import { BeforeLeaveEventArgs } from '@solidjs/router';
import { createMutation, createQuery, useQueryClient } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { PostRes } from '~/core/types/api-types';
import { PaginatedResult, PaginationOptions } from '~/core/types/pagination-types';
import { routerUtil } from '~/core/util/router-util';
import { createBookApi } from './store/api';
import { createBookForm } from './store/form';
import { Book } from './types/book';

export function createBook() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const api = createBookApi();
  const form = createBookForm();
  const baseKey = 'books';

  function onBeforeLeave(e: BeforeLeaveEventArgs) {
    const { dirty, submitted } = form[0];
    routerUtil.unsavedChangesGuard(e, dirty, submitted);
  }

  const createPaginatedQuery = (opt: Accessor<PaginationOptions>) => {
    return createQuery<PaginatedResult<Book>>({
      queryKey: () => [baseKey, opt()],
      queryFn: () => api.paginated(opt()),
    });
  };

  const createDetailQuery = (id: Accessor<number>) => {
    return createQuery<Book>({
      queryKey: () => [baseKey, id()],
      queryFn: () => api.byId(id()),
      get enabled() {
        return !!id();
      },
    });
  };

  const createUpdateMutation = (id: Accessor<number>) => {
    return createMutation({
      mutationKey: [baseKey, 'update'],
      mutationFn: (data: Book) => api.update(id(), data),
      onSuccess: () => {
        toastStore.actions.asSuccess('Book successfully updated!');
        invalidateQueries();
      },
    });
  };

  const createDelMutation = (id: Accessor<number>, redirect: boolean) => {
    return createMutation({
      mutationKey: [baseKey, 'remove'],
      mutationFn: () => api.del(id()),
      onSuccess: () => {
        toastStore.actions.asSuccess('Book successfully deleted!');
        if (redirect) navigate(RoutePaths.Books);
        invalidateQueries();
      },
    });
  };

  const createDuplicateMutation = () => {
    return createMutation({
      mutationKey: [baseKey, 'duplicate'],
      mutationFn: (data: Book) => api.duplicate(data),
      onSuccess: onCreateSuccess,
    });
  };

  const createAddMutation = () => {
    return createMutation({
      mutationKey: ['book', 'add'],
      mutationFn: (data: Book) => api.create(data),
      onSuccess: onCreateSuccess,
    });
  };

  function onCreateSuccess(res: PostRes) {
    const createdId = res?.id;
    toastStore.actions.asSuccess('Book successfully created!');
    if (!createdId) {
      toastStore.actions.asWarning('Failed to redirect to book details!');
      return;
    }
    const detailPath = routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
      id: createdId,
      mode: 'edit',
    });
    navigate(detailPath);
    invalidateQueries();
  }

  function invalidateQueries() {
    client.invalidateQueries([baseKey]);
  }

  return {
    form,
    onBeforeLeave,
    onCreateSuccess,
    queryAs: {
      byId: createDetailQuery,
      paginated: createPaginatedQuery,
    },
    mutationAs: {
      add: createAddMutation,
      update: createUpdateMutation,
      del: createDelMutation,
      duplicate: createDuplicateMutation,
    },
  };
}
