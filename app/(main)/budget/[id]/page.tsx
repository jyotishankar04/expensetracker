import AddBudgetExpense from "@/components/AddBudgetExpense";
import BudgetCard from "@/components/Budget/BudgetCard";
import BudgetCardDetails from "@/components/Budget/BudgetCardDetails";
import BudgetWraper from "@/components/Budget/BudgetWraper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full p-4">
      <BudgetWraper id={params.id} />
    </div>
  );
};

export default page;
