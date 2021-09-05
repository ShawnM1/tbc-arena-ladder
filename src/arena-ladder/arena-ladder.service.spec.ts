import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { TokenProviderService } from 'src/auth/token-provider.service';
import { ArenaLadderService } from './arena-ladder.service';

describe('ArenaLadderService', () => {
    let arenaLadderService: ArenaLadderService

    const tokenProviderMock = {
        getToken: jest.fn().mockResolvedValue('token!'),
    };
    const httpServiceMock = {
        get: jest.fn().mockResolvedValue(of({ data: '' }))
    }

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            providers: [
                { provide: HttpService, useValue: httpServiceMock},
                { provide: TokenProviderService, useValue: tokenProviderMock }, 
                ArenaLadderService
            ],
        }).compile();

        arenaLadderService = testingModule.get(ArenaLadderService)
    });
    
    it ('should call the TokenProviderService to get the token', async () => {
        const result = await arenaLadderService.getBracket('', '', '')
        expect(tokenProviderMock.getToken).toHaveBeenCalled()
        expect(httpServiceMock.get).toHaveBeenCalled()
    })
})
