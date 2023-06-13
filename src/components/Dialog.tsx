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
  data: DialogData;
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
            `fixed w-[480px] bg-primary-base text-primary-text top-1/2 rounded-md flex flex-col items-center justify-between left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-500`,
            props.show ? 'visible z-50' : 'scale-0 invisible -z-50',
          )}
        >
          <header
            class={strUtil.cx(
              `relative w-full flex justify-center rounded-t-md p-4 items-center`,
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
                class="absolute right-2 top-2 w-5 h-5"
              />
            }
          </header>
          <article class="p-4 max-h-32 overflow-y-auto">{data().message}</article>
          <footer class="flex items-center w-full justify-center gap-x-6 p-4 border-t-divider/30 border-t">
            <Button onClick={data().onClose} theme={type()} mode="stroked">
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
