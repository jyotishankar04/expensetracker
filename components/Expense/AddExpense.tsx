"use client";

import { Button } from "@/components/ui/button";

import { Theme } from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import prisma from "@/lib/db";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AddExpense: React.FC<{ fetchExpense: () => void }> = ({
  fetchExpense,
}) => {
  const session = useSession();
  const [category, setCategory] = useState<any>([]);
  const fetchCategories = async () => {
    const { data } = await axios.get(
      "https://expensemate.devsuvam.xyz/api/budget/list"
    );
    setCategory(data);
  };
  const [data, setData] = useState({
    name: "",
    amount: 0,
    category_id: "",
  });
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSubmit = async () => {
    if (data.amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (data.name === "") {
      toast.error("Name must be given");
      return;
    }
    if (data.category_id === "") {
      toast.error("Category must be selected");
      return;
    }
    const res = await fetch("/api/expense/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Failed to add expense");
      return;
    }
    toast.success("Expense added successfully");
    fetchExpense();
    return;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 font-semibold text-lg">Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new expense to your budget with a name, amount, and category.
        </DialogDescription>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <Label htmlFor="name">Expense Name</Label>
            <Input
              type="text"
              placeholder="Ex-  Buy a T-Shirt from Amazon"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="amount">Expense Amount</Label>
            <Input
              type="number"
              placeholder="Ex-  1000"
              value={data.amount}
              onChange={(e) =>
                setData({ ...data, amount: Number(e.target.value) })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="amount">Select Budget Category</Label>
            <Select
              onValueChange={(e: any) => {
                setData({ ...data, category_id: e });
              }}
              defaultValue={data.category_id}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(Array.isArray(category) &&
                    category.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))) || <p>No Categories found</p>}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;
