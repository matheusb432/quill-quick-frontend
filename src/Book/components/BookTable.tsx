import { Table } from '~/components/Table';
import { TableIcons } from '~/components/TableIcons';
import { ReviewItemFns, TableAction, TableColumn } from '~/core/types/table-types';
import { Book } from '../types/book';

export type BookRow = Book & { id: number };

type BookTableProps = ReviewItemFns<BookRow> & {
  items: BookRow[];
  isLoading?: boolean;
};

export function BookTable(props: BookTableProps) {
  const columns: TableColumn<BookRow>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: 'author' },
    { header: 'Publisher', accessor: 'publisher' },
    {
      header: 'Pages',
      accessor: 'pageCount',
    },
  ];

  const actions: TableAction<BookRow>[] = [
    {
      cx: 'flex justify-evenly items-center',
      render(row) {
        return (
          <TableIcons
            row={row}
            rowName="book"
            viewFn={props.viewFn}
            editFn={props.editFn}
            duplicateFn={props.duplicateFn}
            removeFn={props.removeFn}
            reviewFn={props.reviewFn}
          />
        );
      },
    },
  ];
  return (
    <>
      <Table items={props.items} columns={columns} actions={actions} isLoading={props.isLoading} />
    </>
  );
}
