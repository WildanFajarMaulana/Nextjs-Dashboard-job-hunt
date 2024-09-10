import { Separator } from "@/components/ui/separator";
import React, { FC, ReactNode } from "react";

interface FieldInputProps {
  children: ReactNode;
  title: string;
  subTitle: string;
}

const FieldInput: FC<FieldInputProps> = ({ children, title, subTitle }) => {
  return (
    <>
      <div className="flex flex-row items-start">
        <div className="w-[35%]">
          <div className="font-semibold">{title}</div>
          <div className="text-gray-400 w-80">{subTitle}</div>
        </div>
        {children}
      </div>
      <Separator />
    </>
  );
};

export default FieldInput;
