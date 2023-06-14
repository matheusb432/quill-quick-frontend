// @refresh reload
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Body, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from 'solid-start';
import { ToastQueue } from '~/components/ToastQueue';
import { RootLayout } from './components/RootLayout';
import { ElementIds } from './core/constants/element-ids';
import { toastStore } from './core/data/toast-store';
import { ToastAs } from './core/types/toast-types';
import './root.css';
import { RootDialog } from './components/RootDialog';

const ONE_HOUR = 1000 * 60 * 60;

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        staleTime: ONE_HOUR,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        toastStore.actions.next(ToastAs.error('Failed to load data!'));
      },
    }),
  });

  return (
    <Html lang="en">
      <Head>
        <Title>Quill Quick</Title>
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
