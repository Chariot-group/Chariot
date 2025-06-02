"use client";
import { Stepper } from "@/components/common/Stepper";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import ChangePassword from "@/components/modules/forgetPassword/changePassword";
import ConfirmEmail from "@/components/modules/forgetPassword/confirmEmail";
import ConfirmOTP from "@/components/modules/forgetPassword/confirmOTP";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgetPassword");

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [otp, setOTP] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="w-full h-[100dvh] gap-1 flex flex-col items-center bg-background">
      <div className="w-[40%] h-1/3 flex flex-col justify-center ">
        <Stepper
          currentStep={step}
          steps={[t("step.step1"), t("step.step2"), t("step.step3")]}
        />
      </div>
      <Card className="w-[40%] shadow-md relative">
        <LocaleSwitcher className="absolute right-0 border-none shadow-none m-1 bg-card" />
        {step === 1 && (
          <ConfirmEmail
            setStep={setStep}
            setUserId={setUserId}
          />
        )}
        {step === 2 && (
          <ConfirmOTP
            setStep={setStep}
            setOTP={setOTP}
            otp={otp}
          />
        )}
        {step === 3 && (
          <ChangePassword
            otp={otp}
            userId={userId}
            setStep={setStep}
          />
        )}
      </Card>
      {step === 2 && (
        <div className="w-[40%] flex flex-row items-left ">
          <div className="flex flex-col items-left">
            <Button
              variant={"link"}
              className="text-sm text-foreground p-0"
              onClick={() => setStep(1)}>
              {t("wrongEmail")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
