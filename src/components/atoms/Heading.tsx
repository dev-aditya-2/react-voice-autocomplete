import React from "react";
import type { JSX } from "react";

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const Heading = ({ children, level = 1, className = "" }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={`font-bold text-xl ${className}`}>{children}</Tag>;
};
