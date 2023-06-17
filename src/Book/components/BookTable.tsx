import { Show } from 'solid-js';
import { HIDocumentCopy } from '~/assets/icons/HIDocumentCopy';
import { HIPencilSquare } from '~/assets/icons/HIPencilSquare';
import { HITrash } from '~/assets/icons/HITrash';
import { HIView } from '~/assets/icons/HIView';
import { IconButton } from '~/components/IconButton';
import { Table } from '~/components/Table';
import { TableAction, TableColumn } from '~/core/types/table-types';
import { Book } from '../types/book';

export type BookRow = Book & { id: number };

type BookTableProps = {
  items: BookRow[];
  viewFn?: (book: BookRow) => void;
  editFn?: (book: BookRow) => void;
  duplicateFn?: (book: BookRow) => void;
  removeFn?: (book: BookRow) => void;
};

// TODO implement
export function BookTable(props: BookTableProps) {
  const columns: TableColumn<BookRow>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: 'author' },
    { header: 'Publisher', accessor: 'publisher' },
    { header: 'Pages', accessor: 'pageCount' },
  ];

  const actions: TableAction<BookRow>[] = [
    {
      cx: 'flex justify-evenly items-center',
      render(row) {
        return (
          <>
            <Show when={props.viewFn}>
              <IconButton iconFn={HIView} fabSize="md" onClick={() => props.viewFn?.(row)} />
            </Show>
            <Show when={props.editFn}>
              <IconButton
                iconFn={HIPencilSquare}
                fabSize="md"
                onClick={() => props.editFn?.(row)}
              />
            </Show>
            <Show when={props.duplicateFn}>
              <IconButton
                iconFn={HIDocumentCopy}
                fabSize="md"
                onClick={() => props.duplicateFn?.(row)}
              />
            </Show>
            <Show when={props.removeFn}>
              <IconButton
                theme="danger"
                iconFn={HITrash}
                fabSize="md"
                onClick={() => props.removeFn?.(row)}
              />
            </Show>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table items={props.items} columns={columns} actions={actions} />
    </>
  );
}
