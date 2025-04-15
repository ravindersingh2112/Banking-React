import React from "react";
import { Toaster, toast } from "sonner";

const Toast = () => {
  return (
    <>
      <div >
        <Toaster position="top-right" richColors />
      </div>
    </>
  );
};

export default Toast;
