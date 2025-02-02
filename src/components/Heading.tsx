import { JSX, mergeProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { strUtil } from '~/core/util/str-util';

interface HeadingProps {
  children: JSX.Element;
  class?: string;
  as?: Headings;
}

export function Heading(props: HeadingProps) {
  const merged = mergeProps({ as: 'h1' }, props) as Required<HeadingProps>;

  return (
    <Dynamic
      component={merged.as}
      class={strUtil.cx('font-serif font-normal', merged.class)}
      classList={{
        'text-4xl': merged.as === 'h1',
        'text-2xl': merged.as === 'h2',
        'text-xl': merged.as === 'h3',
        'text-lg': merged.as === 'h4' || merged.as === 'h5' || merged.as === 'h6',
      }}
    >
      {props.children}
    </Dynamic>
  );
}

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
