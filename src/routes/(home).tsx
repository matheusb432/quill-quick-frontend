import { Slogan } from '~/Home/Slogan';
import { Alert } from '~/components/Alert';
import { Heading } from '~/components/Heading';

export default function Home() {
  return (
    <>
      <Alert type="info">Greetings</Alert>

      <header class="px-6 py-8">
        <Heading class="mb-4 font-sans font-normal">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-sans text-4xl font-bold text-green-300">Home</span>
        <span class="font-hand text-4xl font-bold text-accent">Home</span>
        <span class="font-serif text-4xl font-bold text-green-700">Home</span>
        <span class="text-4xl font-bold text-green-700">Home</span>
      </p>
    </>
  );
}
