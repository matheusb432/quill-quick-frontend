import { Ping } from '~/components/Ping';

export default function Home() {
  return (
    <>
      <h1 class="text-6xl font-thin uppercase text-green-500 ">Hello world!</h1>
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
