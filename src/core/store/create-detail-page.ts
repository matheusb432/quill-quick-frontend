import { CreateQueryResult } from '@tanstack/solid-query';
import { createEffect, createSignal, untrack } from 'solid-js';
import { useNavigate, useParams } from 'solid-start';
import { RoutePaths } from '../constants/route-paths';
import { FormModes } from '../types/form-types';
import { DetailParams } from '../types/router-types';
import { routerUtil } from '../util/router-util';
import { toastStore } from './toast-store';

export function createDetailPage<T>(
  page: string,
  query: CreateQueryResult<T>,
  redirectPath?: string,
) {
  const params = useParams<DetailParams>();
  const navigate = useNavigate();
  const title = () => routerUtil.buildTitle(mode(), 'Book');
  const [canNotify, setCanNotify] = createSignal(true);

  const mode = () => routerUtil.getMode(params.mode) as FormModes;

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
    navigate(redirectPath ?? RoutePaths.NotFound);
  }

  return {
    mode,
    title,
    redirect,
  };
}
