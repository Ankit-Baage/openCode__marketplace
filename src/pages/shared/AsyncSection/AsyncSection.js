import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export const AsyncSection = ({
  children,
  fallback = null,
  onRetry = () => {},
  errorMessage = "Something went wrong while loading this section.",
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={() => {
            reset();
            onRetry();
          }}
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-red-500 font-medium mb-2">{errorMessage}</p>
              <p className="text-xs text-gray-400 mb-3">{error?.message}</p>
              <button
                onClick={resetErrorBoundary}
                className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
