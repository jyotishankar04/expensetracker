import IsLogin from "@/components/IsLogin";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <IsLogin>
      <div className="flex w-full ">
        <Sidebar />
        <div className="flex flex-col overflow-hidden h-screen bg-[#161318]  w-full">
          <Navbar />
          <div className="w-full  overflow-auto">{children}</div>
        </div>
      </div>
    </IsLogin>
  );
}

export default layout;
