import { BeforeLeaveEventArgs } from '@solidjs/router';
import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { routerUtil } from '~/core/util/router-util';
import { createBookReviewAgent } from './store/agent';
import { createBookReviewForm } from './store/form';
import { FormModes } from '~/core/types/form-types';

type ValidModes = FormModes.Edit | FormModes.View;

export function createBookReview() {
  const navigate = useNavigate();
  const form = createBookReviewForm();
  const agent = createBookReviewAgent();

  function preventUnsavedChangesExit(e: BeforeLeaveEventArgs) {
    const { dirty, submitted } = form[0];
    routerUtil.unsavedChangesGuard(e, dirty, submitted);
  }

  function redirectToDetails(id: number, mode: ValidModes = FormModes.Edit) {
    if (id == null) {
      toastStore.actions.asError('Failed to redirect to review details!');
      return;
    }

    navigate(
      routerUtil.replaceDetailParams(RoutePaths.BookReviews, {
        id,
        mode,
      }),
    );
  }

  function redirectToCreate(id: number) {
    if (id == null) {
      toastStore.actions.asError('Failed to redirect to create review!');
      return;
    }

    navigate(
      routerUtil.replaceCreateReviewParams(RoutePaths.BookReviewCreate, {
        id,
      }),
    );
  }

  return {
    form,
    onBeforeLeave: preventUnsavedChangesExit,
    redirectToDetails,
    redirectToCreate,
    ...agent,
  };
}
