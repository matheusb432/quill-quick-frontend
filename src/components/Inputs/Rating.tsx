import { For, createEffect, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { ErrorText } from './ErrorText';
import { Label } from './Label';

type RatingProps<TF, TN> = FieldCmp<TF, TN>;

export function Rating<TF, TN>(props: RatingProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { error, label, name, canEdit, isLoading, setComponentLabel } = createField(merged);
  createEffect(() => {
    if (props.label == null) return;
    setComponentLabel(props.label);
  });
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div class="relative flex flex-col justify-center">
      <Label forId={name()}>{props.label ?? label()}</Label>
      <div class="rating rating-half rating-lg relative">
        <input
          {...merged.fieldArgs[1]}
          type="radio"
          name={name()}
          class="rating-hidden"
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
      <ErrorText isError={!!merged.fieldArgs[0].error} text={error()} />
    </div>
  );
}
