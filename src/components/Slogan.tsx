import { createSignal, onCleanup } from 'solid-js';
import { AnimatedTyping } from './AnimatedTyping';

const animatedTexts = ['Video Games', 'Movies', 'Books', 'Music'];

export function Slogan() {
  const [index, setIndex] = createSignal(0);

  const timer = setInterval(() => {
    setIndex((prev) => {
      if (prev === animatedTexts.length - 1) return 0;

      return prev + 1;
    });
  }, 6000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <p class="text-4xl flex justify-center items-center gap-x-3">
      Review
      <AnimatedTyping>{animatedTexts[index()]}</AnimatedTyping>
    </p>
  );
}
