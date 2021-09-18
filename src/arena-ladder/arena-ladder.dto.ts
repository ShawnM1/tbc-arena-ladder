import { Transform, Type } from "class-transformer"
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PlayableClassType, PlayableRaceType } from "./model/character.interface"
import { FactionType } from "./model/team-entry.interface"

export enum Bracket {
    TWOS = '2v2',
    THREES = '3v3',
    FIVES = '5v5'
}

export class ArenaLadderQuery {
    @IsNotEmpty()
    @IsEnum(Bracket)
    bracket: Bracket

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    region: number

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    season: number

    @IsOptional()
    @Transform(({value}) => value.split(',').map(v => Number(v)))
    @IsEnum(PlayableClassType, { each: true })
    playableClasses: PlayableClassType[]

    @IsOptional()
    @IsEnum(FactionType)
    faction: FactionType

    @IsOptional()
    @IsString()
    realm: string
}