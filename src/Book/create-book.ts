import { BeforeLeaveEventArgs } from '@solidjs/router';
import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { routerUtil } from '~/core/util/router-util';
import { createBookAgent } from './store/agent';
import { createBookForm } from './store/form';
import { FormModes } from '~/core/types/form-types';

export function createBook() {
  const navigate = useNavigate();
  const form = createBookForm();
  const agent = createBookAgent();

  function preventUnsavedChangesExit(e: BeforeLeaveEventArgs) {
    const { dirty, submitted } = form[0];
    routerUtil.unsavedChangesGuard(e, dirty, submitted);
  }

  function redirectToDetails(id: number, mode: FormModes = FormModes.Edit) {
    if (id == null) {
      toastStore.actions.asError('Failed to redirect to book details!');
      return;
    }

    navigate(
      routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
        id,
        mode,
      }),
      { state: routerUtil.FORCE_LEAVE_STATE },
    );
  }

  const redirectToCreate = () =>
    navigate(RoutePaths.BookCreate, { state: routerUtil.FORCE_LEAVE_STATE });

  function redirectToCreateReview(bookId: number) {
    if (bookId == null) {
      toastStore.actions.asError('Failed to redirect to create review!');
      return;
    }

    navigate(
      routerUtil.replaceCreateReviewParams(RoutePaths.BookReviewCreate, {
        id: bookId,
      }),
      { state: routerUtil.FORCE_LEAVE_STATE },
    );
  }

  return {
    form,
    onBeforeLeave: preventUnsavedChangesExit,
    redirectToDetails,
    redirectToCreate,
    redirectToCreateReview,
    redirectToList: () => navigate(RoutePaths.Books, { state: routerUtil.FORCE_LEAVE_STATE }),
    ...agent,
  };
}
