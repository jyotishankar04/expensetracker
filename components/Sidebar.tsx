"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MdSpaceDashboard } from "react-icons/md";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function Sidebar() {
  const location = usePathname();
  return (
    <div className=" w-[18%] bg-[#1C1917] flex flex-col justify-between h-screen border-r-[1px] border-gray-500">
      <Card className="p-5 w-full outline-none border-0">
        <div className="py-3 text-4xl mb-5">
          <h1 className="text-4xl font-bold">
            Expense
            <span className="text-green-600">Mate</span>
          </h1>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href={"/dashboard"}
            className={`${
              location == "/dashboard" &&
              "bg-green-500 rounded-lg text-gray-900"
            }`}
          >
            <Button
              variant={"ghost"}
              className="text-3xl flex items-center justify-start gap-3 w-full"
            >
              <MdSpaceDashboard />
              <h1 className="text-xl">Dashboard</h1>
            </Button>{" "}
          </Link>
          <Link
            href={"/budget"}
            className={`${
              location.startsWith("/budget") &&
              "bg-green-500 rounded-lg text-gray-900"
            }`}
          >
            <Button
              variant={"ghost"}
              className="text-3xl flex justify-start items-center gap-3 w-full"
            >
              <BsFillPiggyBankFill />
              <h1 className="text-xl">Budget</h1>
            </Button>
          </Link>
          <Link
            href={"/expense"}
            className={`${
              location == "/expense" && "bg-green-500 rounded-lg text-gray-900"
            }`}
          >
            <Button
              variant={"ghost"}
              className="text-3xl flex justify-start items-center gap-3 w-full"
            >
              <GiTakeMyMoney />
              <h1 className="text-xl">Expense</h1>
            </Button>
          </Link>
          <Link
            href={"/"}
            className={`${
              location == "/profile" && "bg-green-500 rounded-lg text-gray-900"
            }`}
          >
            <Button
              variant={"ghost"}
              className="text-3xl flex justify-start items-center gap-3 w-full"
            >
              <RxAvatar />
              <h1 className="text-xl">Profile</h1>
            </Button>
          </Link>
        </nav>
      </Card>
      <div className=" w-full flex justify-center mb-4 ">
        <Card className="w-10/12">
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Sidebar;
