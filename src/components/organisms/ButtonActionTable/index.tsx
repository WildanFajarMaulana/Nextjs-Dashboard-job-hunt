"use client"
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ButtonActionTableProps {
    url: string;
}

const ButtonActionTable: FC<ButtonActionTableProps> = ({url}) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push(url)}
        size="icon"
        variant="outline"
      >
        <MoreVertical />
      </Button>
    </div>
  );
};

export default ButtonActionTable;
