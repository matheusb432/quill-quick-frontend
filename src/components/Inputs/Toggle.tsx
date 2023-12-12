import { mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type ToggleProps<TF, TN> = FieldCmp<TF, TN>;

export function Toggle<TF, TN>(props: ToggleProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { error, label, name, canEdit, isLoading } = createField(merged);
  return (
    <InputContainer
      name={name()}
      label={props.label ?? label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      sideLabel
      error={error()}
    >
      <input
        {...merged.fieldArgs[1]}
        type="checkbox"
        class="toggle-primary toggle"
        id={name()}
        disabled={!canEdit()}
        checked={!!merged.fieldArgs[0].value}
      />
    </InputContainer>
  );
}
