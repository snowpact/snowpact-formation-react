import * as React from 'react';

import { InputGroupLabel } from '../InputGroupLabel';
import classNames from 'classnames';

export type InputGroupFooterProps = { error?: string; helperText?: string };

export type InputGroupProps = {
  id: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  tooltipMessage?: string;
  tooltipMessageAlign?: 'center' | 'left' | 'right';
  preventFocusOnLabelClick?: boolean;
};

const InputGroupFooter = ({ helperText, error }: InputGroupFooterProps) => {
  return (
    <>
      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && (
        <div className="text-[11px] leading-[16px] text-[#E11D48] font-[500]">
          {error}
        </div>
      )}
    </>
  );
};

const InputGroupComponent = ({
  id,
  label,
  helperText,
  error,
  children,
  required,
  fullWidth,
  tooltipMessage,
  tooltipMessageAlign = 'center',
  preventFocusOnLabelClick,
}: InputGroupProps) => {
  return (
    <div className={classNames(`flex gap-2 relative`, [fullWidth && 'w-full'])}>
      <div className="mt-3">
        {label && (
          <InputGroupLabel
            id={id}
            label={label}
            required={required}
            tooltipMessage={tooltipMessage}
            tooltipMessageAlign={tooltipMessageAlign}
            preventFocusOnLabelClick={preventFocusOnLabelClick}
          />
        )}
      </div>
      <div className="w-full">
        {children}
        <InputGroupFooter helperText={helperText} error={error} />
      </div>
    </div>
  );
};

InputGroupComponent.displayName = 'InputGroup';
InputGroupFooter.displayName = 'InputGroup.Footer';

export default Object.assign(InputGroupComponent, {
  Footer: InputGroupFooter,
  Label: InputGroupLabel,
});
