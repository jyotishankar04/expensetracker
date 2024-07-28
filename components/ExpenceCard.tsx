import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

function ExpenceCard() {
  return (
    <Card className=" border-slate-600 ">
      <CardHeader>
        <CardTitle className="text-xl">Expenses</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ExpenceCard;
