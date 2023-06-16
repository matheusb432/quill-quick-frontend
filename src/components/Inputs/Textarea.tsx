import { createMemo, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type TextareaProps<TF, TN> = FieldCmp<TF, TN> & {
  placeholder?: string;
};

export function Textarea<TF, TN>(props: TextareaProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { errorText, label, name, placeholder, canEdit, isLoading } = createField(merged);

  const getValue = createMemo<string>(() => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;

    return isUndefined ? '' : (value as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      errorText={errorText()}
    >
      <textarea
        {...merged.fieldArgs[1]}
        class="peer input-fx form-textarea max-h-80 min-h-[64px] h-36 pb-0 pt-6 transition"
        id={name()}
        value={getValue()}
        placeholder={placeholder()}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
