"use client"

import Loading from "@/components/common/Loading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/useToast"
import authService from "@/services/authService"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { setCookie } from "nookies";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const t = useTranslations("LoginPage");
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const emailRef = useRef<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef<string>("");

    const updateEmail = (email: string) => {
        emailRef.current = email;
        setEmail(email);
    }
    const updatePassword = (password: string) => {
        passwordRef.current = password;
        setPassword(password);
    }

    const { error, success } = useToast();

    const login = useCallback(async () => {
        if(loading) return;
        setLoading(true);
        try {
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailRegex.test(emailRef.current)){
                error(t("errors.invalidEmail"));
                return;
            }

            const response = await authService.login({email: emailRef.current, password: passwordRef.current});
            if(response.statusCode && response.statusCode !== 200) {
                error(t("errors.invalidCredentials"));
                return;
            }else{
                success(t("success.login"));
                setCookie(null, "accessToken", response.access_token, {
                    maxAge: 24 * 60 * 60, // 30 days
                    path: "/",
                });
                router.push("/");
            }
        } catch (err) {
            error(t("errors.internal"));
        } finally {
            setLoading(false);
        }
    }, [loading]);

    return (
        <div className="w-full h-[100dvh] gap-2 flex flex-col items-center justify-center bg-background">
            <Card className="w-[40%] shadow-md relative">
                <LocaleSwitcher className="absolute right-0 border-none shadow-none m-1 bg-card" />
                <div className="p-6 w-full flex flex-col items-center justify-center gap-[5dvh]">
                    <h1 className="text-xl font-bold">{t("title")}</h1>
                    <div className="w-full flex flex-col gap-[5dvh] items-center justify-center">
                        <div className="w-[50%] flex flex-col gap-4">
                            <Input placeholder={t("email")} type="email" value={email} onChange={(e) => updateEmail(e.target.value)} className="bg-background" />
                            <div className="flex flex-col gap-2">
                                <Input placeholder={t("password")} type="password" value={password} onChange={(e) => updatePassword(e.target.value)} className="bg-background" />
                                <p className="text-[0.8rem] font-medium">
                                    <Link href="forget-password" className="hover:underline underline-offset-2">{t("forgotPassword")}</Link>
                                </p>
                            </div>
                        </div>
                        { 
                            !loading &&
                            <Button className="w-[20%]" onClick={() => login()}>{t("login")}</Button>
                        }
                        { 
                            loading &&
                            <Button className="w-[20%]">
                                <Loading />
                            </Button>
                        }
                    </div>
                </div>
            </Card>
            <div className="w-[40%] flex flex-col items-left">
                <p className="text-sm text-foreground">{t("noAccount.text")} <Link target="_blank" href="#" className="hover:underline underline-offset-2">{t("noAccount.link")}</Link></p>
            </div>
        </div>
    )
}