import { BookTable } from '~/Book/components/BookTable';
import { PageTitle } from '~/components/PageTitle';

export default function Books() {
  return (
    <>
      <PageTitle subtitle="Review or add new books">Books</PageTitle>
      <BookTable items={[]} />
    </>
  );
}
