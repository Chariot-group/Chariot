"use client";

import { ToastContainer } from "react-toastify";
import "@/app/globals.css";


const CustomToastContainer = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar />;
};

export default CustomToastContainer;
