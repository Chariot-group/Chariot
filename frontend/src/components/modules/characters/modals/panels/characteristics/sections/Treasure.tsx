import { Card } from "@/components/ui/card";
import { Champs } from "@/components/modules/characters/modals/PlayerModalDetails";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ITreasure from "@/models/player/treasure/ITreasure";

interface Props {
    treasure: ITreasure;
}
export default function Treasure({ treasure }: Props) {

    const [cp, setCp] = useState<number>(treasure.cp);
    const [sp, setSp] = useState<number>(treasure.sp);
    const [ep, setEp] = useState<number>(treasure.ep);
    const [gp, setGp] = useState<number>(treasure.gp);
    const [pp, setPp] = useState<number>(treasure.pp);
    const [notes, setNotes] = useState<string | undefined>(treasure.notes);
    
    return (
        <Card className="bg-card p-4 flex flex-row gap-2 bg-background">
            <div className="flex flex-col w-1/4 justify-center">
                <Champs color="card" label="Pièce de cuivre" value={cp} id={"cp"} type={"number"} placeholder={"Pièce de cuivre"} setValue={setCp} />
                <Champs color="card" label="Pièce d'argent" value={sp} id={"sp"} type={"number"} placeholder={"Pièce d'argent"} setValue={setSp} />
                <Champs color="card" label="Pièce d'electrum" value={ep} id={"ep"} type={"number"} placeholder={"Pièce d'electrum"} setValue={setEp} />
                <Champs color="card" id={"gp"} type={"text"} label={"Pièce d'or"} placeholder={"Pièce d'or"} value={gp} setValue={setGp}></Champs>
                <Champs color="card" id={"pp"} type={"text"} label={"Pièce de platine"} placeholder={"Pièce de platine"} value={pp} setValue={setPp}></Champs>
            </div>
            <div className="flex flex-col h-full gap-2 w-3/4">
                <Label htmlFor={"notes"} className="text-foreground font-bold">Notes</Label>
                <Textarea id={"notes"} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl w-full h-full resize-none bg-card border-ring" />
            </div>
        </Card>
    )
}