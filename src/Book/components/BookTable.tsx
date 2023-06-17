import { Table } from '~/components/Table';
import { TableColumn } from '~/core/types/table-types';
import { Book } from '../types/book';

interface BookTableProps {
  items: Book[];
}

// TODO implement
export function BookTable(props: BookTableProps) {
  const columns: TableColumn<Book>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: 'author' },
    { header: 'Publisher', accessor: 'publisher' },
    { header: 'Pages', accessor: 'pageCount' },
  ];

  return (
    <>
      <Table items={props.items} columns={columns} />
    </>
  );
}
