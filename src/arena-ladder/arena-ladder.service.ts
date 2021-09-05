import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenProviderService } from '../auth/token-provider.service';
import { map, catchError } from 'rxjs/operators';

const BASE_URL = 'https://us.api.blizzard.com/data/wow/';

@Injectable()
export class ArenaLadderService {
    constructor(
        private httpService: HttpService,
        private tokenProviderService: TokenProviderService,
    ) {}

    public async getBracket(bracket: string, region: number, season: number) {
        const url =
            BASE_URL +
            `pvp-region/${region}/pvp-season/${season}/pvp-leaderboard/${bracket}?namespace=dynamic-classic-us&region=us`;
        return this.httpService.get(url, {
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
    }
}
