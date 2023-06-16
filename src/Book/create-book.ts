import { BeforeLeaveEventArgs } from '@solidjs/router';
import { useNavigate } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';
import { toastStore } from '~/core/store/toast-store';
import { routerUtil } from '~/core/util/router-util';
import { createBookAgent } from './store/agent';
import { createBookForm } from './store/form';

export function createBook() {
  const navigate = useNavigate();
  const form = createBookForm();
  const agent = createBookAgent();

  function preventUnsavedChangesExit(e: BeforeLeaveEventArgs) {
    const { dirty, submitted } = form[0];
    routerUtil.unsavedChangesGuard(e, dirty, submitted);
  }

  function getDetailPath(id: number, mode: 'edit' | 'view') {
    return routerUtil.replaceDetailParams(RoutePaths.BookDetail, {
      id,
      mode,
    });
  }

  function redirectToDetails(id: number) {
    if (id == null) {
      toastStore.actions.asWarning('Failed to redirect to book details!');
      return;
    }

    navigate(getDetailPath(id, 'edit'));
  }

  return {
    form,
    onBeforeLeave: preventUnsavedChangesExit,
    redirectToDetails,
    ...agent,
  };
}
