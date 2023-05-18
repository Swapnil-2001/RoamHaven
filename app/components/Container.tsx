import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className="mx-auto flex max-w-[2520px] flex-row items-center justify-between gap-0 px-2 md:gap-3 md:px-6 lg:px-8 xl:px-12">
      {children}
    </div>
  );
};

export default Container;
