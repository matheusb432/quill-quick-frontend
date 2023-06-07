interface PingProps {
  class?: string;
}

export function Ping(props: PingProps) {
  return (
    <span class={`relative flex h-3 w-3 ${props.class}`}>
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span class="relative inline-flex rounded-full h-full w-full bg-green-500" />
    </span>
  );
}
