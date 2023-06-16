import { BeforeLeaveEventArgs } from '@solidjs/router';
import { createMutation, createQuery } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { PostRes } from '~/core/types/api-types';
import { PaginationOptions } from '~/core/types/pagination-types';
import { routerUtil } from '~/core/util/router-util';
import { createBookAgent } from './store/agent';
import { createBookForm } from './store/form';
import { Book } from './types/book';

export function createBook() {
  const navigate = useNavigate();
  const form = createBookForm();
  const agent = createBookAgent();
  // const { keys, keyWithParams } = agent;

  function preventUnsavedChangesExit(e: BeforeLeaveEventArgs) {
    const { dirty, submitted } = form[0];
    routerUtil.unsavedChangesGuard(e, dirty, submitted);
  }

  // const createPaginatedQuery = (opt: Accessor<PaginationOptions>) => {
  //   return createQuery({
  //     queryKey: () => keyWithParams(opt()),
  //     queryFn: () => agent.paginated(opt()),
  //   });
  // };

  // const createDetailQuery = (id: Accessor<number>) => {
  //   return createQuery({
  //     queryKey: () => keys.id(id()),
  //     queryFn: () => agent.byId(id()),
  //     get enabled() {
  //       return !!id();
  //     },
  //   });
  // };

  // const createUpdateMutation = (id: Accessor<number>) => {
  //   return createMutation({
  //     mutationKey: keys.update,
  //     mutationFn: (data: Book) => agent.update(id(), data),
  //     onSuccess: () => {
  //       toastStore.actions.asSuccess('Book successfully updated!');
  //       agent.invalidate();
  //     },
  //   });
  // };

  // const createDelMutation = (id: Accessor<number>, redirect: boolean) => {
  //   return createMutation({
  //     mutationKey: keys.del,
  //     mutationFn: () => agent.del(id()),
  //     onSuccess: () => {
  //       toastStore.actions.asSuccess('Book successfully deleted!');
  //       if (redirect) navigate(RoutePaths.Books);
  //       agent.invalidate();
  //     },
  //   });
  // };

  // const createDuplicateMutation = () => {
  //   return createMutation({
  //     mutationKey: keys.duplicate,
  //     mutationFn: (data: Book) => agent.duplicate(data),
  //     onSuccess: onCreateSuccess,
  //   });
  // };

  // const createAddMutation = () => {
  //   return createMutation({
  //     mutationKey: keys.add,
  //     mutationFn: (data: Book) => agent.create(data),
  //     onSuccess: onCreateSuccess,
  //   });
  // };

  function getDetailPath(id: number, mode: 'edit' | 'view') {
    return routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
      id,
      mode,
    });
  }

  function redirectToDetails(id: number) {
    // toastStore.actions.asSuccess('Book successfully created!');
    if (id == null) {
      toastStore.actions.asWarning('Failed to redirect to book details!');
      return;
    }
    // const detailPath = routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
    //   id: createdId,
    //   mode: 'edit',
    // });
    navigate(getDetailPath(id, 'edit'));
    // agent.invalidate();
  }

  return {
    form,
    onBeforeLeave: preventUnsavedChangesExit,
    redirectToDetails,
    ...agent,
    // onCreateSuccess,
    // queryAs: {
    //   byId: createDetailQuery,
    //   paginated: createPaginatedQuery,
    // },
    // mutationAs: {
    //   add: createAddMutation,
    //   update: createUpdateMutation,
    //   del: createDelMutation,
    //   duplicate: createDuplicateMutation,
    // },
  };
}
