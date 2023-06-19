import { For } from 'solid-js';
import { HIQuestionMarkCircle } from '~/assets/icons/HIQuestionMarkCircle';
import { WithId } from '~/core/types/model-types';
import { TableAction, TableColumn, TableProps } from '~/core/types/table-types';
import { Ping } from './Ping';

export function Table<T extends WithId>(props: TableProps<T>) {
  const loadingClassList = () => ({
    'opacity-50': props.isLoading,
  });

  return (
    <div class="relative overflow-x-auto w-full">
      <table class="table lg:text-lg xl:text-xl" classList={loadingClassList()}>
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
      {props.isLoading && <Ping class="absolute top-2 right-2" />}
      {props.items.length === 0 && <TableEmpty classList={loadingClassList()} />}
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

type TableEmptyProps = {
  classList?: {
    [k: string]: boolean | undefined;
  };
};

function TableEmpty(props: TableEmptyProps) {
  return (
    <div
      class="flex flex-col items-center justify-center h-48 pb-6 border-b border-b-secondary"
      classList={props.classList}
    >
      <HIQuestionMarkCircle class="text-primary w-32 h-32" />
      <span class="text-2xl">No Items were found!</span>
    </div>
  );
}
