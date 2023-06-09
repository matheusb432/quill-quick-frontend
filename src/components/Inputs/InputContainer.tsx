import { JSX, mergeProps } from 'solid-js';
import { ErrorText } from './ErrorText';
import { Label } from './Label';

interface InputContainerProps {
  children: JSX.Element;
  name: string;
  label: string;
  isError?: boolean;
  errorText?: string;
}

export function InputContainer(props: InputContainerProps) {
  const merged = mergeProps({ errorText: 'Invalid field!', type: 'text' }, props);

  return (
    <div class="flex relative flex-col gap-y-1 w-full h-full">
      {merged.children}
      <Label forId={merged.name}>{merged.label}</Label>
      <ErrorText isError={merged.isError} errorText={merged.errorText} />
    </div>
  );
}
