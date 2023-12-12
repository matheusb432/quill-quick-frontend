import { FieldPath, FieldValues, createForm } from '@modular-forms/solid';
import {
  Accessor,
  JSX,
  createContext,
  createSignal,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';
import { CanEditData, FormModes } from '../types/form-types';

interface FormContextProps<TForm extends FieldValues> {
  state: Omit<Required<FormProviderProps<TForm>>, 'children'>;
  labels: Accessor<Record<FieldPath<TForm>, string>>;
  setLabels: (labels: Partial<Record<FieldPath<TForm>, string>>) => void;
}

const FormContext = createContext();

type FormProviderProps<TForm extends FieldValues> = Partial<CanEditData> & {
  children: JSX.Element;
  form: ReturnType<typeof createForm<TForm>>;
  labels?: Partial<Record<FieldPath<TForm>, string>>;
};

export function FormProvider<TForm extends FieldValues>(props: FormProviderProps<TForm>) {
  const [local, others] = splitProps(props, ['children']);
  const merged = mergeProps(
    { isLoading: false, disableOnLoading: true, disabled: false, mode: FormModes.Create },
    others,
  );
  // TODO remove since it's less versatile and intuitive, use setComponentLabel instead.
  const [labels, setLabels] = createSignal<Record<FieldPath<TForm>, string>>({} as never);

  return (
    <FormContext.Provider value={{ state: merged, labels, setLabels }}>
      {local.children}
    </FormContext.Provider>
  );
}

export function useFormContext<TForm extends FieldValues>() {
  const context = useContext<FormContextProps<TForm>>(FormContext as never);

  if (!context) throw new Error('useFormContext: cannot find a FormContext');

  return context;
}
