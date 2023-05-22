import { Dispatch, SetStateAction } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

const makeFirstCharUppercase = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

interface InputProps {
  errors: DeepMap<FieldValues, FieldError>;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  formatPrice?: boolean;
  getValues?: UseFormGetValues<FieldValues>;
  isDisabled?: boolean;
  required?: boolean;
  type?: string;
}

const FormInput: React.FC<InputProps> = ({
  errors,
  id,
  label,
  register,
  formatPrice,
  getValues,
  isDisabled,
  required,
  type = "text",
}): JSX.Element => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-4 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={isDisabled}
        type={type}
        {...register(id, {
          required:
            required && `${makeFirstCharUppercase(id)} cannot be empty.`,
          validate: (value: string) => {
            if (id === "password" && value.length < 6)
              return "Password must have at least 6 characters.";
            if (id !== "confirmPassword" || getValues === undefined)
              return true;
            if (value !== getValues("password")) return "Passwords must match.";
          },
        })}
        placeholder=" "
        autoComplete={
          id === "password" || id === "confirmPassword" ? "new-password" : ""
        }
        className={`peer w-full rounded-lg border-[1px] bg-white p-4 font-normal outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 ${
          formatPrice ? "pl-9" : "pl-5"
        } ${
          Object.hasOwn(errors, id)
            ? "border-rose-500"
            : "border-neutral-300 focus:border-black"
        }`}
      />
      <label
        htmlFor={id}
        className={`text-md absolute top-4 z-10 origin-[0] -translate-y-3 transform duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-white peer-focus:px-1 ${
          formatPrice ? "left-9 peer-focus:left-8" : "left-5 peer-focus:left-4"
        } ${Object.hasOwn(errors, id) ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
      {Object.hasOwn(errors, id) && (
        <div className="mt-2 text-sm font-medium text-rose-500">
          {errors[id].message}
        </div>
      )}
    </div>
  );
};

export default FormInput;
