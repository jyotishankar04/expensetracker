"use client";

import Image from "next/image";
import AmountCard from "../AmountCard";
import BudgetCard from "../Budget/BudgetCard";
import ExpenseCard from "../Expense/ExpenseCard";
import { MainChart } from "../MainChart";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import LoadingPluse from "../LoadingPluse";
import { useRouter } from "next/navigation";

function MainComp() {
  const router = useRouter();
  const [stats, setStats] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    setIsLoading(true);
    const fetch = await axios.get(
      "https://expensemate.devsuvam.xyz/api/dashboard/stats"
    );
    const stats: any = fetch.data;
    // console.log(stats);
    setStats(stats);
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <div>
        <LoadingPluse />
      </div>
    );
  }

  if (stats && stats.budgets && stats.budgets.length <= 0) {
    return (
      <Card className="border-none bg-[#161318] gap-6 flex w-full flex-col items-center justify-center h-full p-20">
        <CardTitle>No Budgets Found</CardTitle>
        <CardContent>
          <CardDescription>
            {`
            No budgets have been created yet. Click on the "Add Budget" button
            to create your first budget.`}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              router.push("/budget");
            }}
            className=""
          >
            Add Budget
          </Button>
        </CardFooter>
      </Card>
    );
  }
  const totalBudget = {
    name: "Total Budget",
    amount: stats.totalBudget,
  };
  const totalSpent = {
    name: "Total Spent",
    amount:
      stats.dailySpent &&
      stats.dailySpent.reduce((acc: any, item: any) => acc + item, 0),
    // amount: 200,
  };
  const totalRemaining = {
    name: "Total Remaining",
    amount: totalBudget.amount - totalSpent.amount,
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        <AmountCard value={totalBudget} />
        <AmountCard value={totalSpent} />
        <AmountCard value={totalRemaining} />
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 ">
        <div className="col-span-2">
          <MainChart stats={stats.dailySpent} totalBudget={totalBudget} />
          <ExpenseCard />
        </div>
        <div className="flex flex-col gap-2 ">
          {Array.isArray(stats.budgets) &&
            stats.budgets.map((budget: any, index: number) => (
              <BudgetCard key={index} budget={budget} />
            ))}
        </div>
      </div>
    </>
  );
}

export default MainComp;
