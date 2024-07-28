import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id: expId } = params;

  const session: any = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const res = await prisma.expense.delete({
    where: {
      id: expId,
    },
  });
  if (!res) {
    return NextResponse.json({ message: "Expense not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Expense deleted successfully" },
    { status: 200 }
  );
}
