import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/auth";

interface Expense {
  id: string;
  amount: number;
  name: string;
  created_at: string; // ISO date string
}

interface Budget {
  id: string;
  name: string;
  amount: number;
  emoji: string;
  created_at: string; // ISO date string
  expenses: Expense[];
}

export async function GET(req: NextRequest) {
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

  const budgets: any = await prisma.budget.findMany({
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
  const totalBudget =
    budgets.length > 0
      ? budgets.reduce((acc: number, budget: any) => acc + budget.amount, 0)
      : 0;

  const totalSpent = budgets.reduce(
    (acc: any, budget: any) =>
      acc +
      budget.expenses.reduce((expAcc: any, exp: any) => expAcc + exp.amount, 0),
    0
  );

  // Helper function to check if a date is within a range
  const isDateInRange = (date: Date, startDate: Date, endDate: Date) =>
    date >= startDate && date < endDate;

  // Helper function to calculate total expenses for a given date range
  const getTotalExpensesForDateRange = (
    expenses: Expense[],
    startDate: Date,
    endDate: Date
  ) =>
    expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.created_at);
      return isDateInRange(expenseDate, startDate, endDate)
        ? total + expense.amount
        : total;
    }, 0);

  // Function to calculate daily spending for the last 7 days
  const calculateDailySpending = (budgets: Budget[]) => {
    // Generate the last 7 days
    const dailySpent = Array.from({ length: 7 }, (_, i) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (7 - i)); // Start of the day, 6 days ago to today

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1); // End of the day

      // Calculate total expenses for the current day across all budgets
      return budgets.reduce(
        (dailyTotal, budget) =>
          dailyTotal +
          getTotalExpensesForDateRange(budget.expenses, startDate, endDate),
        0
      );
    });

    return dailySpent; // No need to reverse; results are already ordered from oldest to most recent
  };

  // Example usage
  const dailySpent = calculateDailySpending(budgets);
  const totalBudgetRemaining = totalBudget - totalSpent;
  return NextResponse.json({
    budgets,
    user,
    totalBudget,
    totalSpent,
    totalBudgetRemaining,
    dailySpent,
  });
}
