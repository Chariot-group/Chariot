"use client";
import { Card } from "@/components/ui/card";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Page() {

    const t = useTranslations("NotFound");
    const pathname = usePathname();

    const [locale, setLocale] = useState<string>("en");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const pathSegments = pathname.split("/");
        setLocale(pathSegments[1] || "en"); // Default to "en" if no locale is found
    }, []);

    if (!isMounted) {
        return null; // Prevent rendering until mounted
    }
    return (
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-background">
            <Card className="w-[40%] shadow-md relative">
                <LocaleSwitcher className="absolute right-0 border-none shadow-none m-1 bg-card" />
                <div className="p-6 w-full flex flex-col items-center justify-center gap-[3dvh]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h1 className="text-xl font-bold">{t('title')}</h1>
                        <p className="text-muted-foreground text-center">{t('description')}</p>
                    </div>
                    <img src={"/illustrations/404/404_Owlbear_wb.webp"} alt="Owlbear 404 illustration" className="w-1/2"></img>
                    <Link href={`/${locale}/campaigns`} >
                        <Button>{t('backToHome')}</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
