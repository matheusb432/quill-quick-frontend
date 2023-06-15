import { createMemo, mergeProps } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { FieldCmp } from '~/core/types/form-types';
import { formUtil } from '~/core/util/form-util';
import { InputContainer } from './InputContainer';

type InputProps<TF, TN> = FieldCmp<TF, TN> & {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
};

export function Input<TF, TN>(props: InputProps<TF, TN>) {
  const merged = mergeProps({ type: 'text' }, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');
  const { state, labels } = useFormContext();
  const canEdit = () => formUtil.canEditField(state);
  const name = () => merged.field.name;
  const label = () => labels()[name()] || formUtil.nameToLabel(name());
  const placeholder = () => merged.placeholder || `Enter the ${label()}`;

  const getValue = createMemo<string | number | undefined>((prevValue) => {
    const isUndefined = props.field.value === undefined;

    if (merged.type === 'number') {
      const isNumber = !Number.isNaN(props.field.value);
      return isNumber && !isUndefined ? (props.field.value as number) : prevValue;
    }

    return isUndefined ? '' : (props.field.value as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!merged.field.error}
      isLoading={state.isLoading}
      errorText={errorText()}
    >
      <input
        {...merged.props}
        id={name()}
        value={getValue()}
        class="peer input-fx form-input h-16 pb-0 transition-all"
        placeholder={placeholder()}
        type={merged.type}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
