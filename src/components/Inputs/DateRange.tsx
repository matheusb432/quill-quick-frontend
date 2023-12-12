import flatpickr from 'flatpickr';
import { createEffect, mergeProps, onMount } from 'solid-js';
import { HICalendar } from '~/assets/icons/HICalendar';
import { createField } from '~/core/store/create-field';
import { ContainerField } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type DateRangeProps<TF, TN> = ContainerField<TF, TN>;

export function DateRange<TF, TN>(props: DateRangeProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { error, label, name, canEdit, isLoading, setComponentLabel } = createField(merged);
  createEffect(() => {
    if (props.label == null) return;
    setComponentLabel(props.label);
  });

  onMount(() => {
    flatpickr('#dateRange', {
      mode: 'range',
      dateFormat: 'd/m/Y',
      monthSelectorType: 'static',
    });
  });

  return (
    <InputContainer
      name={name()}
      label={props.label ?? label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      error={error()}
      iconFn={HICalendar}
      helper={merged.helper}
    >
      <input
        {...merged.fieldArgs[1]}
        class="input-fx peer form-input h-16 pb-0 transition-all"
        id="dateRange"
        placeholder={merged.placeholder || 'Pick a date range'}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
