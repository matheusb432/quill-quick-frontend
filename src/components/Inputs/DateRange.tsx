import flatpickr from 'flatpickr';
import { mergeProps, onMount } from 'solid-js';
import { HICalendar } from '~/assets/icons/HICalendar';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type DateRangeProps<TF, TN> = FieldCmp<TF, TN> & {
  placeholder?: string;
};

export function DateRange<TF, TN>(props: DateRangeProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { errorText, label, name, canEdit, isLoading } = createField(merged);

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
      label={label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      errorText={errorText()}
      iconFn={HICalendar}
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
