/* eslint-disable @typescript-eslint/camelcase */
import { ArenaLadderQuery } from '../arena-ladder.dto';
import { PlayableClassType } from './character.interface';
import { FactionType, TeamEntry } from './team-entry.interface';

export class ArenaLadder {
    entries: TeamEntry[];
    name: string;
    season: Season;
    bracket: Bracket;

    constructor(ladder: ArenaLadder, arenaLadderQuery?: ArenaLadderQuery) {
        Object.assign(this, ladder);
        if (arenaLadderQuery) {
            this.filter(arenaLadderQuery)
        }
    }

    private filter(arenaLadderQuery: ArenaLadderQuery) {
        this.entries = this.filterByRealmName(arenaLadderQuery.realm)
        this.entries = this.filterByFaction(arenaLadderQuery.faction)
        this.entries = this.filterByPlayableClass(arenaLadderQuery.playableClasses)
    }

    private filterByPlayableClass(playableClassTypes: PlayableClassType[]): TeamEntry[] {
        return playableClassTypes ? this.entries.filter(entry => {
            const memberClasses = entry?.team?.members?.map(m => m.character.playable_class.id)
            return playableClassTypes.every(val => memberClasses?.includes(val))
        }) : this.entries
    }

    private filterByRealmName(realmName: string) {
        return realmName ? this.entries.filter(entry => entry.team.realm.slug === realmName) : this.entries
    }

    private filterByFaction(factionType: FactionType) {
        return factionType ? this.entries.filter(entry => entry.faction.type === factionType) : this.entries
    }
}

export interface Season {
    id: number;
}

export interface Bracket {
    id: string;
}
export enum BracketType {
    ARENA_2v2 = 'ARENA_3V3',
    ARENA_3v3 = 'ARENA_3V3',
    ARENA_5v5 = 'ARENA_3V3',
}
