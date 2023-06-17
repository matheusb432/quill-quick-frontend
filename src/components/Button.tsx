import { JSX, mergeProps } from 'solid-js';
import { ActionTypes } from '~/core/types/action-types';
import { strUtil } from '~/core/util/str-util';
import { Ping } from './Ping';

export interface ButtonProps {
  children: JSX.Element;
  isLoading?: boolean;
  mode?: Modes;
  theme?: ActionTypes;
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
    <div title={merged.isLoading ? 'Loading...' : ''}>
      <button
        class={strUtil.cx(
          `relative flex gap-x-2 items-center rounded-sm border px-4 py-2 ring-2 ring-secondary-text/5 duration-200 ring-offset-1 ring-offset-primary-light/20 transition focus:outline-none active:scale-90 disabled:pointer-events-none disabled:border-opacity-30 disabled:bg-opacity-30`,
          getTheming(merged.mode, merged.theme),
        )}
        type={merged.type}
        disabled={merged.disabled || merged.isLoading}
        onClick={() => merged.onClick?.()}
      >
        {merged.children}
        {merged.isLoading && <Ping class="absolute -top-1 -right-1" />}
      </button>
    </div>
  );
}

const fabClasses = 'ring-8 ring-offset-4 rounded-full w-16 h-16';
const strokedClasses = 'bg-primary-text text-secondary-text';

const filledMap = {
  primary: 'text-primary-text bg-accent border-accent hover:bg-accent/80 ',
  danger: 'text-primary-text bg-red-600 border-red-500 hover:bg-red-800 ',
  warning: 'text-secondary-text bg-yellow-500 border-yellow-500 hover:bg-yellow-600 ',
};

const classMap: Record<Modes, Record<ActionTypes, string>> = {
  filled: filledMap,
  fab: filledMap,
  stroked: {
    primary: 'border-accent hover:bg-green-100',
    danger: 'border-red-500 hover:bg-red-100',
    warning: 'border-yellow-500 hover:bg-yellow-100',
  },
};

function getTheming(mode: Modes = 'filled', theme: ActionTypes = 'primary') {
  let classes = classMap[mode][theme];

  if (mode === 'fab') {
    classes += ` ${fabClasses}`;
  }
  if (mode === 'stroked') {
    classes += ` ${strokedClasses}`;
  }

  return classes;
}

type Modes = 'filled' | 'stroked' | 'fab';
type BtnTypes = 'button' | 'submit' | 'reset';
