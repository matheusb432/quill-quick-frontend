import { CreateQueryResult } from '@tanstack/solid-query';
import { createEffect } from 'solid-js';
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

  const mode = () => routerUtil.getMode(params.mode) as FormModes;

  createEffect(() => {
    if (!Number.isNaN(+params.id)) return;

    toastStore.actions.asError(`Invalid ${page} ID!`);
    redirect();
  });

  createEffect(() => {
    const didNotFind = query.isSuccess && !query.data;
    if (!didNotFind) return;

    toastStore.actions.asWarning(`${page} with ID ${params.id} not found!`);
    redirect();
  });

  function redirect() {
    navigate(redirectPath ?? RoutePaths.NotFound);
  }

  return {
    mode,
    title,
  };
}
