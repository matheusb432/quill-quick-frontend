import { A } from 'solid-start';

export default function NotFound() {
  return (
    <main class="text-gray-700 mx-auto p-4 text-center">
      <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-primary">Page Not Found!</h1>
      <p class="my-4">
        <A href="/" class="text-4xl text-green-600 hover:underline">
          Home
        </A>
      </p>
    </main>
  );
}
