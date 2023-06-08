import { Book } from '../types/book';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
}

export function BookList(props: BookListProps) {
  return (
    <section class="flex w-full flex-wrap items-center justify-center gap-16 p-4">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </section>
  );
}
