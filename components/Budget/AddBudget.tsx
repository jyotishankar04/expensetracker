"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import toast from "react-hot-toast";
// import axiosClient from "@/lib/axiosConf";
// import axios from "axios";

function AddBudget() {
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState("😀");

  const [data, setData] = useState({
    name: "",
    amount: "",
    emoji:
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f604.png",
  });
  const handleSubmit = async () => {
    if (!data.amount) {
      toast.error("Amount Must be given");
      return;
    }
    if (data.name === "") {
      toast.error("Name must be given");
      return;
    }
    const res = await fetch("api/budget/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Failed to create budget");
      return;
    }
    toast.success("Budget created successfully");
    window.location.reload();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-dashed hover:shadow-md hover:shadow-green-600/35 hover:bg-[#252225]  flex justify-center items-center h-32 cursor-pointer">
          <CardHeader className="flex justify-center flex-col items-center">
            <FaPlus />
            <CardTitle className="text-xl">Add Budget</CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Budget</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Create a new budget with a name and target amount.
        </DialogDescription>
        <div>
          <Button
            variant={"secondary"}
            className="text-3xl aspect-square w-18 h-18"
            onClick={() => setEmojiOpen((prev) => !prev)}
          >
            {currentEmoji}
          </Button>
          <div className={`${isEmojiOpen ? "block" : "hidden"} absolute`}>
            <EmojiPicker
              onEmojiClick={(e) => {
                setCurrentEmoji(e.emoji);
                setData({ ...data, emoji: e.imageUrl });
                setEmojiOpen(false);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <Label htmlFor="name">Budget Name</Label>
            <Input
              type="text"
              placeholder="Ex-  Shoping"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="amount">Target Amount</Label>
            <Input
              type="number"
              placeholder="Ex-  1000"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBudget;
