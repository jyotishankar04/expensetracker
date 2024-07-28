"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

import { useRouter } from "next/navigation";
import LoadingPluse from "../LoadingPluse";
interface prop {
  name: string;
  amount: number;
  emoji: string;
}
const BudgetCard: React.FC<{ budget: any }> = ({ budget }) => {
  const router = useRouter();
  const expense =
    Array.isArray(budget.expenses) && budget.expenses.length > 0
      ? budget.expenses.reduce((acc: number, exp: any) => acc + exp.amount, 0)
      : 0;
  const percentage = (expense / budget.amount) * 100;

  return (
    <button
      disabled={
        window.location.pathname != "/budget" &&
        window.location.pathname != "/dashboard"
      }
      className="w-full"
      onClick={() => router.push(`/budget/${budget.id}`)}
    >
      <Card
        x-chunk="dashboard-05-chunk-1"
        className="border-slate-700 hover:border-slate-300 cursor-pointer "
      >
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <div className="flex  items-center gap-5">
            <div className="bg-[#292522] w-16 overflow-hidden aspect-square rounded-full flex justify-center items-center ">
              <Image
                src={budget.emoji}
                width={90}
                height={90}
                alt="emoji"
                className="w-full p-2"
              />
            </div>
            <div>
              <CardTitle className="text-xl">{budget && budget.name}</CardTitle>
              <CardDescription>
                {budget && budget.expenses.length} items
              </CardDescription>
            </div>
          </div>
          <div className="">
            <div
              className={`${
                percentage > 100 ? "text-red-600" : "text-green-500"
              } text-2xl font-semibold `}
            >
              ${budget && budget.amount}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`${
              percentage > 100 ? "text-red-600" : "text-white"
            } flex justify-between items-center py-2 mt-2`}
          >
            <h1>${budget && expense}</h1>
            <h1>${budget && budget.amount}</h1>
          </div>
          <Progress value={percentage} />
          <div
            className={`mt-2 ${
              percentage > 100 ? "block" : "hidden"
            } text-red-600`}
          >
            <h1>You had crossed budget limit</h1>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default BudgetCard;
