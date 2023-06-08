import { JSX } from 'solid-js';

interface AnimatedTypingProps {
  children: JSX.Element;
}

export function AnimatedTyping(props: AnimatedTypingProps) {
  return (
    <span class="w-40 pr-1">
      <span class="relative">
        <span class="pt-2 text-green-500 whitespace-nowrap">{props.children}</span>
        <span class="__animated-cursor after:bg-green-500 absolute -bottom-0 left-0 -top-1 inline-block bg-black-700 w-full animate-type will-change-transform" />
      </span>
    </span>
  );
}
