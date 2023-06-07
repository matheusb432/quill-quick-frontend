// @refresh reload
import { Body, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from 'solid-start';
import { RootLayout } from './components/RootLayout';
import './root.css';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Quill Quick</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <RootLayout>
          <Routes>
            <FileRoutes />
          </Routes>
        </RootLayout>
        <Scripts />
      </Body>
    </Html>
  );
}
