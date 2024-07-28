import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { NEXT_AUTH } from "@/auth";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const budgetId = params.id;
  const session: any = await getServerSession(NEXT_AUTH);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return NextResponse.json("User not found", { status: 404 });
  }
  const budget = await prisma.budget.findFirst({
    where: {
      id: budgetId,
      user_id: user.id,
    },
    select: {
      id: true,
      name: true,
      amount: true,
      emoji: true,
      created_at: true,
      expenses: {
        select: {
          id: true,
          amount: true,
          name: true,
          created_at: true,
        },
      },
    },
  });
  if (!budget) {
    return NextResponse.json("Budget not found", { status: 404 });
  }
  return NextResponse.json(budget, { status: 200 });
}
