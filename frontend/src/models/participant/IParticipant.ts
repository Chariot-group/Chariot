import ICharacter from "../characters/ICharacter";

export interface IParticipant {
  character: ICharacter;
  groupLabel: string;
  initiative: number | undefined;
}
