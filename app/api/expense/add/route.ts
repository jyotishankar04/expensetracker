import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/auth";
export async function POST(req: NextRequest) {
  const { amount, name, category_id } = await req.json();
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

  const createExpense = await prisma.expense.create({
    data: {
      amount,
      name,
      budget_id: category_id,
      user_id: user.id,
    },
  });
  if (createExpense) {
    return NextResponse.json(createExpense, { status: 201 });
  }
  return NextResponse.json(
    { message: "Failed to create expense" },
    { status: 500 }
  );
}
