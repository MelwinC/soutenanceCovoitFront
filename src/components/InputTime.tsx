import React from "react";

interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  min?: string;
  classname?: string;
}

export const InputTime: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  min,
  classname,
}) => {
  return (
    <div
      className={
        classname
          ? classname
          : "relative w-full block rounded-md px-6 pt-6 pb-1 text-md text-neutral-900 bg-primary-light appearance-none focus:outline-none focus:ring-0 peer"
      }
    >
      <input
        onChange={onChange}
        type="time"
        value={value}
        id={id}
        min={min}
        required
        className="
        focus:outline-none
        focus:ring-0
        peer
      "
      />
      <label
        className="
            absolute
            text-md
            text-neutral-600
            duration-150
            transform
            -translate-y-3
            scale-75
            top-3
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
