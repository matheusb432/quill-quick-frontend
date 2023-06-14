import { FieldValues, createForm } from '@modular-forms/solid';
import { JSX, createContext, mergeProps, splitProps, useContext } from 'solid-js';
import { FormModes } from '../types/form-types';

interface FormContextProps<TFieldValues extends FieldValues> {
  state: Omit<Required<FormProviderProps<TFieldValues>>, 'children'>;
}

const FormContext = createContext();

type FormProviderProps<TFieldValues extends FieldValues> = {
  children: JSX.Element;
  formData: ReturnType<typeof createForm<TFieldValues>>;
  disabled?: boolean;
  isLoading?: boolean;
  mode?: FormModes;
};

export function FormProvider<TFieldValues extends FieldValues>(
  props: FormProviderProps<TFieldValues>,
) {
  const [local, others] = splitProps(props, ['children']);
  const merged = mergeProps({ isLoading: false, disabled: false, mode: FormModes.Create }, others);

  return <FormContext.Provider value={{ state: merged }}>{local.children}</FormContext.Provider>;
}

export function useFormContext<TFieldValues extends FieldValues>() {
  const context = useContext<FormContextProps<TFieldValues>>(FormContext as never);

  if (!context) throw new Error('useFormContext: cannot find a FormContext');

  return context;
}
