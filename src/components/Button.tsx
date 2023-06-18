import { JSX, mergeProps } from 'solid-js';
import { ActionTypes } from '~/core/types/action-types';
import { strUtil } from '~/core/util/str-util';
import { Ping } from './Ping';

export interface ButtonProps {
  children: JSX.Element;
  class?: string;
  isLoading?: boolean;
  mode?: Modes;
  theme?: ActionTypes;
  onClick?: () => void;
  disabled?: boolean;
  fabSize?: 'md' | 'xl' | 'lg';
  type?: BtnTypes;
}

export function Button(props: ButtonProps) {
  const merged = mergeProps(
    {
      theme: 'primary',
      type: 'button',
      mode: 'stroked',
    },
    props,
  ) as Required<ButtonProps>;
  return (
    <button
      class={strUtil.cx(
        `relative flex gap-x-2 items-center rounded-sm border px-4 py-2 duration-200 transition focus:outline-none active:scale-90 disabled:pointer-events-none disabled:border-opacity-30 disabled:bg-opacity-30`,
        getTheming(merged.mode, merged.theme, merged.fabSize),
        props.class,
      )}
      type={merged.type}
      disabled={merged.disabled || merged.isLoading}
      onClick={() => merged.onClick?.()}
    >
      {merged.children}
      {merged.isLoading && <Ping class="absolute -top-1 -right-1" />}
    </button>
  );
}

const fabXl = 'w-16 h-16';
const fabMd = 'w-9 h-9';
const fabLg = 'w-12 h-12';
const fabClasses = 'rounded-full';
const strokedClasses = 'bg-transparent';

const filledMap = {
  primary: 'text-neutral-content bg-primary border-primary hover:bg-primary/80 ',
  secondary: 'text-neutral-content bg-secondary border-secondary hover:bg-secondary/80 ',
  default: 'text-neutral-content bg-neutral border-neutral hover:bg-neutral/80 ',
  danger: 'text-neutral-content bg-red-600 border-red-500 hover:bg-red-800 ',
  warning: 'text-neutral-content bg-yellow-500 border-yellow-500 hover:bg-yellow-600 ',
};
const strokedMap = {
  primary: 'border-primary text-primary hover:text-primary-content hover:bg-primary',
  secondary: 'border-primary text-primary hover:text-primary-content hover:bg-primary',
  default: 'border-primary-content text-primary-content hover:bg-secondary',
  danger: 'border-error text-error hover:text-error-content hover:bg-error',
  warning: 'border-warning text-warning hover:text-warning-content hover:bg-warning',
};

const classMap: Record<Modes, Record<ActionTypes, string>> = {
  filled: filledMap,
  fab: strokedMap,
  stroked: strokedMap,
};

function getTheming(
  mode: Modes = 'filled',
  theme: ActionTypes = 'primary',
  fabSize?: 'xl' | 'lg' | 'md',
) {
  let classes = classMap[mode][theme];

  if (mode === 'fab') {
    classes += ` ${fabClasses}`;
    if (fabSize === 'xl') classes += ` ${fabXl}`;
    if (fabSize === 'md') classes += ` ${fabMd}`;
    if (fabSize === 'lg') classes += ` ${fabLg}`;
  }
  if (mode === 'stroked') {
    classes += ` ${strokedClasses}`;
  }

  return classes;
}

type Modes = 'filled' | 'stroked' | 'fab';
type BtnTypes = 'button' | 'submit' | 'reset';
