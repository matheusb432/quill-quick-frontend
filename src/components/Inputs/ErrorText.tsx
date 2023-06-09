interface ErrorTextProps {
  isError?: boolean;
  errorText: string;
}

export function ErrorText(props: ErrorTextProps) {
  return (
    <span
      classList={{
        'text-red-500 transition-opacity duration-200 opacity-0 text-lg': true,
        'opacity-100': props.isError,
      }}
    >
      {props.errorText}
    </span>
  );
}
