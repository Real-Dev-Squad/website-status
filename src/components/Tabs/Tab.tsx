import React from "react";

interface Props {
  children: React.ReactNode,
  title?: string
}

const Tab: React.FC<Props> = ({ children }) => (
  <div>
    {children}
  </div>
);

export default Tab;
