"use client"
import React, { useEffect } from "react";
import "toastr/build/toastr.min.css";
import { showToast } from "@/lib/toast";

const ToastContainer: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div id="toast-container"></div>
  );
};

export default ToastContainer;
