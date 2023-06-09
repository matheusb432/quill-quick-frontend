import { createSignal, onCleanup } from 'solid-js';
import { AnimatedTyping } from './AnimatedTyping';

const animatedTexts = ['Books', 'Games', 'Movies', 'Music'];

export function Slogan() {
  const [index, setIndex] = createSignal(0);

  const timer = setInterval(() => {
    setIndex((prev) => {
      if (prev === animatedTexts.length - 1) return 0;

      return prev + 1;
    });
  }, 4000);

  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <p class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex items-center gap-x-3">
      Review
      <AnimatedTyping>{animatedTexts[index()]}</AnimatedTyping>
    </p>
  );
}
