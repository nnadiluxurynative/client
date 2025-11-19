import { twMerge } from "tailwind-merge";

type GridElementProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: GridElementProps) {
  return (
    <div
      className={twMerge(
        "container mx-auto px-4 max-w-[1400px]",
        className && className
      )}
    >
      {children}
    </div>
  );
}

function Row({ children, className }: GridElementProps) {
  return (
    <div
      className={twMerge(
        "flex flex-wrap -mx-4 gap-y-6 *:px-4",
        className && className
      )}
    >
      {children}
    </div>
  );
}

function Column({ children, className }: GridElementProps) {
  return (
    <div className={twMerge("w-full", className && className)}>{children}</div>
  );
}

Row.Column = Column;

Container.Row = Row;

export default Container;
