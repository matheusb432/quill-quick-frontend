interface ErrorTextProps {
  isError?: boolean;
  errorText: string;
}

export function ErrorText(props: ErrorTextProps) {
  return (
    <span
      classList={{
        'h-7 text-red-500 transition-opacity duration-200 opacity-0': true,
        'opacity-100': props.isError,
      }}
      aria-hidden={!props.isError}
    >
      {props.errorText}
    </span>
  );
}
