import { NEXT_AUTH } from "@/auth";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <p className="text-gray-300 font-semibold text-3xl">
        Track your expenses
      </p>
      <h1 className="text-5xl text-green-600">Expense Mate</h1>
      <div className="flex items-center gap-6">
        <Button size={"lg"} className="w-52">
          <Link href={"/auth/login"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
