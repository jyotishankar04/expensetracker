import AddBudget from "@/components/Budget/AddBudget";
import BudgetCard from "@/components/Budget/BudgetCard";
import BudgetList from "@/components/Budget/BudgetList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

async function fetchBudgets() {
  try {
    axios
      .get("https://expensemate.devsuvam.xyz/api/budget/list")
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.error("Error fetching budgets", error);
    return [];
  }
}
async function page() {
  const data: any = await fetchBudgets();
  // console.log(data);

  return (
    <div className="p-4 ">
      <Card className="border-none bg-[#161318]">
        <CardTitle>My Budgets</CardTitle>
        <div className="p-5">
          <AddBudget />
        </div>
      </Card>

      <div className="w-full">
        <BudgetList />
      </div>
    </div>
  );
}

export default page;

//  {
//    data ? (
//      <div className="w-full grid grid-cols-4 gap-6">
//        {Array.isArray(data) &&
//          data.map((value: any) => <BudgetCard budget={value} key={value.id} />)}
//      </div>
//    ) : (
//      <div className="w-full flex justify-center items-center my-10 flex-col">
//        <CardHeader>
//          <CardTitle>No Budgets Found</CardTitle>
//        </CardHeader>
//        <CardContent>
//          {`
//                 No budgets have been created yet. Click on the "Add Budget" button
//                 to create your first budget.`}
//        </CardContent>
//      </div>
//    );
//  }
