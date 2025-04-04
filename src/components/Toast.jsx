import React from "react";
import { Toaster, toast } from "sonner";

const Toast = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Toaster position="top-right" richColors />
      </div>
    </>
  );
};

export default Toast;
