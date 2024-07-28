import { NEXT_AUTH } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(req: NextRequest) {
  const { name, amount, emoji } = await req.json();
  const floatAmount = parseFloat(amount);
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email as string,
    },
  });
  if (!user) {
    return NextResponse.json("User not found", { status: 404 });
  }
  const isExist = await prisma?.budget.findFirst({
    where: {
      AND: {
        name,
        user_id: user.id,
      },
    },
  });
  // console.log(isExist);

  if (isExist) {
    return NextResponse.json("Budget already exists", { status: 409 });
  }
  const res = await prisma?.budget.create({
    data: {
      name,
      amount: floatAmount,
      emoji,
      user_id: user.id,
    },
  });

  if (res) {
    return NextResponse.json("Budget created successfully", { status: 201 });
  }
  return NextResponse.json("Failed to create budget", { status: 500 });
}
