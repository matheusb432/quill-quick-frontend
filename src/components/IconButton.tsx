import { Component, mergeProps } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { Button, ButtonProps } from './Button';
import { strUtil } from '~/core/util/str-util';

interface IconButtonProps extends Omit<ButtonProps, 'mode' | 'children'> {
  iconFn: Component<HeroIconProps>;
}

export function IconButton(props: IconButtonProps) {
  const merged = mergeProps({ theme: 'primary', type: 'button' }, props) as IconButtonProps;
  const sizeCx = () => {
    switch (merged.fabSize) {
      case 'xl':
        return 'h-10 w-10 left-3 top-3';
      case 'lg':
        return 'h-8 w-8 left-3 top-3';
      case 'md':
      default:
        return 'h-5 w-5 left-[7px] top-[7px]';
    }
  };
  return (
    <Button {...merged} mode="fab">
      {merged.iconFn({ class: strUtil.cx(`absolute`, sizeCx()) })}
    </Button>
  );
}
