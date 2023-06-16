import { createApi } from '~/core/store/create-api';
import { PostRes } from '~/core/types/api-types';
import { ODataOptions } from '~/core/types/odata-types';
import { PaginatedResult, PaginationOptions } from '~/core/types/pagination-types';
import { odataUtil } from '~/core/util/odata-util';
import { Book } from '../types/book';

export function createBookApi() {
  const { send, omitId, withId } = createApi();

  const get = (opt: ODataOptions) => send<Book[]>('get', odataUtil.build('/books', opt));
  function paginated(opt: PaginationOptions) {
    return send<PaginatedResult<Book>>('get', odataUtil.buildPaginated('/books', opt));
  }
  async function byId(id: number) {
    const res = await get({ filter: { id } });
    return res[0] ?? null;
  }
  const create = (book: Book) => send<PostRes, Book>('post', '/books', book);
  const duplicate = (book: Book) => create(omitId(book));
  const update = (id: number, book: Book) => send<void, Book>('put', '/books', withId(id, book));
  const del = (id: number) => send('delete', `/books/${id}`);

  return {
    get,
    paginated,
    byId,
    create,
    duplicate,
    update,
    del,
  };
}
