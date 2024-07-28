import { Card, CardTitle } from "./ui/card";

function LoadingPluse() {
  return (
    <Card className="p-16 w-full h-full  duration-500 border-none">
      <CardTitle className="text-center">Loading please wait</CardTitle>

      <div className="flex mt-4 justify-center items-center">
        <div className="animate-spin w-20 h-20 border-8 duration-400 border-b-green-700 rounded-full" />
      </div>
    </Card>
  );
}

export default LoadingPluse;
