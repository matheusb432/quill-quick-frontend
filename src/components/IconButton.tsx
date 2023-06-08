import { JSX, mergeProps } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { Button, ButtonProps } from './Button';

interface IconButtonProps extends Omit<ButtonProps, 'mode' | 'children'> {
  iconFn: (props: HeroIconProps) => JSX.Element;
}

export function IconButton(props: IconButtonProps) {
  const merged = mergeProps({ theme: 'primary', type: 'button' }, props) as IconButtonProps;

  return (
    <Button {...merged} mode="fab">
      {merged.iconFn({ class: 'absolute left-3 top-3 h-10 w-10' })}
    </Button>
  );
}
