import { CACHE_MANAGER, HttpService, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenProviderService } from '../auth/token-provider.service';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';

const BASE_URL = 'https://us.api.blizzard.com/data/wow/';

@Injectable()
export class ArenaLadderService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private httpService: HttpService,
        private tokenProviderService: TokenProviderService,
    ) {}

    public async getBracket(bracket: string, region: number, season: number) {
        const cacheKey = JSON.stringify({ bracket, region, season })
        const cacheData = await this.cacheManager.get(cacheKey)
        if (cacheData) {
            console.log('getting data from cache')
            return cacheData
        }
        
        console.log('Data not in Cache. Calling API')
        const url = BASE_URL + `pvp-region/${region}/pvp-season/${season}/pvp-leaderboard/${bracket}?namespace=dynamic-classic-us&region=us`;
        const bracketData = await this.httpService.get(url, {
            headers: {
                Authorization: 'Bearer ' + await this.tokenProviderService.getToken(),
            },
        }).pipe(
            catchError(err => {
                console.log(err)
                throw new InternalServerErrorException(err)
            }),
            map(response => response.data)
        ).toPromise()

        await this.cacheManager.set(cacheKey, bracketData, { ttl: 60})
        return bracketData
    }
}
