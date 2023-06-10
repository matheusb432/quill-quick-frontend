// @refresh reload
import { Body, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from 'solid-start';
import { RootLayout } from './components/RootLayout';
import './root.css';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/solid-query';

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
      // NOTE Global error handler, only shows error once for each query
      onError: (error) => {
        console.warn(error);
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
    </Html>
  );
}
