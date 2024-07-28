"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm flex flex-col items-center ">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              required
            />
          </div>
          <Button className="w-full">Sign in</Button>
        </CardContent>
        <div
          className="flex  w-full text-lg text-white text-center 
         justify-center"
        >
          New here? Sign up for free
        </div>
        {/* <div className="relative p-[1px] w-10/12  rounded-xl bg-white"></div> */}
        <CardFooter className="w-full flex flex-col gap-5 mt-3">
          <Button
            className="w-full text-black"
            onClick={async () => {
              signIn("google");
            }}
          >
            <FaGoogle className="text-3xl mr-3 text-black" />
            Sign in with Google
          </Button>
          <Button className="w-full" onClick={async () => signIn("github")}>
            <FaGithub className="text-3xl mr-3 text-black" />
            Sign in with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
