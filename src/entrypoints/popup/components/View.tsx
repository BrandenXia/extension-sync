import { ReactNode } from "react";

const View = ({ children }: { children?: ReactNode }) => (
  <div>
    <div className="m-3">{children}</div>
  </div>
);

export default View;
