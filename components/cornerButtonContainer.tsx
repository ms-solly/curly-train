import * as React from 'react';
import { cn } from '@/lib/utils';

interface CornerButtonContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CornerButtonContainer = React.forwardRef<HTMLDivElement, CornerButtonContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-2 right-2 flex flex-col space-y-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CornerButtonContainer.displayName = 'CornerButtonContainer';

export default CornerButtonContainer;
