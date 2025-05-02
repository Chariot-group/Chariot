"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useBeforeUnload(shouldWarn: boolean) {
    const router = useRouter();

    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (shouldWarn) {
          e.preventDefault();
          e.returnValue = "";
        }
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [shouldWarn]);

    useEffect(() => {
      if (!shouldWarn) return;
  
      const originalPush = router.push;
  
      const customPush = (href: string) => {
        const confirmed = confirm('Vous avez des modifications non sauvegardées. Continuer ?');
        if (confirmed) {
          originalPush(href);
        }
      };
  
      router.push = customPush;
  
      return () => {
        router.push = originalPush;
      };
    }, [shouldWarn, router]);
  }