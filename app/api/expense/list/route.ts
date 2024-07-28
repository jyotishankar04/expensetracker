import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const session: any = await getServerSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }
  const expenses = await prisma?.expense.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      id: true,
      amount: true,
      name: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  if (!expenses) {
    return NextResponse.json(
      {
        message: "No expenses found",
      },
      { status: 200 }
    );
  }
  return NextResponse.json(expenses, { status: 200 });
}
