import { Loader2Icon } from "lucide-react";

interface LoadingSwapProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function LoadingSwap({ children, isLoading }: LoadingSwapProps) {
  return (
    <div className="flex justify-center gap-2 items-center">
      {children}
      {isLoading && <Loader2Icon className="animate-spin" />}
    </div>
  );
}
