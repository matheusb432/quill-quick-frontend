import { Portal } from 'solid-js/web';
import { DialogData } from '~/core/types/dialog-types';
import { strUtil } from '~/core/util/str-util';
import { Backdrop } from './Backdrop';
import { Button } from './Button';
import { ElementIds } from '~/core/constants/element-ids';
import { Heading } from './Heading';

export interface DialogProps {
  data: DialogData;
  show: boolean;
}

export function Dialog(props: DialogProps) {
  const data = () => props.data;

  return (
    <>
      <Portal mount={document.getElementById(ElementIds.OverlayRoot) ?? undefined}>
        <Backdrop onClick={data().onClose} show={props.show} />
        <div
          class={strUtil.cx(
            `w-[440px] fixed bg-primary-light rounded-md gap-y-4 text-primary-text p-7 flex flex-col items-center justify-between left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out duration-500`,
            props.show ? 'opacity-100 visible top-1/2 z-50' : 'opacity-0 -top-1/2 invisible -z-50',
          )}
        >
          <header class="border-b">
            <Heading as="h2" class="font-sans">
              {data().title}
            </Heading>
          </header>
          <article>{data().message}</article>
          <footer class="flex items-center justify-center gap-x-6">
            <Button onClick={data().onClose} mode="stroked">
              Cancel
            </Button>
            <Button onClick={data().onConfirm} isLoading={data().isLoadingConfirm}>
              {data().confirmText}
            </Button>
          </footer>
        </div>
      </Portal>
    </>
  );
}
