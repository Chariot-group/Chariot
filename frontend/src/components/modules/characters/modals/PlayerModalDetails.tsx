import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SIZES } from "@/constants/CharacterConstants";
import IPlayer from "@/models/player/IPlayer";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
    player: IPlayer;
    onClose: () => void;
}
export default function PlayerModalDetails( { player, onClose }: Props ) {

    const t = useTranslations("CharacterDetailsPanel");

    const [name, setName] = useState<string>(player.name);

    const [level, setLevel] = useState<number>(player.progression.level);
    const [experience, setExperience] = useState<number>(player.progression.experience);
    const [race, setRace] = useState<string | undefined>(player.profile.race);
    const [subrace, setSubrace] = useState<string | undefined>(player.profile.subrace);
    const [alignment, setAlignment] = useState<string | undefined>(player.profile.alignment);

    const [eyes, setEyes] = useState<string | undefined>(player.appearance.eyes);
    const [hair, setHair] = useState<string | undefined>(player.appearance.hair);
    const [skin, setSkin] = useState<string | undefined>(player.appearance.skin);
    const [height, setHeight] = useState<string | undefined>(player.appearance.height);
    const [weight, setWeight] = useState<string | undefined>(player.appearance.weight);
    const [age, setAge] = useState<number | undefined>(player.appearance.age);

    const [strengthST, setStrengthST] = useState<number>(player.stats.savingThrows.strength);
    const [dexterityST, setDexterityST] = useState<number>(player.stats.savingThrows.dexterity);
    const [constitutionST, setConstitutionST] = useState<number>(player.stats.savingThrows.constitution);
    const [intelligenceST, setIntelligenceST] = useState<number>(player.stats.savingThrows.intelligence);
    const [wisdomST, setWisdomST] = useState<number>(player.stats.savingThrows.wisdom);
    const [charismaST, setCharismaST] = useState<number>(player.stats.savingThrows.charisma);

    const [strengthAS, setStrengthAS] = useState<number>(player.stats.abilityScores.strength);
    const [dexterityAS, setDexterityAS] = useState<number>(player.stats.abilityScores.dexterity);
    const [constitutionAS, setConstitutionAS] = useState<number>(player.stats.abilityScores.constitution);
    const [intelligenceAS, setIntelligenceAS] = useState<number>(player.stats.abilityScores.intelligence);
    const [wisdomAS, setWisdomAS] = useState<number>(player.stats.abilityScores.wisdom);
    const [charismaAS, setCharismaAS] = useState<number>(player.stats.abilityScores.charisma);

    const [personalityTraits, setPersonalityTraits] = useState<string | undefined>(player.background.personalityTraits);
    const [ideals, setIdeals] = useState<string | undefined>(player.background.ideals);
    const [bonds, setBonds] = useState<string | undefined>(player.background.bonds);
    const [flaws, setFlaws] = useState<string | undefined>(player.background.flaws);
    const [alliesAndOrgs, setAlliesAndOrgs] = useState<string | undefined>(player.background.alliesAndOrgs);
    const [backstory, setBackstory] = useState<string | undefined>(player.background.backstory);

    const [cp, setCp] = useState<number>(player.treasure.cp);
    const [sp, setSp] = useState<number>(player.treasure.sp);
    const [ep, setEp] = useState<number>(player.treasure.ep);
    const [gp, setGp] = useState<number>(player.treasure.gp);
    const [pp, setPp] = useState<number>(player.treasure.pp);
    const [notes, setNotes] = useState<string | undefined>(player.treasure.notes);

    const [maxHitPoints, setMaxHitPoints] = useState<number>(player.stats.maxHitPoints);
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(player.stats.currentHitPoints);
    const [tempHitPoints, setTempHitPoints] = useState<number>(player.stats.tempHitPoints);
    const [armorClass, setArmorClass] = useState<number>(player.stats.armorClass);
    const [size, setSize] = useState<string>(player.stats.size);

    return (
        <Card className="h-full w-full p-4 flex flex-col gap-2">
            <div className="flex flex-row justify-between gap-3 h-1/7">
                <div className="flex flex-row items-center gap-2">
                    <Champs label="Nom" value={name} id={"name"} type={"text"} placeholder={"Nom"} setValue={setName} />
                    <Badge >{t(player.kind)}</Badge>
                </div>
                
                <div className="flex flex-row items-center gap-3">
                    <span className="hover:underline underline-offset-2 cursor-pointer">Caractéristiques</span>
                    <span className="hover:underline underline-offset-2 cursor-pointer">Statistique</span>
                    <span className="hover:underline underline-offset-2 cursor-pointer">Sorts</span>
                </div>
                <XIcon onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="flex flex-row gap-3 h-full h-6/7">
                <div className="flex flex-row gap-3 w-1/3 h-full">
                    <div className="flex flex-col gap-3 w-1/2 h-full">
                        {/* Stats */}
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Force" value={strengthST} id={"strengthST"} type={"number"} placeholder={"Force"} setValue={setStrengthST} />
                            <Champs color="card" label="Jet de sauvegarde" value={strengthAS} id={"strengthAS"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setStrengthAS} />
                        </Card>
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Dextérité" value={dexterityAS} id={"dexterityAS"} type={"number"} placeholder={"Dextérité"} setValue={setDexterityAS} />
                            <Champs color="card" label="Jet de sauvegarde" value={dexterityST} id={"dexterityST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setDexterityST} />
                        </Card>
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Constitution" value={constitutionAS} id={"constitutionAS"} type={"number"} placeholder={"Constitution"} setValue={setConstitutionAS} />
                            <Champs color="card" label="Jet de sauvegarde" value={constitutionST} id={"constitutionST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setConstitutionST} />
                        </Card>
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Intelligence" value={intelligenceAS} id={"intelligenceAS"} type={"number"} placeholder={"Intelligence"} setValue={setIntelligenceAS} />
                            <Champs color="card" label="Jet de sauvegarde" value={intelligenceST} id={"intelligenceST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setIntelligenceST} />
                        </Card>
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Sagesse" value={wisdomAS} id={"wisdomAS"} type={"number"} placeholder={"Sagesse"} setValue={setWisdomAS} />
                            <Champs color="card" label="Jet de sauvegarde" value={wisdomST} id={"wisdomST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setWisdomST} />
                        </Card>
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background h-1/6">
                            <Champs color="card" label="Charisme" value={charismaAS} id={"charismaAS"} type={"number"} placeholder={"Force"} setValue={setCharismaAS} />
                            <Champs color="card" label="Jet de sauvegarde" value={charismaST} id={"charismaST"} type={"number"} placeholder={"Jet de sauvegarde"} setValue={setCharismaST} />
                        </Card>
                    </div>
                    <div className="flex flex-col gap-3 w-1/2 h-full">
                        {/* PV */}
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background">
                            <Champs color="card" label="PV maximum" value={maxHitPoints} id={"maxHP"} type={"number"} placeholder={"PV maximum"} setValue={setMaxHitPoints} />
                            <Champs color="card" label="PV" value={currentHitPoints} id={"hp"} type={"number"} placeholder={"PV"} setValue={setCurrentHitPoints} />
                            <Champs color="card" label="PV temporaire" value={tempHitPoints} id={"tempHP"} type={"number"} placeholder={"PV temporaire"} setValue={setTempHitPoints} />
                            <Champs color="card" label="Class d'armure" value={armorClass} id={"armorClass"} type={"number"} placeholder={"Class d'armure"} setValue={setArmorClass} />
                        </Card>

                        {/* Profile + Progression */}
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background">
                            <Champs color="card" label="Niveau" value={level} id={"level"} type={"number"} placeholder={"Niveau"} setValue={setLevel} />
                            <Champs color="card" label="Expérience" value={experience} id={"experience"} type={"number"} placeholder={"Expérience"} setValue={setExperience} />
                            <Champs color="card" id={"race"} type={"text"} label={"Race"} placeholder={"Race"} value={race} setValue={setRace}></Champs>
                            <Champs color="card" id={"subrace"} type={"text"} label={"Sous-race"} placeholder={"Sous-race"} value={subrace} setValue={setSubrace}></Champs>
                            <Champs color="card" id={"alignment"} type={"text"} label={"Alignement"} placeholder={"Alignement"} value={alignment} setValue={setAlignment}></Champs>
                        </Card>
                            
                        {/* Appareance */}
                        <Card className="bg-card p-4 flex flex-col gap-2 bg-background">
                            <Champs color="card" label="Yeux" value={eyes} id={"eyes"} type={"text"} placeholder={"Yeux"} setValue={setEyes} />
                            <Champs color="card" label="Cheveux" value={hair} id={"hair"} type={"text"} placeholder={"Cheveux"} setValue={setHair} />
                            <Champs color="card" label="Peau" value={skin} id={"skin"} type={"text"} placeholder={"Peau"} setValue={setSkin} />
                            <Champs color="card" id={"age"} type={"number"} label={"Age"} placeholder={"Age"} value={age} setValue={setAge}></Champs>
                            <Champs color="card" id={"height"} type={"number"} label={"Taille"} placeholder={"Taille"} value={height} setValue={setHeight}></Champs>
                            <Champs color="card" id={"weight"} type={"number"} label={"Poids"} placeholder={"Poids"} value={weight} setValue={setWeight}></Champs>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label className="text-foreground flex flex-row gap-1 items-center"><span className="font-bold">Taille:</span>
                                    <Select onValueChange={setSize} defaultValue={size}>
                                        <SelectTrigger className="p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                            <SelectValue placeholder="Taille" />
                                        </SelectTrigger>
                                        <SelectContent className="border-ring">
                                            {
                                                SIZES.map((size) => (
                                                    <SelectItem key={size} value={size}>
                                                        {size}
                                                    </SelectItem>
                                                ))
                                            }
                                            <SelectItem value="tiny">Tiny</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Label>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-2/3 h-full">
                    <Card className="bg-card p-4 flex flex-row gap-2 bg-background h-2/3">
                        <div className="flex flex-col gap-3 w-full h-full">
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"personalityTraits"} className="text-foreground">Trait personnel</Label>
                                <Textarea id={"personalityTraits"} placeholder="Trait personnel" value={personalityTraits} onChange={(e) => setPersonalityTraits(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                            </div>
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"ideals"} className="text-foreground">Idéal</Label>
                                <Textarea id={"ideals"} placeholder="Idéal" value={ideals} onChange={(e) => setIdeals(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                            </div>
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"bonds"} className="text-foreground">Limites</Label>
                                <Textarea id={"bonds"} placeholder="Limites" value={bonds} onChange={(e) => setBonds(e.target.value)} className="rounded-xl h-full resize-none bg-card border-ring" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full h-full">
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"flaws"} className="text-foreground">Défauts</Label>
                                <Textarea id={"flaws"} placeholder="Idéal" value={flaws} onChange={(e) => setFlaws(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                            </div>
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"alliesAndOrgs"} className="text-foreground">Alliés et orgs</Label>
                                <Textarea id={"alliesAndOrgs"} placeholder="Alliés et orgs" value={alliesAndOrgs} onChange={(e) => setAlliesAndOrgs(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                            </div>
                            <div className="flex flex-col w-full gap-1.5 h-1/3">
                                <Label htmlFor={"backstory"} className="text-foreground">Histoire</Label>
                                <Textarea id={"backstory"} placeholder="Histoire" value={backstory} onChange={(e) => setBackstory(e.target.value)} className="h-full rounded-xl resize-none bg-card border-ring" />
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="bg-card p-4 flex flex-row gap-2 bg-background h-1/3">
                        <div className="flex flex-col gap-2 w-1/4 justify-center">
                            <Champs color="card" label="Pièce de cuivre" value={cp} id={"cp"} type={"number"} placeholder={"Pièce de cuivre"} setValue={setCp} />
                            <Champs color="card" label="Pièce d'argent" value={sp} id={"sp"} type={"number"} placeholder={"Pièce d'argent"} setValue={setSp} />
                            <Champs color="card" label="Pièce d'electrum" value={ep} id={"ep"} type={"number"} placeholder={"Pièce d'electrum"} setValue={setEp} />
                            <Champs color="card" id={"gp"} type={"text"} label={"Pièce d'or"} placeholder={"Pièce d'or"} value={gp} setValue={setGp}></Champs>
                            <Champs color="card" id={"pp"} type={"text"} label={"Pièce de platine"} placeholder={"Pièce de platine"} value={pp} setValue={setPp}></Champs>
                        </div>
                        <div className="flex flex-col gap-2 w-3/4">
                            <Label htmlFor={"notes"} className="text-foreground">Notes</Label>
                            <Textarea id={"notes"} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl w-full h-full resize-none bg-card border-ring" />
                        </div>
                    </Card>
                </div>
            </div>
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
}
export function Champs({ id, type, label, placeholder, value, setValue, color = "background", onChange, isActive = true }: IChampsProps) {

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
        <div className="flex flex-row items-center">
            <Label htmlFor={id} className="text-foreground flex flex-row gap-1 items-center"><span className="font-bold w-auto">{label}:</span>
                <Input id={id} type={type} value={value ?? ""} onChange={handleChange} placeholder={placeholder} className={`${type === 'number' ? 'w-10' : 'w-[10vh]'} p-0 h-7 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0` } readOnly={!isActive} />
            </Label>
        </div>
    );

}