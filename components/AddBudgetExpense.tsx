"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddBudgetExpense: React.FC<{ router: any }> = ({ router }) => {
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    amount: 0,
    category_id: id,
  });
  const handleSubmit = async () => {
    if (data.amount <= 0) {
      toast.error("Amount Most Needed");
      return;
    }
    if (data.name === "") {
      toast.error("Name Most Needed");
      return;
    }

    setButtonLoading(true);
    const res = await fetch(
      `https://expensemate.devsuvam.xyz/api/expense/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      toast.error("Failed to add expense");
      setButtonLoading(false);
      return;
    }
    toast.success("Expense Added Successfully");
    router.refresh();
    setData({
      name: "",
      amount: 0,
      category_id: id,
    });
    setButtonLoading(false);
  };
  return (
    <Card className="border-slate-700 hover:border-slate-100">
      <CardHeader>
        <CardTitle className="text-xl">Add Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            disabled={buttonLoading}
            type="text"
            placeholder="Ex- T-shirt"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <Label>Amount</Label>
          <Input
            disabled={buttonLoading}
            type="number"
            placeholder="Ex- 2999"
            onChange={(e) =>
              setData({ ...data, amount: Number(e.target.value) })
            }
            value={data.amount}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            disabled={buttonLoading}
            className={`w-full text-white `}
            onClick={handleSubmit}
          >
            {buttonLoading ? (
              <div className="w-6 aspect-square border-4 border-white rounded-full border-y-transparent animate-spin"></div>
            ) : (
              "Add Expense"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddBudgetExpense;
