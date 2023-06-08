import { BookCard } from '~/Book/components/BookCard';
import { PageTitle } from '~/components/PageTitle';

export default function Books() {
  return (
    <>
      <PageTitle>Books</PageTitle>
      <section
        class="flex w-full flex-wrap items-center justify-center
        gap-16 p-4 sm:justify-start"
      >
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </section>
    </>
  );
}
