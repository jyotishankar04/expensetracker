import AmountCard from "@/components/AmountCard";
import BudgetCard from "@/components/Budget/BudgetCard";
import MainComp from "@/components/Dashboard/MainComp";
import ExpenseCard from "@/components/Expense/ExpenseCard";
import { MainChart } from "@/components/MainChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchStarts } from "@/lib/fetch";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <Card className="bg-[#151418] border-0 p-7 w-full flex flex-col h-full overflow-auto">
      <MainComp />
    </Card>
  );
}

export default page;
