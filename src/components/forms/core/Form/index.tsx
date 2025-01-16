/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  FormProvider,
  FormState,
  Path,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import * as yup from 'yup';

interface BaseFormProps<T> {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  render?: (props: UseFormReturn<any, any>) => React.ReactElement;
  schema?: yup.AnyObjectSchema;
  defaultValues?: DeepPartial<T>;
  logErrors?: boolean;
  errors?: Record<string, string | undefined>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  id?: string;
  resetOnSubmit?: boolean;
}

interface FormPropsOnlyTouched<T> extends BaseFormProps<T> {
  onSubmit: (data: Partial<T>) => void;
  onlyTouchedFields?: true;
}

interface FormPropsDefault<T> extends BaseFormProps<T> {
  onSubmit: (data: T) => void;
  onlyTouchedFields?: false;
}

type FormProps<T> = FormPropsOnlyTouched<T> | FormPropsDefault<T>;

export type FormRef = {
  getFormState: () => FormState<any>;
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    className,
    children,
    render,
    onSubmit,
    defaultValues,
    schema,
    onlyTouchedFields,
    resetOnSubmit,
    logErrors,
    errors,
    mode = 'onChange',
    ...rest
  } = props;

  const [refreshIndex] = React.useState(0);

  const useFormProps = useForm<T>({
    mode,
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: schema ? yupResolver(schema) : undefined,
    shouldFocusError: false,
  });

  const { handleSubmit, formState, reset, setError, getValues } = useFormProps;
  const { isSubmitSuccessful } = useFormProps.formState;

  if (logErrors) {
    // eslint-disable-next-line no-console
    console.error(formState.errors, getValues());
  }

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) =>
        setError(key as Path<T>, {
          type: 'custom',
          message: value,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  React.useEffect(() => {
    if (isSubmitSuccessful && resetOnSubmit) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reset({}, { keepValues: true });
    }
  }, [resetOnSubmit, isSubmitSuccessful, reset]);

  const preOnSubmit = (data: T) => {
    if (onlyTouchedFields) {
      const touchedKeys = Object.keys(formState.touchedFields);

      if (touchedKeys.length > 0) {
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(([key]) => touchedKeys.includes(key)),
        );
        onSubmit(filteredData as Partial<T>);
        return;
      }
      onSubmit({});
      return;
    }
    onSubmit(data);
  };

  return (
    <FormProvider {...useFormProps}>
      <form
        className={className}
        onSubmit={handleSubmit(preOnSubmit)}
        {...rest}
        key={`form-${refreshIndex}`}
      >
        {render ? render(useFormProps) : children}
      </form>
    </FormProvider>
  );
};
