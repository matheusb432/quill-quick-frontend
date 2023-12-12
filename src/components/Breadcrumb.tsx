import { For, Show } from 'solid-js';
import { A } from 'solid-start';
import { HIPaperAirplane } from '~/assets/icons/HIPaperAirplane';

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav class="mb-5 border-b-2 border-primary pb-4">
      <Crumbs crumbs={props.crumbs} />
    </nav>
  );
}

interface CrumbsProps {
  crumbs: Crumb[];
}

export function Crumbs(props: CrumbsProps) {
  return (
    <ol class="flex items-center gap-x-4">
      <For each={props.crumbs}>
        {(item, index) => <CrumbItem isLast={index() === props.crumbs.length - 1} {...item} />}
      </For>
    </ol>
  );
}

type CrumbItemProps = Crumb & {
  isLast: boolean;
};

export function CrumbItem(props: CrumbItemProps) {
  return (
    <>
      <li class="group flex items-center justify-center gap-x-2 text-xl text-primary transition-all">
        <Show when={props.path && !props.isLast} fallback={<span>{props.label}</span>}>
          <A class="transition group-hover:underline" href={props.path as string}>
            {props.label}
          </A>
        </Show>
      </li>
      <HIPaperAirplane class="h-5 w-5 text-primary" />
    </>
  );
}

export type Crumb = {
  label: string;
  path?: string;
};
