import { Component, JSX, mergeProps } from 'solid-js';
import { ErrorText } from './ErrorText';
import { Label } from './Label';
import { Ping } from '../Ping';
import { HeroIconProps } from '~/assets/icons/types';
import { HIDocumentMagnifyingGlass } from '~/assets/icons/HIDocumentMagnifyingGlass';

interface InputContainerProps {
  children: JSX.Element;
  name: string;
  label: string;
  isError?: boolean;
  isLoading?: boolean;
  errorText?: string;
  iconFn?: Component<HeroIconProps>;
}

export function InputContainer(props: InputContainerProps) {
  const merged = mergeProps({ errorText: 'Invalid field!', type: 'text' }, props);

  return (
    <div class="relative flex h-full w-full flex-col gap-y-1">
      {merged.children}
      <Label forId={merged.name}>{merged.label}</Label>
      <ErrorText isError={merged.isError} errorText={merged.errorText} />
      {merged.iconFn?.({ class: 'absolute w-8 h-8 right-2 top-4 opacity-30' })}
      {merged.isLoading && <Ping class="absolute -top-1 -right-1" />}
    </div>
  );
}
