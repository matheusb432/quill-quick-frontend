import { createSignal } from 'solid-js';
import { Slogan } from '~/Home/Slogan';
import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Ping } from '~/components/Ping';
import { Timer } from '~/components/Timer';
import { Toast } from '~/components/Toast';
import { ToastAs } from '~/core/types/toast-types';

const toastData = ToastAs.success('Book reviews created successfully!');

export default function Home() {
  const [toast, setToast] = createSignal(toastData);

  function resetToast() {
    setToast(ToastAs.warning(`Toast - ${new Date().getTime()}`));
  }

  return (
    <>
      <header class="px-6 py-8">
        <Heading class="font-sans font-normal mb-4">Welcome to Quill Quick</Heading>
        <Slogan />
      </header>
      <p class="align-center my-4 flex justify-center gap-x-4">
        <span class="font-sans text-4xl font-bold text-green-300">Home</span>
        <span class="font-hand text-4xl font-bold text-accent">Home</span>
        <span class="font-serif text-4xl font-bold text-green-700">Home</span>
        <span class="text-4xl font-bold text-green-700">Home</span>
        <Ping />
      </p>
      <Button onClick={resetToast}>Reset Toast</Button>
      <Toast data={toast()} />
    </>
  );
}
