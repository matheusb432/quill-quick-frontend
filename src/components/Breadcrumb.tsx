import { Component, For, JSX, mergeProps } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { RoutePaths } from '~/core/constants/route-paths';

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb(props: BreadcrumbProps) {
  const merged = mergeProps({}, props);
  const crumbss: Crumb[] = [
    {
      label: 'Home',
      href: RoutePaths.Home,
    },
    {
      label: 'Books',
      href: RoutePaths.Book,
    },
    {
      label: 'Create',
      href: RoutePaths.BookCreate,
    },
  ];

  return (
    <nav>
      <ol>
        <For each={crumbss}>{(crumb) => <li></li>}</For>
      </ol>
    </nav>
  );
}

type Crumb = {
  label: string;
  href?: string;
  iconFn?: Component<HeroIconProps>;
};
