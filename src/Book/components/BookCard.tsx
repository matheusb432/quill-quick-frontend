import { HICheckBadge } from '~/assets/icons/HICheckBadge';
import { HIPencilSquare } from '~/assets/icons/HIPencilSquare';
import { HIStar } from '~/assets/icons/HIStar';
import { IconButton } from '~/components/IconButton';

export function BookCard() {
  return (
    <div class="relative h-72 w-56 shadow-lg">
      <article class="absolute z-20 flex h-full w-full flex-col items-center justify-between rounded-md rounded-bl-none border-4 border-l-0 border-green-700 bg-primary-light p-2">
        <h2 class="text-2xl font-semibold capitalize">Really long book title etc</h2>
        <IconButton iconFn={HIPencilSquare} />
        <footer class={'flex w-full items-center justify-between gap-x-2'}>
          <HICheckBadge class="h-12 w-12 text-accent" />
          <div class="flex items-end gap-x-2 text-3xl">
            3.5
            <HIStar class="h-12 w-12 text-yellow-500" />
          </div>
        </footer>
      </article>
      <div class="absolute left-[6px] top-2 z-10 h-full w-full scale-105 rounded-md rounded-bl-none border-4 border-green-700 bg-green-300" />
    </div>
  );
}
