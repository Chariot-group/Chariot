"use client"

import Loading from "@/components/common/Loading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/useToast"
import authService from "@/services/authService"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { setCookie } from "nookies";

export default function LoginPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { error, success } = useToast();

    const login = useCallback(async () => {
        if(loading) return;
        setLoading(true);
        try {
            const response = await authService.login({email, password});
            if(response.statusCode && response.statusCode !== 200) {
                error("Login or password is incorrect");
            }else{
                success("Login successful");
                setCookie(null, "accessToken", response.access_token, {
                    maxAge: 24 * 60 * 60, // 30 days
                    path: "/",
                });
                document.location.href = "/";
            }
        } catch (err) {
            console.log(err);
            error("An error occurred while logging in.");
        } finally {
            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (document.cookie.includes("accessToken")) {
            document.location.href = "/";
        }
    }, []);
    
    return (
        <div className="w-full h-[100dvh] gap-2 flex flex-col items-center justify-center bg-background">
            <Card className="w-[40%] shadow-md">
                <div className="p-6 w-full flex flex-col items-center justify-center gap-[5dvh]">
                    <h1 className="text-xl font-bold">Welcome to Chariot !</h1>
                    <div className="w-full flex flex-col gap-[5dvh] items-center justify-center">
                        <div className="w-[50%] flex flex-col gap-4">
                            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background" />
                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background" />
                        </div>
                        { 
                            !loading &&
                            <Button className="w-[20%]" onClick={() => login()}>Login</Button>
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
                <p className="text-sm text-foreground">No account yet? <Link target="_blank" href="#">Try our free trial</Link></p>
            </div>
        </div>
    )
}