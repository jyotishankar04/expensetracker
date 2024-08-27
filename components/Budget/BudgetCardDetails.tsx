"use client";
import { useEffect, useState } from "react";
import BudgetCard from "./BudgetCard";
import axios from "axios";
import LoadingPluse from "../LoadingPluse";

const BudgetCardDetails: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fetchBudget = async (id: any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://expensemate.devsuvam.xyz/api/budget/${id}`
      );
      setData(response.data);
    } catch (error) {
      // console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBudget(id);
  }, [id]);
  if (loading) {
    <div className="col-span-2">
      <LoadingPluse />
    </div>;
  }
  return (
    <>
      {data && (
        <div className="col-span-2">
          <BudgetCard budget={data} />
        </div>
      )}
      {/* {!data && <div>Error in fetching data</div>} */}
    </>
  );
};

export default BudgetCardDetails;
