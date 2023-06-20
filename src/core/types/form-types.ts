import { FieldValues, FieldPath, FieldStore, FieldElementProps } from '@modular-forms/solid';

export enum FormModes {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
  Duplicate = 'duplicate',
}

type TFieldStore<TForm, TName> = TForm extends FieldValues
  ? TName extends FieldPath<TForm>
    ? FieldStore<TForm, TName>
    : FieldStore<TForm, never>
  : FieldStore<never, never>;

type TFieldElementProps<TForm, TName> = TForm extends FieldValues
  ? TName extends FieldPath<TForm>
    ? FieldElementProps<TForm, TName>
    : FieldElementProps<TForm, never>
  : FieldElementProps<never, never>;

export type FieldCmp<TForm, TName> = {
  fieldArgs: [TFieldStore<TForm, TName>, TFieldElementProps<TForm, TName>];
};

export type ContainerField<TForm, TName> = FieldCmp<TForm, TName> & {
  placeholder?: string;
  helper?: string;
};

export type SelectItemData = {
  label: string;
  value: string;
};

export type CanEditData = {
  disabled: boolean;
  isLoading: boolean;
  disableOnLoading: boolean;
  mode: FormModes;
};
