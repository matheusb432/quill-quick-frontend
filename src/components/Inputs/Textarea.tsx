import { createEffect, createMemo, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { ContainerField } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type TextareaProps<TF, TN> = ContainerField<TF, TN>;

export function Textarea<TF, TN>(props: TextareaProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { error, label, name, placeholder, canEdit, isLoading, setComponentLabel } =
    createField(merged);
  createEffect(() => {
    if (props.label == null) return;
    setComponentLabel(props.label);
  });

  const getValue = createMemo<string>(() => {
    const value = merged.fieldArgs[0].value;

    // TODO clean
    // if (label().toLowerCase().includes('content')) {
    //   console.log(`in ${label()}`);
    //   console.log(value);
    // }

    return value === undefined ? '' : (value as unknown as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      error={error()}
      helper={merged.helper}
    >
      <textarea
        {...merged.fieldArgs[1]}
        class="input-fx peer form-textarea h-36 max-h-80 min-h-[64px] pb-0 pt-6 transition"
        id={name()}
        value={getValue()}
        placeholder={placeholder()}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
