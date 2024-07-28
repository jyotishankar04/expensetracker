"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { timeParser } from "@/lib/timeParser";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import toast from "react-hot-toast";
import AddExpense from "./AddExpense";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingPluse from "../LoadingPluse";

function ExpenseCard() {
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [expenses, setExpense] = useState<any>();

  const fetchExpense = async () => {
    setExpenseLoading(true);
    const expenses = await axios.get("http://localhost:3000/api/expense/list");
    const data = await expenses.data;

    setExpense(data);
    setExpenseLoading(false);
  };
  useEffect(() => {
    fetchExpense();
  }, []);
  const deleteExpense = async (id: string) => {
    setButtonLoading(true);
    const res = await fetch(`api/expense/delete/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Failed to delete expense");
      setButtonLoading(false);
      return;
    }
    toast.success("Expense deleted successfully");
    fetchExpense();
    setButtonLoading(false);
    window.location.reload();
  };
  if (expenseLoading) {
    return (
      <div>
        <LoadingPluse />
      </div>
    );
  }

  return (
    <div>
      <Card
        className={`border-slate-600 ${
          window.location.pathname == "/expense" ? "block" : "hidden"
        }`}
      >
        <CardHeader>
          <CardTitle>My Expenses</CardTitle>
          <div className="text-sm text-gray-400">
            You have no expenses yet. Add some by clicking on the plus icon.
          </div>
          <div className="">
            <AddExpense fetchExpense={fetchExpense} />
          </div>
        </CardHeader>
      </Card>
      <div className="mt-4">
        <Card className=" border-slate-600 overflow-hidden ">
          <CardHeader>
            <CardTitle className="text-xl">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 ext-center">
              <CardDescription className="text-xl">Name</CardDescription>
              <CardDescription className="text-xl">Amount</CardDescription>
              <CardDescription className="text-xl">Date</CardDescription>
              <CardDescription className="text-xl">Action</CardDescription>
            </div>
          </CardContent>
          <div className="">
            {expenseLoading && (
              <div className="w-full flex justify-center items-center my-5">
                <div className="w-52 aspect-square rounded-full border-green-500 border-b-8 border-y-transparent animate-spin"></div>
              </div>
            )}
            {expenses &&
              expenses.map((expense: any) => (
                <div
                  key={expense.id}
                  className=" grid  px-6 hover:bg-slate-800 py-2 border-b border-slate-600 gap-2 grid-cols-4"
                >
                  <CardDescription className="text-xl overflow-hidden line-clamp-1">
                    {expense.name}
                  </CardDescription>
                  <CardDescription className="text-xl overflow-hidden line-clamp-1">
                    {expense.amount}
                  </CardDescription>
                  <CardDescription className="text-xl overflow-hidden line-clamp-1">
                    {timeParser(expense.created_at)}
                  </CardDescription>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"destructive"}>Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] border-red-500">
                        <DialogHeader>
                          <DialogTitle>Are You Sure</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          Delete this expense?
                        </DialogDescription>
                        <DialogDescription>
                          <Button
                            variant={"destructive"}
                            onClick={() => deleteExpense(expense.id)}
                          >
                            {buttonLoading ? (
                              <div className="animate-spin w-6  aspect-square rounded-full border-y-transparent border-2"></div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ExpenseCard;
