import { For } from 'solid-js';
import { A, useLocation } from 'solid-start';

export function NavMenu() {
  const location = useLocation();

  function active(path: string) {
    return path === location.pathname
      ? 'border-primary-focus'
      : 'border-transparent hover:border-primary-focus';
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
  ];

  return (
    <ul class="flex items-center">
      <For each={navItems}>
        {(item) => (
          <li class={`border-b-2 ${active(item.path)} mx-1.5 transition-colors sm:mx-6`}>
            <A href={item.path}>{item.label}</A>
          </li>
        )}
      </For>
    </ul>
  );
}
