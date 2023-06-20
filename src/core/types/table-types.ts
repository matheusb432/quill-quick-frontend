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
  isLoading?: boolean;
};

export type TableAction<T extends WithId> = {
  header?: string;
  cx?: string;
  render: ActionRenderFn<T>;
};

export type ActionRenderFn<T extends WithId> = (row: T, index: number) => JSX.Element;

export type CrudFns<T> = {
  viewFn?: (row: T) => void;
  editFn?: (row: T) => void;
  duplicateFn?: (row: T) => void;
  removeFn?: (row: T) => void;
};
