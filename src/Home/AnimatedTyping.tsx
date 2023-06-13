import { JSX } from 'solid-js';

interface AnimatedTypingProps {
  children: JSX.Element;
}

export function AnimatedTyping(props: AnimatedTypingProps) {
  return (
    <span class="w-40 pr-2">
      <span class="relative">
        <span class="whitespace-nowrap pt-2 text-accent">{props.children}</span>
        <span class="__animated-cursor absolute -bottom-0 -top-1 left-0 inline-block w-full animate-type bg-primary-base will-change-transform after:bg-accent" />
      </span>
    </span>
  );
}
