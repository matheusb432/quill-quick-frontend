import { JSX, mergeProps } from 'solid-js';
import { Book } from '../types/book';

interface BookTableProps {
  items: Book[];
}

// TODO implement
export function BookTable(props: BookTableProps) {
  const merged = mergeProps({}, props);
  return <div>TODO</div>;
}
