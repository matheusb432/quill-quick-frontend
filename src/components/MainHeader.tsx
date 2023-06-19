import { Logo } from '~/Home/Logo';
import { NavMenu } from './NavMenu';
import { A } from 'solid-start';
import { RoutePaths } from '~/core/constants/route-paths';

export function MainHeader() {
  return (
    <nav class="flex h-14 sticky top-0 items-center z-10 justify-between bg-primary text-primary-content px-6">
      <A href={RoutePaths.Home}>
        <div class="flex items-center gap-x-2 active:scale-95 transition">
          <Logo type="rounded" />
          <h1 class="font-serif text-xl">Quill Quick</h1>
        </div>
      </A>

      <NavMenu />
    </nav>
  );
}
