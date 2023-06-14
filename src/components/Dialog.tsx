import { Portal } from 'solid-js/web';
import { HIXCircle } from '~/assets/icons/HIXCircle';
import { ElementIds } from '~/core/constants/element-ids';
import { ActionTypes } from '~/core/types/action-types';
import { DialogData } from '~/core/types/dialog-types';
import { strUtil } from '~/core/util/str-util';
import { ActionIcon } from './ActionIcon';
import { Backdrop } from './Backdrop';
import { Button } from './Button';
import { Heading } from './Heading';

export interface DialogProps {
  data: Required<DialogData>;
  show: boolean;
}

export function Dialog(props: DialogProps) {
  const data = () => props.data;
  const type = () => data().type;

  return (
    <>
      <Portal mount={document.getElementById(ElementIds.OverlayRoot) ?? undefined}>
        <Backdrop onClick={data().onClose} show={props.show} />
        <div
          class={strUtil.cx(
            `fixed left-1/2 top-1/2 flex w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between rounded-md bg-primary-base text-primary-text transition-all duration-500 ease-out`,
            props.show ? 'visible z-50' : 'invisible -z-50 scale-0',
          )}
        >
          <header
            class={strUtil.cx(
              `relative flex w-full items-center justify-center rounded-t-md p-4`,
              headerThemeMap[type()],
            )}
          >
            <Heading as="h2" class="font-sans">
              {data().title}
            </Heading>
            {
              <ActionIcon
                iconFn={HIXCircle}
                onClick={data().onClose}
                class="absolute right-2 top-2 h-5 w-5"
              />
            }
          </header>
          <article class="max-h-32 overflow-y-auto p-4">{data().message}</article>
          <footer class="flex w-full items-center justify-center gap-x-6 border-t border-t-divider/30 p-4">
            <Button
              onClick={data().onClose}
              theme={type()}
              disabled={data().isLoadingConfirm}
              mode="stroked"
            >
              Cancel
            </Button>
            <Button onClick={data().onConfirm} theme={type()} isLoading={data().isLoadingConfirm}>
              {data().confirmText}
            </Button>
          </footer>
        </div>
      </Portal>
    </>
  );
}

const headerThemeMap: Record<ActionTypes, string> = {
  primary: 'bg-accent',
  danger: 'bg-red-500',
};
