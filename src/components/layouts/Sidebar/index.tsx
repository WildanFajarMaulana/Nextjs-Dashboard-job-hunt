"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsBuilding, BsGear } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
            >
              <AiOutlineHome className="mr-2 text-lg" />
              Home
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
            >
              <AiOutlineMessage className="mr-2 text-lg" />
              Messages
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
            >
              <BsBuilding className="mr-2 text-lg" />
              Company Profile
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
            >
              <AiOutlineUserAdd className="mr-2 text-lg" />
              All Aplicants
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
              onClick={() => router.push("/job-listings")}
            >
              <HiOutlineClipboardList className="mr-2 text-lg" />
              Job Listing
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none text-black hover:text-primary"
            >
              <AiOutlineCalendar className="mr-2 text-lg" />
              My Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            onClick={() => router.push("/settings")}
            variant={"ghost"}
            className="w-full justify-start rounded-none text-black hover:text-primary"
          >
            <BsGear className="mr-2 text-lg" />
            Settings
          </Button>
          <Button
            variant={"ghost"}
            className="w-full text-red-500 hover:bg-red-200 hover:text-red-500 justify-start rounded-none"
            onClick={()=> signOut()}
          >
            <AiOutlineLogout className="mr-2 text-lg" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
