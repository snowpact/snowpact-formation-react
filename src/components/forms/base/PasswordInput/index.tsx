import cs from 'classnames';
import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import InputGroupHorizontal from '../../core/InputGroupHorizontal';
import InputGroup from '../../core/InputGroup';

export type PasswordInputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual inputOptions using RHF, it is encouraged to use yup resolver instead */
  inputOptions?: RegisterOptions;
  horizontal?: boolean;
  tooltipMessage?: string;
  tooltipMessageAlign?: 'center' | 'left' | 'right';
  required?: boolean;
};

export const PasswordInput = ({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  inputOptions,
  horizontal,
  tooltipMessage,
  tooltipMessageAlign,
  required = false,
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const formError = errors[id];

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group
      id={id}
      required={required}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
      tooltipMessageAlign={tooltipMessageAlign}
    >
      <input
        data-testid={`input-${id}`}
        {...register(id, inputOptions)}
        type={showPassword ? 'text' : 'password'}
        name={id}
        id={id}
        readOnly={readOnly}
        className={cs(formError && 'error')}
        placeholder={placeholder}
        aria-describedby={id}
      />

      <button
        onClick={togglePassword}
        tabIndex={-1}
        type="button"
        className="absolute inset-y-0 right-0 mr-2.5 flex items-center rounded-lg focus:outline-none"
      >
        {showPassword ? (
          <HiEyeOff className="cursor-pointer text-xl text-slate-500 hover:text-slate-600" />
        ) : (
          <HiEye className="cursor-pointer text-xl text-slate-500 hover:text-slate-600" />
        )}
      </button>
    </Group>
  );
};
