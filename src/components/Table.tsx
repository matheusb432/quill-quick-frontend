import { For } from 'solid-js';
import { WithId } from '~/core/types/model-types';
import { TableAction, TableColumn, TableProps } from '~/core/types/table-types';

export function Table<T extends WithId>(props: TableProps<T>) {
  return (
    <div class="overflow-x-auto w-full">
      {/* TODO add loading state to table */}
      <table class="table lg:text-lg xl:text-xl">
        <thead class="text-primary">
          <tr class="border-b-primary">
            <For each={props.columns}>{({ cx, header }) => <th class={cx}>{header}</th>}</For>
            <For each={props.actions}>{({ cx, header }) => <th class={cx}>{header}</th>}</For>
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
    <tr class="border-b-secondary">
      <For each={props.columns}>
        {({ cx, render, accessor }) => (
          <td class={cx}>{render ? render(props.item, props.index) : props.item[accessor]}</td>
        )}
      </For>
      <For each={props.actions}>
        {({ cx, render }) => <td class={cx}>{render(props.item, props.index)}</td>}
      </For>
    </tr>
  );
}
