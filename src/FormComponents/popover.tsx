import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";

import { cn } from "@/Utilities";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }: any, ref) => (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-md ml border shadow-md outline-none",
        className
      )}
      {...props}
    />
  )
);
PopoverContent.displayName = "PopoverContent";

// Example usage of Popover, PopoverTrigger, and PopoverContent
const ExampleComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setOpen(!open)}
        >
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-4">
        <p>This is the popover content.</p>
      </PopoverContent>
    </Popover>
  );
};

export { Popover, PopoverTrigger, PopoverContent, ExampleComponent };
