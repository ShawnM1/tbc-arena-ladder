import {
    CACHE_MANAGER,
    HttpService,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';
import { Cache } from 'cache-manager';

const URL = 'https://us.battle.net/oauth/token?grant_type=client_credentials';

@Injectable()
export class TokenProviderService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getToken(): Promise<string> {
        const cachedToken = await this.cacheManager.get<string>('accessToken')
        if (cachedToken) {
            console.log('token cached')
            return cachedToken
        }
        console.log('GETTING TOKEN');
        const tokenToEncode = `${this.configService.get( 'BLIZZARD_CLIENT_ID',)}:${this.configService.get('BLIZZARD_CLIENT_SECRET')}`;
        const token = Buffer.from(tokenToEncode).toString('base64');
        const data = await this.httpService
            .post(URL, null, {
                headers: {
                    Authorization: 'Basic ' + token,
                },
            })
            .pipe(
                catchError(err => {
                    console.log(err);
                    throw new InternalServerErrorException(err);
                }),
                map(response => response.data),
            ).toPromise();
        await this.cacheManager.set('accessToken', data.access_token, { ttl: data.expires_in })    
        return data.access_token   
    }
}
