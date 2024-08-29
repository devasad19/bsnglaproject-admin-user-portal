"use client";
import { useEffect } from "react";

export default function Error({ error, reset }:any) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      {/* <h2 className="text-2xl font-bold text-red-700 font-mono lowercase">
        {error.message}.
      </h2> */}
      <button
        onClick={() => reset()}
        className="bg-primary text-white p-2 rounded-md"
      >
        Try Again
      </button>
    </div>
  );
}
