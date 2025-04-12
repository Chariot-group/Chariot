import { useLocale, useTranslations } from "next-intl";

export default function GroupsCampaignsPanel() {

    const currentLocale = useLocale();
    const t = useTranslations("CharacterListPanel");

    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex">
                <h2>{}</h2>
            </div>
        </div>
    );

}