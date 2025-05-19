import IPlayer from "@/models/player/IPlayer";
import Resistances from "./sections/Resistances";
import Immunities from "./sections/Immunities";
import Vulnerabilities from "./sections/Vulnerabilities";
import Abilities from "./sections/Abilities";
import ICharacter from "@/models/characters/ICharacter";

interface Props {
    character: ICharacter;
    isUpdate: boolean;
    updateCharacter: (character: ICharacter) => void;
}  
export default function Plus({ character, isUpdate, updateCharacter }: Props) {
    return (
        <div className="flex flex-row gap-3 h-full h-[90%] overflow-auto">
            <div className="flex flex-col gap-3 w-1/6 h-full">
                <Resistances isUpdate={isUpdate} updateCharacter={updateCharacter} character={character} />
                <Immunities isUpdate={isUpdate} updateCharacter={updateCharacter} character={character} />
                <Vulnerabilities isUpdate={isUpdate} updateCharacter={updateCharacter} character={character} />
            </div>
            <div className="flex flex-col border border-ring h-full">
            </div>
            <div className="flex flex-col gap-3 w-5/6 h-full">
                <Abilities isUpdate={isUpdate} updateCharacter={updateCharacter} character={character} />
            </div>
        </div>
    )

}