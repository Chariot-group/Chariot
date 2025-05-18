import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IPlayer from "@/models/player/IPlayer";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Characteristic from "./panels/characteristics/Characteristic";
import Stats from "./panels/stats/Stats";
import Plus from "./panels/plus/Plus";

interface Props {
    player: IPlayer;
    onClose: () => void;
}
export default function PlayerModalDetails( { player, onClose }: Props ) {

    const t = useTranslations("CharacterDetailsPanel");

    const [panel, setPanel] = useState<"characteristics" | "stats" | "spells" | "plus">("characteristics");

    const [name, setName] = useState<string>(player.name);

    return (
        <Card className="h-full w-full p-4 flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-3 h-[10%]">
                <div className="flex flex-row items-center gap-2">
                    <Champs label="Nom" value={name} id={"name"} type={"text"} placeholder={"Nom"} setValue={setName} />
                    <Badge >{t(player.kind)}</Badge>
                </div>
                
                <div className="flex flex-row items-center gap-3">
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "characteristics" && 'underline'}`} onClick={() => setPanel("characteristics")}>Charactéristiques</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "stats" && 'underline'}`} onClick={() => setPanel("stats")}>Statistique</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "spells" && 'underline'}`} onClick={() => setPanel("spells")}>Sorts</span>
                    <span className={`hover:underline underline-offset-2 cursor-pointer ${panel === "plus" && 'underline'}`} onClick={() => setPanel("plus")}>Plus</span>
                </div>
                <XIcon onClick={onClose} className="cursor-pointer" />
            </div>
            {panel === "characteristics" && <Characteristic player={player} />}
            {panel === "stats" && <Stats player={player} />}
            {panel === "spells" && <div>Spells</div>}
            {panel === "plus" && <Plus player={player} />}
        </Card>
    );
}

interface IChampsProps {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: any | null;
    setValue: (value: any) => void;
    onChange?: () => void;
    color?: string;
    isActive?: boolean;
    width?: string;
}
export function Champs({ id, type, label, placeholder, value, setValue, color = "background", onChange, isActive = true, width }: IChampsProps) {

    const [pending, setPending] = useState(false);

    const handleChange = (e: any) => {
        setPending(true);
        setValue(e.target.value);
    };

    useEffect(() => {
    if (pending) {
        onChange?.();
        setPending(false);
    }
    }, [value]);

    return (
        <div className="flex flex-row items-center w-full">
            <Label htmlFor={id} className="text-foreground flex flex-row gap-1 items-center w-full"><span className="font-bold w-auto">{label}:</span>
                <Input id={id} type={type} value={value ?? ""} onChange={handleChange} placeholder={placeholder} className={`${type === 'number' ? 'w-10' : 'w-[10vh]'} ${width} p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } readOnly={!isActive} />
            </Label>
        </div>
    );

}