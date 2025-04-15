"use client";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { useState } from "react";

export default function Home() {

  return (
    <div className="flex flex-col">
      <LocaleSwitcher />
    </div>
  );
}
