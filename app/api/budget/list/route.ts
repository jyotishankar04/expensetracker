import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { NEXT_AUTH } from "@/auth";

export async function GET() {
  const session: any = await getServerSession();

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

  try {
    const budgets = await prisma.budget.findMany({
      where: {
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
      orderBy: {
        created_at: "desc",
      },
    });
    if (!budgets) {
      return NextResponse.json("No budgets found", { status: 200 });
    }
    // console.log(budgets);
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error fetching budgets", { status: 500 });
  }
  return NextResponse.json("Error in fetching data", { status: 200 });
}
