import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="h-[600px] overflow-auto py-4">
      {children}
    </div>
  );
};

export default Container;
