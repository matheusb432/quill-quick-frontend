import { JSX } from 'solid-js';
import { WithId } from './model-types';

export type TableColumn<T extends WithId> = {
  header: string;
  accessor: keyof T;
  render?: ActionRenderFn<T>;
  cx?: string;
};

export type TableProps<T extends WithId> = {
  items: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
};

export type TableAction<T extends WithId> = {
  header?: string;
  cx?: string;
  render: ActionRenderFn<T>;
};

export type ActionRenderFn<T extends WithId> = (row: T, index: number) => JSX.Element;
