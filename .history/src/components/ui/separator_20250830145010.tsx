import * as React from "react";

export const Separator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>((props, ref) => (
  <hr ref={ref} {...props} />
));
