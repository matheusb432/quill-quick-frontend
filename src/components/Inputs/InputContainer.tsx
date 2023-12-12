import { Component, JSX, Show, mergeProps } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { Ping } from '../Ping';
import { ErrorText } from './ErrorText';
import { Label } from './Label';
import { PeerLabel } from './PeerLabel';
import { Helper } from './Helper';

interface InputContainerProps {
  children: JSX.Element;
  name: string;
  label: string;
  isError?: boolean;
  isLoading?: boolean;
  error?: string;
  helper?: string;
  iconFn?: Component<HeroIconProps>;
  sideLabel?: boolean;
}

export function InputContainer(props: InputContainerProps) {
  const merged = mergeProps({ error: 'Invalid field!', type: 'text' }, props);

  return (
    <div
      class="relative flex h-full w-full"
      classList={{
        'flex-col gap-y-1': !merged.sideLabel,
        'gap-x-4 mb-4': merged.sideLabel,
      }}
    >
      <Show
        when={merged.sideLabel}
        fallback={
          <>
            {merged.children}
            <PeerLabel forId={merged.name}>{merged.label}</PeerLabel>
          </>
        }
      >
        <Label forId={merged.name}>{merged.label}</Label>
        {merged.children}
      </Show>
      <Helper isError={merged.isError} text={merged.helper} />
      <ErrorText isError={merged.isError} text={merged.error} />
      {merged.iconFn?.({ class: 'absolute w-8 h-8 right-2 top-4 opacity-30' })}
      {merged.isLoading && <Ping class="absolute -right-1 -top-1" />}
    </div>
  );
}
