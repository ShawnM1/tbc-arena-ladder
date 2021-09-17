import { SeasonMatchStatistics } from "./season-match-statistics.interface";
import { Team } from "./team.interface";

export interface TeamEntry {
    faction: Faction
    rank: number
    season_match_statistics: SeasonMatchStatistics
    team: Team
}

export interface Faction {
    type: FactionType
}

export enum FactionType {
    HORDE = 'HORDE', ALLIANCE = 'ALLIANCE'
}