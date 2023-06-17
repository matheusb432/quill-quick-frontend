import { For, JSX, mergeProps } from 'solid-js';
import { WithId } from '~/core/types/model-types';
import { TableAction, TableColumn, TableProps } from '~/core/types/table-types';

export function Table<T extends WithId>(props: TableProps<T>) {
  return (
    <div class="overflow-x-auto w-full">
      <table class="table lg:text-lg xl:text-xl">
        <thead class="text-primary">
          <tr>
            <For each={props.columns}>{({ cx, header }) => <th class={cx}>{header}</th>}</For>
          </tr>
        </thead>
        <tbody>
          <For each={props.items}>
            {(item, index) => (
              <TableRow
                item={item}
                index={index()}
                columns={props.columns}
                actions={props.actions}
              />
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps<T extends WithId> {
  item: T;
  index: number;
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
}

export function TableRow<T extends WithId>(props: TableRowProps<T>) {
  return (
    <tr>
      <For each={props.columns}>
        {({ cx, render, accessor }) => (
          <td class={cx}>{render ? render(props.item, props.index) : props.item[accessor]}</td>
        )}
      </For>
      <For each={props.actions}>{({ render }) => <td>{render(props.item, props.index)}</td>}</For>
    </tr>
  );
}
