"use client";

import Field from "@/components/common/Field";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import AuthService from "@/services/authService";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";

interface ConfirmEmailProps {
  setStep: (step: 1 | 2 | 3) => void;
  setUserId: (userId: string) => void;
}
export default function ConfirmEmail({ setStep, setUserId }: ConfirmEmailProps) {
  const t = useTranslations("confirmEmail");
  const { success, error } = useToast();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = useCallback(async (email: string) => {
    try {
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        error(t("toasts.invalidEmail"));
        return;
      }
      setLoading(true);
      let locale = window.location.pathname.split("/")[1];
      let reponse = await AuthService.resetPassword(email, locale);
      if (reponse.statusCode && reponse.statusCode === 200) {
        error(t("toasts.emailNotFound"));
        setLoading(false);
        return;
      }
      if (reponse.statusCode && reponse.statusCode !== 200) {
        error(t("toasts.internal"));
        setLoading(false);
        return;
      }
      setUserId(reponse.data._id);
      success(t("toasts.sendingEmail"));
      setLoading(false);
      setStep(2);
    } catch (e) {
      console.log(e);
      error(t("toasts.internal"));
    }
  }, []);

  return (
    <div className="p-6 w-full flex flex-col items-center justify-center gap-[4dvh]">
      <div className="w-full flex flex-col items-center justify-center gap-[1dvh]">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="text-sm w-[70%] text-center">{t("description")}</p>
      </div>
      <div className="w-full flex flex-col gap-[4dvh] items-center justify-center">
        <div className="w-[50%]">
          <Field
            id={"email"}
            type={"email"}
            label={t("label")}
            placeholder={t("placeholder")}
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className="w-[50%] flex flex-row gap-[2dvh] items-center justify-center">
          <Button variant={"outline"}>
            <Link href={"login"}>{t("cancel")}</Link>
          </Button>
          {!loading && <Button onClick={() => sendEmail(email)}>{t("send")}</Button>}
          {loading && (
            <Button className="w-[20%]">
              <Loading />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
