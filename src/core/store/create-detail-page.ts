import { CreateQueryResult } from '@tanstack/solid-query';
import { createEffect, createSignal, untrack } from 'solid-js';
import { useNavigate, useParams } from 'solid-start';
import { RoutePaths } from '../constants/route-paths';
import { FormModes } from '../types/form-types';
import { DetailParams } from '../types/router-types';
import { routerUtil } from '../util/router-util';
import { toastStore } from './toast-store';

/**
 * @description
 * Provides common functionality for detail pages.
 *
 * Handles page redirection on invalid ID or not found entity.
 *
 * @param page The page name, e.g. "Some Review".
 * @param query The search by ID query.
 * @param redirectPath The path to redirect to, ideally the list of the entity.
 */
export function createDetailPage<T>(
  page: string,
  query: CreateQueryResult<T>,
  redirectPath?: string,
) {
  const params = useParams<DetailParams>();
  const navigate = useNavigate();
  const title = () => routerUtil.buildTitle(mode(), page);
  const [canNotify, setCanNotify] = createSignal(true);

  const mode = () => params.mode as FormModes;

  createEffect(() => {
    if (!Number.isNaN(+params.id)) return;

    if (untrack(canNotify)) toastStore.actions.asError(`Invalid ${page} ID!`);
    redirect();
  });

  createEffect(() => {
    if (params.id) setCanNotify(true);
  });

  createEffect(() => {
    const didNotFind = query.isSuccess && !query.data;
    if (!didNotFind) {
      if (query.isFetched) setCanNotify(false);
      return;
    }

    if (untrack(canNotify)) toastStore.actions.asWarning(`${page} with ID ${params.id} not found!`);
    redirect();
  });

  function redirect() {
    navigate(redirectPath ?? RoutePaths.NotFound, { state: routerUtil.FORCE_LEAVE_STATE });
  }

  return {
    mode,
    title,
    redirect,
  };
}
