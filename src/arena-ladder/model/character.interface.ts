import { Realm } from "./realm.interface";

export interface Character {
    name: string
    id: number
    realm: Realm
    playable_class: PlayableClass
    playable_race: PlayableRace

}

export interface PlayableRace {
    id: PlayableRaceType
}

export interface PlayableClass {
    id: PlayableClassType
}

export enum PlayableClassType {
    WARRIOR = 1,
    PALADIN = 2,
    HUNTER = 3,
    ROGUE = 4,
    PRIEST = 5,
    SHAMAN = 7,
    MAGE = 8,
    WARLOCK = 9,
    DRUID = 11
}

export enum PlayableRaceType {
    HUMAN = 1,
    ORC = 2,
    DWARF = 3,
    NIGHT_ELF = 4,
    UNDEAD = 5,
    TAUREN = 6,
    GNOME = 7,
    TROLL = 8,
    BLOOD_ELF = 10,
    DRAENEI = 11
}