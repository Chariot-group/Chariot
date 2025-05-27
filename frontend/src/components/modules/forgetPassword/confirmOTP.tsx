"use client";

import Field from "@/components/common/Field";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";

interface ConfirmOTPProps {
  setStep: (step: 1 | 2 | 3) => void;
  setOTP: (otp: string) => void;
  otp: string;
}
export default function ConfirmOTP({ setStep, setOTP, otp }: ConfirmOTPProps) {
  const t = useTranslations("confirmOTP");

  return (
    <div className="p-6 w-full flex flex-col items-center justify-center gap-[4dvh]">
      <div className="w-full flex flex-col items-center justify-center gap-[1dvh]">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="text-sm w-[70%] text-center">{t("description")}</p>
      </div>
      <div className="w-full flex flex-col gap-[4dvh] items-center justify-center">
        <div className="w-[50%] justify-center flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(e) => setOTP(e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="w-[50%] flex flex-row gap-[2dvh] items-center justify-center">
          <Button variant={"outline"}>
            <Link href={"login"}>{t("cancel")}</Link>
          </Button>
          <Button onClick={() => setStep(3)}>{t("send")}</Button>
        </div>
      </div>
    </div>
  );
}
