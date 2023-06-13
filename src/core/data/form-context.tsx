import { FieldValues, createForm } from '@modular-forms/solid';
import { JSX, createContext, splitProps, useContext } from 'solid-js';

interface FormContextProps<TFieldValues extends FieldValues> {
  state: Omit<FormProviderProps<TFieldValues>, 'children'>;
  // formData: ReturnType<typeof createForm<TFieldValues>>;
  // isLoading?: boolean;
  // disabled?: boolean;
}

const FormContext = createContext();

type FormProviderProps<TFieldValues extends FieldValues> = {
  children: JSX.Element;
  formData: ReturnType<typeof createForm<TFieldValues>>;
  isLoading?: boolean;
  disabled?: boolean;
};

export function FormProvider<TFieldValues extends FieldValues>(
  props: FormProviderProps<TFieldValues>,
) {
  const [local, others] = splitProps(props, ['children']);

  // return <FormContext.Provider value={others}>{local.children}</FormContext.Provider>;
  return <FormContext.Provider value={{ state: others }}>{local.children}</FormContext.Provider>;
}

export function useFormContext<TFieldValues extends FieldValues>() {
  const context = useContext<FormContextProps<TFieldValues>>(FormContext as never);

  if (!context) throw new Error('useFormContext: cannot find a FormContext');

  return context;
}
