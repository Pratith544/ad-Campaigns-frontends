import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-red-50 p-3 dark:bg-red-500/10">
        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Something went wrong
      </h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Try again
        </button>
      )}
    </div>
  );
}
