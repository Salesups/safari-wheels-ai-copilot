import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={cn("animate-spin rounded-full border-2 border-muted border-t-primary", sizeClasses[size], className)} />
  );
};

export const LoadingCard = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse space-y-3", className)}>
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="h-4 bg-muted rounded w-1/2"></div>
    <div className="h-4 bg-muted rounded w-5/6"></div>
  </div>
);

export const LoadingButton = ({ children, isLoading, ...props }: any) => (
  <button disabled={isLoading} {...props}>
    {isLoading ? <LoadingSpinner size="sm" /> : children}
  </button>
);