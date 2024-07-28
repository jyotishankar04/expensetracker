import { NEXT_AUTH } from "@/auth";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      {JSON.stringify(session)}
      <div>
        <Link href={"/auth/login"}>
          <Button>Login</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button>DashBoard</Button>
        </Link>
      </div>
    </div>
  );
}
