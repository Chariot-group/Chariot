// hooks/useSafeNavigation.ts
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function useSafeNavigation(isUpdating: boolean) {
  const router = useRouter();

  const t = useTranslations("CampaignPage");

  const safeNavigate = (href: string) => {
    if (isUpdating) {
      const confirmed = confirm('Vous allez perdre vos modifications. Continuer ?');
      if (!confirmed) return;
    }
    router.push(href);
  };

  return safeNavigate;
}
