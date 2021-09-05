import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator"

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
}