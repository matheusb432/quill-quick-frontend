import { JSX } from 'solid-js';

interface AnimatedTypingProps {
  children: JSX.Element;
}

export function AnimatedTyping(props: AnimatedTypingProps) {
  return (
    <span class="w-40 pr-2">
      <span class="relative">
        <span class="pt-2 text-accent whitespace-nowrap">{props.children}</span>
        <span class="__animated-cursor after:bg-accent absolute -bottom-0 left-0 -top-1 inline-block bg-primary-base w-full animate-type will-change-transform" />
      </span>
    </span>
  );
}
