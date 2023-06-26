import { InvalidateOptions, createQuery, useQueryClient } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { WithId } from '../types/model-types';
import { ODataOptions } from '../types/odata-types';
import { PaginatedResult, PaginationOptions } from '../types/pagination-types';
import { odataUtil } from '../util/odata-util';
import { createApi } from './create-api';

export function createFeatureApi<TEntity extends WithId>(featureUrl: string) {
  const api = createApi();
  const baseKey = keyFromUrl(featureUrl);
  const client = useQueryClient();
  const keys = {
    base: baseKey,
    id: (id: IdType) => [...baseKey, `${id}`],
    add: [...baseKey, 'add'],
    duplicate: [...baseKey, 'duplicate'],
    update: [...baseKey, 'update'],
    del: [...baseKey, 'del'],
  };

  type IdType = number | string;
  type QueryEntity = TEntity & { id: IdType };

  const query = (opt: ODataOptions) => api.get<QueryEntity[]>(odataUtil.query(featureUrl, opt));

  const paginated = (opt: PaginationOptions) =>
    api.get<PaginatedResult<QueryEntity>>(odataUtil.paginated(featureUrl, opt));

  const byId = async (id: IdType) => {
    const res = await query({ filter: { id } });
    return res[0] ?? null;
  };

  function keyFromUrl(url: string | undefined): string[] {
    return url?.split('/')?.filter((x) => !!x) || [];
  }

  function keyWithParams(params: Record<string, unknown>) {
    return [baseKey, params].filter((x) => !!x);
  }

  const createPaginatedQuery = (opt: Accessor<PaginationOptions>) => {
    return createQuery({
      queryKey: () => keyWithParams(opt()),
      queryFn: () => paginated(opt()),
    });
  };

  const createDetailQuery = (id: Accessor<IdType>) => {
    return createQuery({
      queryKey: () => keys.id(id()),
      queryFn: () => byId(id()),
      get enabled() {
        return !!id();
      },
    });
  };

  function getQueryKey(paramsOrId?: Record<string, unknown> | IdType) {
    if (typeof paramsOrId === 'number' || typeof paramsOrId === 'string') {
      return keys.id(paramsOrId);
    }
    if (paramsOrId != null) {
      return keyWithParams(paramsOrId);
    }

    return baseKey;
  }

  function invalidate(paramsOrId?: Record<string, unknown> | IdType, opts?: InvalidateOptions) {
    const keyToInvalidate = getQueryKey(paramsOrId);

    return client.invalidateQueries({ queryKey: keyToInvalidate }, opts);
  }

  return {
    keys,
    keyWithParams,
    invalidate,
    query,
    paginated,
    byId,
    api,

    queryAs: {
      paginated: createPaginatedQuery,
      byId: createDetailQuery,
    },
  };
}
