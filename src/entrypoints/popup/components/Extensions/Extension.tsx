import { forwardRef, HTMLAttributes } from "react";

const Extension = forwardRef<
  HTMLDivElement,
  {
    extension: {
      name: string;
      icons?: { url: string }[];
    };
  } & HTMLAttributes<HTMLDivElement>
>(({ extension, ...props }, ref) => (
  <div ref={ref} {...props}>
    <img
      src={extension.icons?.at(-1)?.url ?? "/extension-fallback.svg"}
      alt={extension.name}
      className="w-8 h-8"
    />
  </div>
));

export default Extension;
