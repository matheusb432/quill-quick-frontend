import { Slogan } from '~/Home/Slogan';
import { Alert } from '~/components/Alert';
import { Breadcrumb } from '~/components/Breadcrumb';
import { Heading } from '~/components/Heading';
import { MainContainer } from '~/components/MainContainer';

export default function Home() {
  return (
    <MainContainer>
      <Alert type="info" title={<span>Info</span>}>
        <p>Info</p>
      </Alert>
      <Alert type="success" title={<span>Success</span>}>
        <p>Success</p>
      </Alert>
      <Alert type="warning" title={<span>Warning</span>}>
        <p>Warning</p>
      </Alert>
      <Alert type="error" title={<span>Error</span>}>
        <p>Error</p>
      </Alert>
      <header class="mt-6">
        <Heading class="mb-4 font-sans font-normal">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-sans text-4xl font-bold text-green-300">Home</span>
        <span class="font-hand text-4xl font-bold text-accent">Home</span>
        <span class="font-serif text-4xl font-bold text-green-700">Home</span>
        <span class="text-4xl font-bold text-green-700">Home</span>
      </p>
    </MainContainer>
  );
}
