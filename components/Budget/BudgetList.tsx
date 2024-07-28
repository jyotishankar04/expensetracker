"use client";

import { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import LoadingPluse from "../LoadingPluse";

function BudgetList() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/budget/list");

      const data = await response.json();
      console.log(data);

      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <LoadingPluse />
      </div>
    );
  }
  return (
    <div className="w-full">
      {data && data.length > 0 ? (
        <div className="w-full grid grid-cols-4 gap-6">
          {Array.isArray(data) &&
            data.map((value: any) => (
              <BudgetCard budget={value} key={value.id} />
            ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center my-10 flex-col">
          <CardHeader>
            <CardTitle>No Budgets Found</CardTitle>
          </CardHeader>
          <CardContent>
            {`
                No budgets have been created yet. Click on the "Add Budget" button
                to create your first budget.`}
          </CardContent>
        </div>
      )}
    </div>
  );
}

export default BudgetList;
