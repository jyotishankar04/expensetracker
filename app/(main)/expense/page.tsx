import AddExpense from "@/components/Expense/AddExpense";
import ExpenseCard from "@/components/Expense/ExpenseCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function page() {
  return (
    <div className="p-4">
      <ExpenseCard />
    </div>
  );
}

export default page;
