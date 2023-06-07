interface ImageProps {
  src: string;
  alt: string;
  class?: string;
}

export function Image(props: ImageProps) {
  return <img {...props} />;
}
