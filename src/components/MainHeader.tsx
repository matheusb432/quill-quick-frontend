import { Logo } from './Logo';
import { NavMenu } from './NavMenu';

export function MainHeader() {
  return (
    <nav class=" bg-green-500 h-16 flex px-6 justify-between items-center">
      <div class="flex gap-x-2 items-center">
        <Logo type="normal" />
        <h1 class="text-xl font-serif">Quill Quick</h1>
      </div>

      <NavMenu />
    </nav>
  );
}
