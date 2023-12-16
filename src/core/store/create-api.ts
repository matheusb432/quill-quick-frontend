import axios from 'axios';
import { apiUtil } from '../util/api-util';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

export function createApi() {
  async function send<TResponse = void, TData = void>(
    method: ApiMethod,
    url: string,
    data?: TData,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      // TODO add auth token
      // Authorization: `Bearer ${}`
    };

    return apiUtil.responseToData(
      api.request<TResponse>({
        method,
        headers,
        url,
        data,
      }),
    );
  }

  function sendWithoutData(method: ApiMethod) {
    return <TResponse = void, TData = void>(url: string) => send<TResponse, TData>(method, url);
  }

  function sendWithData(method: ApiMethod) {
    return <TResponse = void, TData = void>(url: string, data?: TData) =>
      send<TResponse, TData>(method, url, data);
  }

  const get = sendWithoutData('get');
  const post = sendWithData('post');
  const put = sendWithData('put');
  const del = sendWithoutData('delete');

  return {
    send,
    get,
    post,
    put,
    del,
  };
}
