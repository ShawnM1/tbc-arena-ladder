import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenProviderService } from 'src/auth/token-provider.service';
import { ArenaLadderController } from './arena-ladder.controller';
import { ArenaLadderService } from './arena-ladder.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [AuthModule],
            useFactory: async (tokenProviderService: TokenProviderService) => ({
                headers: {
                    Authorization: 'Bearer ' + await tokenProviderService.getToken(),
                },
            }),
            inject: [TokenProviderService],
        }),
        CacheModule.register(),
    ],
    controllers: [ArenaLadderController],
    providers: [ArenaLadderService],
})
export class ArenaLadderModule {}
