import flatpickr from 'flatpickr';
import { onMount } from 'solid-js';

type DateRangeProps = {};

export function DateRange(props: DateRangeProps) {
  onMount(() => {
    flatpickr('#dateRange', {
      mode: 'range',
      dateFormat: 'd/m/Y',
      onChange: (val) => {
        console.log(val);
      },
      monthSelectorType: 'static',
    });
  });

  return (
    // TODO add custom styles
    <div class="flex w-full">
      <input class="input-fx w-full p-4" id="dateRange" />
    </div>
  );
}
