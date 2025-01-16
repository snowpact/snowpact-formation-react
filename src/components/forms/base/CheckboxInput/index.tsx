import { RegisterOptions, useFormContext } from 'react-hook-form';
import InputGroupHorizontal from '../../core/InputGroupHorizontal';
import InputGroup from '../../core/InputGroup';

export type CheckboxProps = {
  horizontal?: boolean;
  /** Input label */
  label?: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Select (can be set from React Hook Form) */
  checked?: boolean;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Default inputOptions like onChange, value, onBlur... : NOT needed if in RHF */
  inputOptions?: RegisterOptions;
  tooltipMessage?: string;
};

export const Checkbox = ({
  horizontal,
  label,
  helperText,
  id,
  readOnly = false,
  checked = false,
  inputOptions,
  tooltipMessage,
}: CheckboxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const formError = errors[id];

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <input
        data-testid={`input-${id}`}
        {...register(id, inputOptions)}
        type="checkbox"
        name={id}
        id={id}
        readOnly={readOnly}
        disabled={readOnly}
        aria-describedby={id}
        checked={checked}
      />
    </Group>
  );
};
