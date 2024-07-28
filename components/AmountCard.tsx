import { Progress } from "@radix-ui/react-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AmountCard: React.FC<{ value: any }> = ({ value }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-1" className="border-slate-700">
      <CardHeader className="pb-2">
        <CardDescription>{value.name}</CardDescription>
        <CardTitle
          className={`text-4xl ${
            value.amount < 0 ? "text-red-700" : "text-white"
          } `}
        >
          ${value.amount}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground"></div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
};

export default AmountCard;
