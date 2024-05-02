import {ReactNode} from "react";

const View = ({children}: {children?: ReactNode}) => (
  <div className="px-3 pb-3">
    {children}
  </div>
)

export default View;
