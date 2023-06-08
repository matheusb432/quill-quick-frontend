import { Ping } from '~/components/Ping';
import { Slogan } from '~/components/Slogan';

export default function Home() {
  return (
    <>
      <Slogan />
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
