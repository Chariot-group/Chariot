import HealthCheck from "@/components/modules/monitoring/HealthCheck";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <HealthCheck />
      <h1>{t("title")}</h1>
      <p>{t("about")}</p>
    </div>
  );
}
