"use client"

import Field from "@/components/common/Field";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import AuthService from "@/services/authService";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ChangePasswordProps {
    otp: string;
    userId: string;
}
export default function ChangePassword({ otp, userId }: ChangePasswordProps) {

    const t = useTranslations("changePassword");
    const { success, error } = useToast();
    const router = useRouter();

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const changePassword = useCallback(async (password: string, confirmPassword: string) => {
        try{
            if(password !== confirmPassword){
                error(t("toasts.passwordsNotMatching"));
                return;
            }
            setLoading(true);
            let response = await AuthService.changePassword(userId, otp, password, confirmPassword);
            if(response.statusCode && response.statusCode === 401){
                error(t("toasts.invalidOTP"));
                setLoading(false);
                return;
            }
            if(response.statusCode && response.statusCode === 400){
                error(t("toasts.passwordsNotMatching"));
                setLoading(false);
                return;
            }
            if(response.statusCode && response.statusCode !== 200){
                error(t("toasts.internal"));
                setLoading(false);
                return;
            }
            success(t("toasts.passwordChanged"));
            setLoading(false);
            router.push("/auth/login");
        } catch (err) {
            console.error(err);
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
                <div className="w-[50%] flex flex-col gap-[2dvh]">
                    <Field id={"password"} type={"password"} label={t('password')} placeholder={t('placeholderPassword')} value={password} setValue={setPassword} />
                    <Field id={"confirmPassword"} type={"password"} label={t('confirmPassword')} placeholder={t('placeholderConfirmPassword')} value={confirmPassword} setValue={setConfirmPassword} />
                </div>
                <div className="w-[50%] flex flex-row gap-[2dvh] items-center justify-center">
                    <Button variant={"outline"}><Link href={"login"}>{t("cancel")}</Link></Button>
                    { 
                        !loading &&
                        <Button onClick={() => changePassword(password, confirmPassword)} >{t('send')}</Button>
                    }
                    { 
                        loading &&
                        <Button className="w-[20%]">
                            <Loading />
                        </Button>
                    }
                </div>

            </div>
        </div>
    );

}