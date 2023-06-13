import { Component } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { strUtil } from '~/core/util/str-util';

interface ActionIconProps {
  iconFn: Component<HeroIconProps>;
  onClick: () => void;
  class?: string;
}

export function ActionIcon(props: ActionIconProps) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      {props.iconFn({
        class: strUtil.cx(
          'w-6 h-6 cursor-pointer hover:opacity-70 active:opacity-50 transition-opacity duration-200',
          props.class,
        ),
      })}
    </button>
  );
}
