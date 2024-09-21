import { Loader2Icon } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <Loader2Icon className="w-6 h-6 animate-spin text-primary" />
    </div>
  );
}
