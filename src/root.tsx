// @refresh reload
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Body, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from 'solid-start';
import { ToastQueue } from '~/components/ToastQueue';
import { RootLayout } from './components/RootLayout';
import { ElementIds } from './core/constants/element-ids';
import { toastStore } from './core/store/toast-store';
import { ToastAs } from './core/types/toast-types';
import './root.css';
import { RootDialog } from './components/RootDialog';
import { setZodGlobalErrorMap } from './core/constants/zod-error-map';
import { AxiosError } from 'axios';

const TEN_MINUTES = 1000 * 60 * 10;

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        staleTime: TEN_MINUTES,
        cacheTime: TEN_MINUTES * 2,
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: true,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => handleError(error as Error | AxiosError),
    }),
    mutationCache: new MutationCache({
      onError: (error) => handleError(error as Error | AxiosError),
    }),
  });

  setZodGlobalErrorMap();

  function handleError(error: Error | AxiosError) {
    if (error instanceof AxiosError) {
      console.warn('Axios error', error);
      handleNetworkError();
      return;
    }

    handleGenericError();
  }

  function handleGenericError() {
    toastStore.actions.next(ToastAs.error('Something went wrong!'));
  }

  function handleNetworkError() {
    toastStore.actions.next(ToastAs.error('There was an error connecting to the server!'));
  }

  return (
    <Html lang="en">
      <Head>
        <Title>Quill Quick</Title>
        <Link rel="icon" href="/logo.svg" />
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            <Routes>
              <FileRoutes />
            </Routes>
          </RootLayout>
        </QueryClientProvider>
        <Scripts />
      </Body>
      <div id={ElementIds.BackdropRoot} />
      <div id={ElementIds.OverlayRoot} />
      <ToastQueue />
      <RootDialog />
    </Html>
  );
}
