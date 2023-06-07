import { BookCard } from '~/Book/components/BookCard';
import { PageTitle } from '~/components/PageTitle';

export default function Books() {
  return (
    <>
      <PageTitle>Books</PageTitle>
      <section
        class="flex flex-wrap w-full gap-16 p-4
        items-center justify-center sm:justify-start"
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
