import { Slogan } from '~/Home/Slogan';
import { Breadcrumb } from '~/components/Breadcrumb';
import { Heading } from '~/components/Heading';
import { MainContainer } from '~/components/MainContainer';

export default function Home() {
  return (
    <MainContainer>
      <Breadcrumb crumbs={[]} />
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
