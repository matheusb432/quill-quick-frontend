import { For, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { ErrorText } from './ErrorText';

type RatingProps<TF, TN> = FieldCmp<TF, TN>;

export function Rating<TF, TN>(props: RatingProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { errorText, label, name, canEdit, isLoading } = createField(merged);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div class="relative flex flex-col justify-center">
      <label class="text-2xl text-neutral-content/80 transition-all" for={name()}>
        {label()}
      </label>
      <div class="rating rating-half rating-lg relative">
        <input
          {...merged.fieldArgs[1]}
          type="radio"
          name={name()}
          class="rating-hidden hidden"
          value={0}
          checked
          disabled={!canEdit()}
        />
        <For each={ratings}>
          {(rating) => (
            <input
              {...merged.fieldArgs[1]}
              type="radio"
              name={name()}
              class="mask mask-star-2 bg-yellow-500"
              classList={{
                'mask-half-1': rating % 2 === 1,
                'mask-half-2': rating % 2 === 0,
                'opacity-50': isLoading(),
              }}
              value={rating}
              checked={merged.fieldArgs[0].value === rating}
              disabled={!canEdit()}
            />
          )}
        </For>
      </div>
      <ErrorText isError={!!merged.fieldArgs[0].error} errorText={errorText()} />
    </div>
  );
}
