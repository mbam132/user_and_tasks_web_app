import React from 'react';

interface IProps {
  showSpinner: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLElement>) => void;
  width: string;
  children: string;
  disabled?: boolean;
}

function Button({
  showSpinner,
  handleOnClick,
  width,
  children,
  disabled = false,
}: IProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-[${width}] bg-primary-100 rounded-md p-1.5 flex relative justify-center`}
      onClick={handleOnClick}
    >
      <span className="text-secondary-100">{children}</span>
      {showSpinner && (
        <div className="loading-spinner red-spinner absolute right-[0.6rem]" />
      )}
    </button>
  );
}

export default Button;
