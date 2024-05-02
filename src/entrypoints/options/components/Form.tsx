import * as PrimitiveSwitch from "@radix-ui/react-switch";
import { ChangeEvent, ElementRef, forwardRef, HTMLAttributes } from "react";
import { OptionsKeyType, OptionStorageType } from "@/store/options.ts";

const Root = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form
      className={`p-3 flex flex-col gap-y-3 ${className}`}
      {...props}
      ref={ref}
    />
  ),
);

const Switch = forwardRef<
  ElementRef<typeof PrimitiveSwitch.Root>,
  {
    option: {
      id: OptionsKeyType;
      name: string;
      value: boolean;
    };
    dispatch: <T extends OptionsKeyType>(
      key: T,
      value: OptionStorageType[T]["value"],
    ) => void;
  } & PrimitiveSwitch.SwitchProps
>(({ option, id, className, dispatch, ...props }, ref) => (
  <div className="flex items-center">
    <PrimitiveSwitch.Root
      id={id}
      checked={option.value}
      onCheckedChange={(checked) => dispatch(option.id, checked)}
      className={`w-[42px] h-[25px] rounded-full relative bg-gray-200 data-[state=checked]:bg-blue-500 transition-background-color ${className}`}
      {...props}
      ref={ref}
    >
      <PrimitiveSwitch.Thumb className="block w-[21px] h-[21px] rounded-full bg-white shadow-sm translate-x-0.5 data-[state=checked]:translate-x-[19px] transition-transform" />
    </PrimitiveSwitch.Root>
    <label htmlFor={id} className="text-[15px] leading-none pl-2">
      {option.name}
    </label>
  </div>
));

const Select = forwardRef<
  HTMLSelectElement,
  {
    options: string[];
    option: {
      id: OptionsKeyType;
      name: string;
      value: string;
    };
    dispatch: <T extends OptionsKeyType>(
      key: T,
      value: OptionStorageType[T]["value"],
    ) => void;
  } & HTMLAttributes<HTMLSelectElement>
>(({ id, options, option, dispatch, ...props }, ref) => (
  <div className="flex items-center">
    <label htmlFor={id} className="text-[15px] leading-none pr-2">
      {option.name}
    </label>
    <select
      id={id}
      className="rounded-md bg-gray-200 px-3 py-2"
      {...props}
      ref={ref}
      value={option.value}
      onChange={(e) => dispatch(option.id, e.target.value as OptionStorageType[typeof option.id]["value"])}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
));

const Form = {
  Root,
  Switch,
  Select,
};

export default Form;
