"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { DotLoader } from "react-spinners";

function IsLogin({ children }: { children: ReactNode }) {
  const session = useSession();
  if (session.status == "loading") {
    return (
      <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
        <div className="w-32 aspect-square animate-spin  border-8 border-green-800/10 border-y-[#00E065] rounded-full "></div>
      </div>
    );
  }
  if (session.status == "unauthenticated") redirect("/auth/login");
  else {
    return <div>{children}</div>;
  }
}

export default IsLogin;
