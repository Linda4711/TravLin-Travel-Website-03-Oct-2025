import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

// Badge variants without cva dependency
const badgeVariants = (variant: string = "default") => {
  const base = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors";
  
  const variants = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-gray-900 border-gray-300 hover:bg-gray-50",
  };
  
  return `${base} ${variants[variant] || variants.default}`;
};

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants(variant), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };