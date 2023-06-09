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
  type?: BtnTypes;
}

export function Button(props: ButtonProps) {
  const merged = mergeProps(
    {
      theme: 'primary',
      type: 'button',
      mode: 'filled',
    },
    props,
  ) as Required<ButtonProps>;
  return (
    <button
      class={strUtil.cx(
        `relative rounded-sm border ring-2 ring-secondary-text/5 ring-offset-1 ring-offset-primary-light/20 px-4 py-2 transition-colors disabled:pointer-events-none  disabled:bg-opacity-30 disabled:border-opacity-30 focus:outline-none`,
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
    'text-primary-text bg-accent border-accent hover:bg-accent/80 focus:bg-accent/80 active:bg-accent/70',
  danger:
    'text-primary-text bg-red-600 border-red-500 hover:bg-red-800 focus:bg-red-800 active:bg-red-900',
};

const classMap: Record<Modes, Record<Themes, string>> = {
  filled: filledMap,
  fab: filledMap,
  stroked: {
    primary:
      'bg-primary-text text-secondary-text border-accent hover:bg-green-100 focus:bg-green-100 active:bg-green-200',
    danger:
      'bg-primary-text text-secondary-text border-red-500 hover:bg-red-100 focus:bg-red-100 active:bg-red-200',
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
type BtnTypes = 'button' | 'submit' | 'reset';
