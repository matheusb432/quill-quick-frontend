import { Table } from '~/components/Table';
import { TableIcons } from '~/components/TableIcons';
import { CrudFns, TableAction, TableColumn } from '~/core/types/table-types';
import { BookReview } from '../types';
import { dateUtil } from '~/core/util/date-util';

export type BookReviewRow = BookReview & { id: number };

type BookReviewTableProps = Omit<CrudFns<BookReviewRow>, 'duplicateFn'> & {
  items: BookReviewRow[];
  isLoading?: boolean;
};

export function BookReviewTable(props: BookReviewTableProps) {
  const columns: TableColumn<BookReviewRow>[] = [
    { header: 'Rating', accessor: 'rating' },
    {
      header: 'Started at',
      accessor: 'startedAt',
      render: (row) => dateUtil.toDdMmYyyy(row.startedAt),
    },
    {
      header: 'Ended at',
      accessor: 'endedAt',
      render: (row) => dateUtil.toDdMmYyyy(row.endedAt),
    },
    { header: 'Summary', accessor: 'summary' },
  ];

  const actions: TableAction<BookReviewRow>[] = [
    {
      cx: 'flex justify-evenly items-center',
      render(row) {
        return (
          <TableIcons
            row={row}
            rowName="book"
            viewFn={props.viewFn}
            editFn={props.editFn}
            removeFn={props.removeFn}
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
