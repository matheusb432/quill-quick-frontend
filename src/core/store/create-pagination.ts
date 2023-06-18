import { createSignal } from 'solid-js';

export function createPagination() {
  const [page, setPage] = createSignal(1);

  const next = () => {
    setPage((prev) => prev + 1);
  };

  const previous = () => {
    setPage((prev) => prev - 1);
  };

  return {
    page,
    setPage,
    next,
    previous,
  };
}
