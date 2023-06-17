import { BookTable } from '~/Book/components/BookTable';
import { Book } from '~/Book/types/book';
import { PageTitle } from '~/components/PageTitle';

export default function Books() {
  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <section class="flex flex-col items-center justify-center gap-y-6">
        <BookTable items={mockBooks} />
      </section>
    </>
  );
}

const mockBooks: Book[] = [
  {
    id: 4,
    title: 'Tailwind docs 22',
    author: 'Tailwind Dev - editasdvv',
    publisher: 'TailwindLabs',
    summary:
      'Whatever you do, don’t use @apply just to make things look “cleaner”. Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.',
    pageCount: 105,
  },
  {
    id: 6,
    title: '444 new book 2',
    author: 'author',
    publisher: 'publisher',
    summary: 'lorem ipsum',
    pageCount: 10,
  },
  {
    id: 7,
    title: 'New Book from frontend!',
    author: 'auth',
    publisher: 'Test publisher',
    summary: "This is a really really cool book i'd recommend u check it out o _ o",
    pageCount: 300,
  },
  {
    id: 10,
    title: 'Tailwind docs - dupl',
    author: 'Tailwind Dev - edit 2',
    publisher: 'TailwindLabs',
    summary:
      'Whatever you do, don’t use @apply just to make things look “cleaner”. Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.',
    pageCount: 105,
  },
  {
    id: 11,
    title: 'new book',
    author: 'author',
    publisher: 'publisher',
    summary: 'lorem ipsum',
    pageCount: 0,
  },
];
