import { CacheModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { TokenProviderService } from 'src/auth/token-provider.service';
import { ArenaLadderQuery, Bracket } from './arena-ladder.dto';
import { ArenaLadderService } from './arena-ladder.service';
import { PlayableClassType, PlayableRaceType } from './model/character.interface';
import { FactionType } from './model/team-entry.interface';

describe('ArenaLadderService', () => {
    let arenaLadderService: ArenaLadderService

    const tokenProviderMock = {
        getToken: jest.fn().mockResolvedValue('token!'),
    };
    const httpServiceMock = {
        get: jest.fn().mockImplementation(()=>of({ data: '' }))
    }

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [CacheModule.register()],
            providers: [
                { provide: HttpService, useValue: httpServiceMock},
                { provide: TokenProviderService, useValue: tokenProviderMock }, 
                ArenaLadderService
            ],
        }).compile();

        arenaLadderService = testingModule.get(ArenaLadderService)
    });
    
    it ('should call the TokenProviderService to get the token', async () => {
        const arenaQueryParam: ArenaLadderQuery = {
            season: 1,
            bracket: Bracket.THREES,
            region: 1,
            playableClass: PlayableClassType.DRUID,
            playableRace: PlayableRaceType.NIGHT_ELF,
            realm: '',
            faction: FactionType.ALLIANCE
        };
        const result = await arenaLadderService.getBracket(arenaQueryParam);
        expect(tokenProviderMock.getToken).toHaveBeenCalled();
        expect(httpServiceMock.get).toHaveBeenCalled();
    })
})
