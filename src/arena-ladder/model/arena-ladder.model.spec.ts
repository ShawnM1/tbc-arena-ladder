import { ArenaLadderQuery } from "../arena-ladder.dto"
import { ArenaLadder } from "./arena-ladder.model"
import { PlayableClassType, PlayableRaceType } from "./character.interface"
import { FactionType } from "./team-entry.interface"


describe('ArenaLadderModel', () => {
    let arenaData: ArenaLadder
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        arenaData = new ArenaLadder(require('../arena-ladder.data.json'))
    })
    it('should create the model', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        expect(arenaData).not.toBeNull()
        expect(arenaData.entries).not.toBeNull()
    }) 

    it ('should filter by class', () => {
        arenaData = new ArenaLadder(require('../arena-ladder.data.json'), { playableClass: PlayableClassType.PALADIN} as ArenaLadderQuery)
        expect(arenaData.entries.length).toEqual(0)
    })

    it ('should filter by race', () => {
        arenaData = new ArenaLadder(require('../arena-ladder.data.json'), { playableRace: PlayableRaceType.HUMAN} as ArenaLadderQuery)
        expect(arenaData.entries.length).toEqual(3)
    })

    it ('should filter by realm name', () => {
        arenaData = new ArenaLadder(require('../arena-ladder.data.json'), { realm: 'whitemane'} as ArenaLadderQuery)
        expect(arenaData.entries.length).toEqual(1)
    })

    it ('should filter by faction', () => {
        arenaData = new ArenaLadder(require('../arena-ladder.data.json'), { faction: FactionType.ALLIANCE} as ArenaLadderQuery)
        expect(arenaData.entries.length).toEqual(0)
    })

})