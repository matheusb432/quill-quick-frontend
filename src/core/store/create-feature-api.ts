import { InvalidateOptions, QueryKey, createQuery, useQueryClient } from '@tanstack/solid-query';
import { createApi } from './create-api';
import { WithId } from '../types/model-types';
import { send } from 'vite';
import { PostRes } from '../types/api-types';
import { ODataOptions } from '../types/odata-types';
import { PaginationOptions, PaginatedResult } from '../types/pagination-types';
import { odataUtil } from '../util/odata-util';
import { Accessor } from 'solid-js';

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
  type PostEntity = Omit<TEntity, 'id'>;

  const omitId = (obj: TEntity): PostEntity => ({ ...obj, id: undefined });
  const withId = (id: IdType, obj: TEntity) => ({ ...obj, id });

  const query = (opt: ODataOptions) => api.get<TEntity[]>(odataUtil.query(featureUrl, opt));

  const paginated = (opt: PaginationOptions) =>
    api.get<PaginatedResult<TEntity>>(odataUtil.paginated(featureUrl, opt));

  const byId = (id: IdType) => query({ filter: { id } });

  const create = (book: PostEntity) => api.post<PostRes, PostEntity>(featureUrl, book);

  const duplicate = (book: TEntity) => create(omitId(book));

  const update = (id: number, book: TEntity) =>
    api.put<void, TEntity>(featureUrl, withId(id, book));

  const del = (id: number) => api.del(`${featureUrl}/${id}`);

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
      select: (data) => data[0] ?? null,
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
    create,
    duplicate,
    update,
    del,
    queryAs: {
      paginated: createPaginatedQuery,
      byId: createDetailQuery,
    },
  };
}
