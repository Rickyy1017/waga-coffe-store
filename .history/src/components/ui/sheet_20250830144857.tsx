import * as React from "react";

export const Sheet = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
));

export const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTML极Element>>((props, ref) => (
  <div ref={ref} {...props} />
));

export const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref极ref} {...props} />
));

export const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
  <h3 ref={ref} {...props} />
));
