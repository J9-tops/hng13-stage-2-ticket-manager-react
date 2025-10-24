import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorSVG from "../ui/ErrorSVG";
import Header from "./Header";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-6 text-center">
        <div className="max-w-80">
          <ErrorSVG />
        </div>
        <h1 className="mb-6 text-4xl font-bold">Something went wrong!</h1>
        <p className="text-md mb-2">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 mt-4 cursor-pointer rounded-lg px-6 py-3 text-white transition-colors"
          >
            Try again
          </button>
          <Link
            to="/"
            className="bg-primary hover:bg-primary/90 mt-4 rounded-lg px-6 py-3 text-white transition-colors"
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
