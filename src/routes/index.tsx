import { Ping } from '~/components/Ping';

export default function Home() {
  return (
    <>
      <h1 class="text-6xl text-green-500 font-thin uppercase ">Hello world!</h1>
      <p class="my-4 gap-x-4 flex justify-center align-center">
        <span class="font-bold font-sans text-green-300 text-4xl">Home</span>
        <span class="font-bold font-hand text-green-500 text-4xl">Home</span>
        <span class="font-bold font-serif text-green-700 text-4xl">Home</span>
        <span class="font-bold text-green-700 text-4xl">Home</span>
        <Ping />
      </p>
    </>
  );
}
