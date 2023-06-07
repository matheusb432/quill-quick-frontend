import { A } from 'solid-start';

export function MainHeader() {
  const active = (path: string) =>
    path == location.pathname ? 'border-green-500' : 'border-transparent hover:border-green-500';

  return (
    <nav class="bg-green-700">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active('/')} mx-1.5 sm:mx-6`}>
          <A href="/">Home</A>
        </li>
      </ul>
    </nav>
  );
}
