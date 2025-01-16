import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import InputGroup from '@/components/forms/core/InputGroup';
import classNames from 'classnames';

interface Option {
  value: string | number | null;
  label: string;
}

interface RadioSelectorInputProps {
  id: string;
  options: Option[];
  canBeEmpty?: boolean;
  label?: string;
  required?: boolean;
}

const DEFAULT_NULL_VALUE = '__null__';

export const RadioSelectorInput: React.FC<RadioSelectorInputProps> = ({
  id,
  options,
  canBeEmpty = false,
  label,
  required,
}) => {
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const formError = errors[id];

  const { field } = useController({
    control,
    name: id,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    const defaultValue: string | null = getValues(id);
    const defaultValueIndex = options.findIndex(
      (el) => el.value === defaultValue,
    );
    return defaultValueIndex !== -1 ? defaultValueIndex : canBeEmpty ? null : 0;
  });

  const handleOnChange = (index: number) => {
    setActiveIndex(index);
    field.onChange(options[index].value);
  };

  return (
    <InputGroup
      id={id}
      required={required}
      label={label}
      error={formError?.message as string}
    >
      <div
        className={classNames(
          'inline-flex justify-between bg-gray-100 rounded-[13px] max-w-xl p-1 mx-auto relative overflow-hidden min-h-[39px]',
          formError?.message && 'bg-red-50',
        )}
      >
        {options.map((item, i) => {
          const isActive = i === activeIndex;

          return (
            <React.Fragment key={`segmented-control-${id}-${item.value}`}>
              <div
                className={classNames(
                  'flex items-center justify-center relative text-center z-10 min-h-full',
                )}
              >
                <input
                  type="radio"
                  value={
                    item.value ? item.value.toString() : DEFAULT_NULL_VALUE
                  }
                  id={`${id}-${item.value}`}
                  checked={isActive}
                  className="opacity-0 absolute inset-0 !cursor-pointer"
                  onChange={() => handleOnChange(i)}
                />
                <label
                  htmlFor={`${id}-${item.value}`}
                  className={classNames(
                    'cursor-pointer font-bold text-[14px] px-[12px] flex-1 flex items-center justify-center h-full w-full',
                    isActive
                      ? 'text-blue-500 bg-white rounded-[9px] shadow-s'
                      : 'text-gray-600',
                    formError?.message && 'text-red-500',
                  )}
                >
                  {item.label}
                </label>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </InputGroup>
  );
};
