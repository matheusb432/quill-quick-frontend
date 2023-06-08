import { JSX, mergeProps } from 'solid-js';
import { strUtil } from '~/core/util/str-util';

export interface ButtonProps {
  children: JSX.Element;
  mode?: Modes;
  theme?: Themes;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button(props: ButtonProps) {
  const merged = mergeProps(
    { theme: 'primary', type: 'button', mode: 'filled' },
    props,
  ) as ButtonProps;
  return (
    <button
      class={strUtil.cx(
        `relative rounded-sm border px-4 py-2 transition-colors disabled:bg-gray-500 disabled:text-gray-700`,
        getTheming(merged.mode, merged.theme),
      )}
      type={merged.type}
      disabled={merged.disabled}
      onClick={() => merged.onClick?.()}
    >
      {merged.children}
    </button>
  );
}

const fabClasses = 'rounded-full shadow-md shadow-black-500 w-16 h-16';

const filledMap = {
  primary: 'text-black-50 bg-green-500 border-green-500 hover:bg-green-600 active:bg-green-700',
  danger: 'text-black-50 bg-red-500 border-red-500 hover:bg-red-800 active:bg-red-900',
};

const classMap: Record<Modes, Record<Themes, string>> = {
  filled: filledMap,
  fab: filledMap,
  stroked: {
    primary: 'bg-black-50 text-green-600 border-green-500 hover:bg-green-100 active:bg-green-200',
    danger: 'bg-black-50 text-red-800 border-red-500 hover:bg-red-100 active:bg-red-200',
  },
};

function getTheming(mode: Modes = 'filled', theme: Themes = 'primary') {
  let classes = classMap[mode][theme];

  if (mode === 'fab') {
    classes += ` ${fabClasses}`;
  }

  return classes;
}

type Modes = 'filled' | 'stroked' | 'fab';
type Themes = 'primary' | 'danger';
