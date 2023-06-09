import { Logo } from '~/Home/Logo';
import { Slogan } from '~/Home/Slogan';
import { Heading } from '~/components/Heading';
import { Ping } from '~/components/Ping';

export default function Home() {
  return (
    <>
      <header class="px-6 py-8">
        <Heading class="font-sans font-normal mb-4">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-sans text-4xl font-bold text-green-300">Home</span>
        <span class="font-hand text-4xl font-bold text-green-500">Home</span>
        <span class="font-serif text-4xl font-bold text-green-700">Home</span>
        <span class="text-4xl font-bold text-green-700">Home</span>
        <Ping />
      </p>
    </>
  );
}
