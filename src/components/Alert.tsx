import { type ReactNode } from 'react';

type AlertProps = {
  children: ReactNode;
};

export const Alert = ({ children }: AlertProps) => {
  return <div style={{
    backgroundColor: "green",
    
    border: "solid white 1px",
    padding: "16px",
    borderRadius: "8px",
    margin: "16px",
  }}>{children}</div>;
};