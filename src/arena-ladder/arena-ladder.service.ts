import { CACHE_MANAGER, HttpService, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenProviderService } from '../auth/token-provider.service';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { ArenaLadder } from './model/arena-ladder.model';
import { ArenaLadderQuery } from './arena-ladder.dto';

const BASE_URL = 'https://us.api.blizzard.com/data/wow/';

@Injectable()
export class ArenaLadderService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private httpService: HttpService
    ) {}

    private async getBracketRestCall(arenaQueryParams: ArenaLadderQuery): Promise<any>{
        const cacheKey = JSON.stringify({region: arenaQueryParams.region, season: arenaQueryParams.season, bracket: arenaQueryParams.bracket})
        const cacheData = await this.cacheManager.get<ArenaLadder>(cacheKey)
        if (cacheData) {
            return cacheData
        }

        const url = BASE_URL + `pvp-region/${arenaQueryParams.region}/pvp-season/${arenaQueryParams.season}/pvp-leaderboard/${arenaQueryParams.bracket}?namespace=dynamic-classic-us&region=us`;
        const bracketData = await this.httpService.get(url).pipe(
            catchError(err => {
                console.log(err)
                throw new InternalServerErrorException(err)
            }),
            map(response => response.data)
        ).toPromise()

        await this.cacheManager.set(cacheKey, bracketData, { ttl: 3600 })
        return bracketData
    }

    public async getBracket(arenaQueryParams: ArenaLadderQuery) {
        const ladder  = await this.getBracketRestCall(arenaQueryParams)
        return new ArenaLadder(ladder, arenaQueryParams)
    }
}
