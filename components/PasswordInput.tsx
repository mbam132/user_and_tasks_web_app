import React, { SyntheticEvent, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

interface IProps {
  label?: string;
  value: string;
  setValue: (event: SyntheticEvent) => void;
  inputWidth: string;
}

function PasswordInput({ label, value, setValue, inputWidth }: IProps) {
  const [show, setShow] = useState(false);

  const toggleShowingPassword = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="border-none w-fit flex items-center translate-x-[10px]">
      {label && <label>{label}</label>}
      <div className="flex">
        <input
          name="password"
          placeholder="Password"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={setValue}
          autoComplete="off"
          className={`w-[${inputWidth}] rounded-md p-1.5 border-gray-300 border-2 border-primary-100  focus:outline-none`}
        />
        <button
          className="flex items-center pl-1.5 text-primary-100"
          onClick={toggleShowingPassword}
          type="button"
        >
          {show ? (
            <BiHide className="w-[16px] h-[16px]" />
          ) : (
            <BiShow className="w-[16px] h-[16px]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
