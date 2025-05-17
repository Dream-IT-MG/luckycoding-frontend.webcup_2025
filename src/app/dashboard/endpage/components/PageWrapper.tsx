import { cn } from "@/lib/utils";
import React from "react";

const PageWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("max-w-6xl mx-auto px-6 lg:px-10 w-full", className)}
    {...props}
  />
));

PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
