import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { FormModes } from '~/core/types/form-types';
import { routerUtil } from '~/core/util/router-util';
import { createBookReviewAgent } from './store/agent';
import { createBookReviewForm } from './store/form';

export function createBookReview() {
  const navigate = useNavigate();
  const form = createBookReviewForm();
  const agent = createBookReviewAgent();

  function redirectToDetails(id: number, mode: FormModes = FormModes.Edit) {
    if (id == null) {
      toastStore.actions.asError('Failed to redirect to review details!');
      return;
    }

    navigate(
      routerUtil.replaceDetailParams(RoutePaths.BookReviewDetail, {
        id,
        mode,
      }),
      { state: routerUtil.FORCE_LEAVE_STATE },
    );
  }

  return {
    form,
    redirectToDetails,
    redirectToList: () => navigate(RoutePaths.BookReviews, { state: routerUtil.FORCE_LEAVE_STATE }),
    ...agent,
  };
}
