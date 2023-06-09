import { Logo } from '~/Home/Logo';
import { NavMenu } from './NavMenu';

export function MainHeader() {
  return (
    <nav class=" flex h-16 items-center justify-between bg-accent px-6">
      <div class="flex items-center gap-x-2">
        <Logo type="normal" />
        <h1 class="font-serif text-xl">Quill Quick</h1>
      </div>

      <NavMenu />
    </nav>
  );
}
