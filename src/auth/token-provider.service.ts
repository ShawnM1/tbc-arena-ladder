import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';

const URL = 'https://us.battle.net/oauth/token?grant_type=client_credentials';

@Injectable()
export class TokenProviderService {
    private token = null
    private isExpired = true;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getToken(): Promise<string> {
        if (this.isExpired) {
            console.log('GETTING TOKEN')
            const tokenToEncode = `${this.configService.get('BLIZZARD_CLIENT_ID',)}:${this.configService.get('BLIZZARD_CLIENT_SECRET')}`
            const token = Buffer.from(tokenToEncode).toString('base64');
            this.token = await this.httpService.post(URL, null, {
                headers: {
                    Authorization: 'Basic ' + token,
                },
            }).pipe(
                catchError(err => {
                    console.log(err);
                    throw new InternalServerErrorException(err); 
                }),
                map(response =>  response.data)
            ).toPromise()
            this.setExpiration(this.token.expires_in)
        }
        console.log(`Token ${this.token}`)
        return this.token.access_token;
    }

    private setExpiration(expiresIn: number) {
        this.isExpired = false
        setTimeout(() => {
            this.isExpired = true
        }, expiresIn * 1000)
    }
}
