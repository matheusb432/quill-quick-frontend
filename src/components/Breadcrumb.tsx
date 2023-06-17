import { Component, For, Show } from 'solid-js';
import { A } from 'solid-start';
import { HIPaperAirplane } from '~/assets/icons/HIPaperAirplane';
import { HeroIconProps } from '~/assets/icons/types';
import { strUtil } from '~/core/util/str-util';

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <Show when={props.crumbs.length > 1}>
      <nav class="border-b-2 border-accent pb-4 mb-5">
        <Crumbs crumbs={props.crumbs} />
      </nav>
    </Show>
  );
}

interface CrumbsProps {
  crumbs: Crumb[];
}

export function Crumbs(props: CrumbsProps) {
  return (
    <ol class="flex items-center gap-x-6">
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
      <li
        class={strUtil.cx(
          'flex justify-center items-center gap-x-2 text-2xl text-accent transition-all hover:text-accent/80 active:text-accent/60 cursor-pointer',
          props.isLast && 'text-primary-text pointer-events-none',
        )}
      >
        {props.iconFn?.({ class: 'h-8 w-8' })}
        <Show when={props.path} fallback={<>{props.label}</>}>
          <A href={props.path as string}>{props.label}</A>
        </Show>
      </li>
      <Show when={!props.isLast}>
        <HIPaperAirplane class="h-5 w-5 text-black-300" />
      </Show>
    </>
  );
}

export type Crumb = {
  label: string;
  path?: string;
  iconFn?: Component<HeroIconProps>;
};
