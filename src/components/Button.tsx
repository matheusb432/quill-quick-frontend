import { JSX, mergeProps } from 'solid-js';
import { strUtil } from '~/core/util/str-util';
import { Loading } from './Loading';

export interface ButtonProps {
  children: JSX.Element;
  isLoading?: boolean;
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
        `relative rounded-sm border ring-2 ring-black-900/5 ring-offset-1 ring-offset-black-500/20 px-4 py-2 transition-colors disabled:bg-gray-500 disabled:text-gray-700 focus:outline-none`,
        getTheming(merged.mode, merged.theme),
      )}
      type={merged.type}
      disabled={merged.disabled || merged.isLoading}
      onClick={() => merged.onClick?.()}
    >
      {merged.children}
      {merged.isLoading && <Loading />}
    </button>
  );
}

const fabClasses = 'ring-8 ring-offset-4 rounded-full w-16 h-16';

const filledMap = {
  primary:
    'text-black-50 bg-green-500 border-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700',
  danger:
    'text-black-50 bg-red-600 border-red-500 hover:bg-red-800 focus:bg-red-800 active:bg-red-900',
};

const classMap: Record<Modes, Record<Themes, string>> = {
  filled: filledMap,
  fab: filledMap,
  stroked: {
    primary:
      'bg-green-50 text-green-800 border-green-500 hover:bg-green-100 focus:bg-green-100 active:bg-green-200',
    danger:
      'bg-red-50 text-red-800 border-red-500 hover:bg-red-100 focus:bg-red-100 active:bg-red-200',
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
