import { For, Show } from 'solid-js';
import { A } from 'solid-start';
import { HIPaperAirplane } from '~/assets/icons/HIPaperAirplane';

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav class="border-b-2 border-primary pb-4 mb-5">
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
      <li class="flex justify-center items-center gap-x-2 text-xl text-primary transition-all group cursor-pointer">
        <Show when={props.path} fallback={<span>{props.label}</span>}>
          <A class="group-hover:underline transition" href={props.path as string}>
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
