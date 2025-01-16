import clsx from 'clsx';
import * as React from 'react';

type InputGroupLabelProps = {
  id: string;
  label: string;
  required?: boolean;
  horizontal?: boolean;
  tooltipMessage?: string;
  tooltipMessageAlign?: 'center' | 'left' | 'right';
  preventFocusOnLabelClick?: boolean;
};

export const InputGroupLabel = ({
  label,
  id,
  required,
  horizontal = false,
  preventFocusOnLabelClick = false,
}: InputGroupLabelProps) => {
  let inputLabel: string | React.ReactNode = label;
  if (required) {
    inputLabel = (
      <>
        {inputLabel} <div className="bg-red-500 h-2.5 w-1 rounded-[20px]" />
      </>
    );
  }

  return (
    <label
      htmlFor={!preventFocusOnLabelClick ? id : undefined}
      className={clsx(
        'leading-[15px] min-w-[90px] flex gap-1 items-center text-[13px] font-bold text-gray-600',
        horizontal ? 'justify-start' : 'justify-end',
      )}
    >
      {inputLabel}
    </label>
  );
};
