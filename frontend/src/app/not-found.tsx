"use client";
import { Card } from "@/components/ui/card";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {

    const t = useTranslations("NotFound");

    return (
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-background">
            <Card className="w-[40%] shadow-md relative">
                <LocaleSwitcher className="absolute right-0 border-none shadow-none m-1 bg-card" />
                <div className="p-6 w-full flex flex-col items-center justify-center gap-[5dvh]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h1 className="text-xl font-bold">{t('title')}</h1>
                        <p className="text-muted-foreground text-center">{t('description')}</p>
                    </div>
                    <Link href={"campaigns"}>
                        <Button>{t('backToHome')}</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
