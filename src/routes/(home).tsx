import { Accessor, createSignal } from 'solid-js';
import { Slogan } from '~/Home/Slogan';
import { Backdrop } from '~/components/Backdrop';
import { Button } from '~/components/Button';
import { Dialog } from '~/components/Dialog';
import { Heading } from '~/components/Heading';
import { Ping } from '~/components/Ping';
import { dialogStore } from '~/core/data/dialog-store';
import { toastStore } from '~/core/data/toast-store';
import { DialogAs, DialogData } from '~/core/types/dialog-types';
import { ToastAs } from '~/core/types/toast-types';
import { asyncUtil } from '~/core/util/async-util';

export default function Home() {
  // TODO clean
  // const [show, setShow] = createSignal(false);

  // const data: Accessor<DialogData> = () => ({
  //   onClose: handleClose,
  //   onConfirm: handleConfirm,
  //   confirmText: 'Confirm',
  //   isLoadingConfirm: false,
  //   title: 'Dialog Title',
  //   message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   type: 'danger',
  // });

  // function handleClose() {
  //   console.log('clicked!');
  //   setShow(false);
  // }

  function handleConfirm() {
    console.log('confirmed!');
    // setShow(false);
  }

  async function handleConfirmAsync() {
    await asyncUtil.sleep(2000);
    console.log('confirmed 2');
  }

  function buildDialog() {
    dialogStore.actions.create(
      DialogAs.primary({ message: 'Confirm action lorem ipsum', onConfirm: handleConfirm }),
    );
  }
  function buildDialogDanger() {
    dialogStore.actions.create(
      DialogAs.danger({
        message: 'Deleting the item cannot be undone',
        onConfirm: handleConfirmAsync,
      }),
    );
  }

  return (
    <>
      {/* <Button onClick={() => setShow(true)}>Show</Button> */}
      <Button onClick={buildDialog}>Show</Button>
      <Button onClick={buildDialogDanger}>Show Danger</Button>
      <Button onClick={() => toastStore.actions.next(ToastAs.success('helo'))}>Show toast</Button>
      {/* <Dialog show={show()} data={data()} /> */}
      <header class="px-6 py-8">
        <Heading class="mb-4 font-sans font-normal">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-sans text-4xl font-bold text-green-300">Home</span>
        <span class="font-hand text-4xl font-bold text-accent">Home</span>
        <span class="font-serif text-4xl font-bold text-green-700">Home</span>
        <span class="text-4xl font-bold text-green-700">Home</span>
      </p>
    </>
  );
}
