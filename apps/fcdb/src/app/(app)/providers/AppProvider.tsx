"use client";

import ReactQueryProvider from "./ReactQueryProvider";

interface Props {
  children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default AppProvider;
