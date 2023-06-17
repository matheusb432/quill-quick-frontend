import { Slogan } from '~/Home/Slogan';
import { Heading } from '~/components/Heading';
import { MainContainer } from '~/components/MainContainer';

export default function Home() {
  return (
    <MainContainer>
      <header class="mt-6">
        <Heading class="mb-4 font-sans font-normal">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-hand text-4xl font-bold text-primary">Home</span>
        <span class="font-serif text-4xl font-bold text-primary">Home</span>
        <span class="text-4xl font-bold text-primary">Home</span>
      </p>
    </MainContainer>
  );
}
