"use client";

import React from "react";
import BudgetCardDetails from "./BudgetCardDetails";
import AddBudgetExpense from "../AddBudgetExpense";
import { useRouter } from "next/navigation";
import ExpenseCard from "../Expense/ExpenseCard";

const BudgetWraper = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <>
      <BudgetCardDetails id={id} />
      <AddBudgetExpense router={router} />
      <div className="col-span-2">
        <ExpenseCard />
      </div>
    </>
  );
};

export default BudgetWraper;
