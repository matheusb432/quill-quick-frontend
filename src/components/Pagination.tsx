import { JSX, mergeProps } from 'solid-js';
import { Button } from './Button';

interface PaginationProps {
  total: number | undefined;
}

export function Pagination(props: PaginationProps) {
  const merged = mergeProps({ total: 0 }, props);
  return (
    <div class="join">
      <Button class="join-item border-r-0">1</Button>
      <Button class="join-item border-x-0">2</Button>
      <Button class="join-item border-x-0">3</Button>
      <Button class="join-item border-x-0 bg-primary text-primary-content">4</Button>
      <Button class="join-item border-l-0">5</Button>
    </div>
  );
}
