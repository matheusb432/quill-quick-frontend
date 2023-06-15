import { createMemo, mergeProps } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { FieldCmp } from '~/core/types/form-types';
import { formUtil } from '~/core/util/form-util';
import { InputContainer } from './InputContainer';

type TextareaProps<TF, TN> = FieldCmp<TF, TN> & {
  placeholder?: string;
};

export function Textarea<TF, TN>(props: TextareaProps<TF, TN>) {
  const merged = mergeProps({}, props);
  // TODO refactor to hook?
  const field = () => merged.fieldArgs[0];
  const errorText = createMemo<string>((prev) => field().error || prev || 'Invalid field!');
  const { state, labels } = useFormContext();
  const canEdit = () => formUtil.canEditField(state);
  const name = () => field().name;
  const label = () => labels()[name()] || formUtil.nameToLabel(name());
  const placeholder = () => merged.placeholder || `Enter the ${label()}`;
  //

  const getValue = createMemo<string>(() => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;

    return isUndefined ? '' : (value as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!field().error}
      isLoading={state.isLoading}
      errorText={errorText()}
    >
      <textarea
        {...merged.fieldArgs[1]}
        id={name()}
        value={getValue()}
        class="peer input-fx form-textarea max-h-80 min-h-[64px] h-36 pb-0 pt-6 transition"
        placeholder={placeholder()}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
