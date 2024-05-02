import { forwardRef, HTMLAttributes } from "react";

const Container = forwardRef<
  HTMLDivElement,
  { name: string } & HTMLAttributes<HTMLDivElement>
>(({ name, id, className, children, ...props }, ref) => (
  <div className="my-1 flex flex-col gap-y-1">
    <label htmlFor={id} className="text-sm">
      {name}
    </label>
    <div
      id={id}
      className={`rounded w-full min-h-3 p-2 flex flex-wrap justify-start items-center gap-2.5 ${className ? className : ""}`}
      ref={ref}
      {...props}
    >
      {(!children || (children && Object.keys(children).length === 0)) && (
        <p className="text-gray-400 text-sm">No extensions found</p>
      )}
      {children}
    </div>
  </div>
));

export default Container;
