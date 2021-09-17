import { Character } from "./character.interface"
import { SeasonMatchStatistics } from "./season-match-statistics.interface";

export interface Member {
    character: Character
    rating: number
    season_match_statistics: SeasonMatchStatistics
}
