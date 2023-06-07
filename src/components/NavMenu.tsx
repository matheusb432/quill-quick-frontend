import { For } from 'solid-js';
import { A, useLocation } from 'solid-start';

export function NavMenu() {
  const location = useLocation();

  function active(path: string) {
    return path === location.pathname
      ? 'border-green-500'
      : 'border-transparent hover:border-green-500';
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
  ];

  return (
    <ul class="flex items-center text-gray-200">
      <For each={navItems}>
        {(item) => (
          <li class={`border-b-2 ${active(item.path)} mx-1.5 sm:mx-6`}>
            <A href={item.path}>{item.label}</A>
          </li>
        )}
      </For>
    </ul>
  );
}
