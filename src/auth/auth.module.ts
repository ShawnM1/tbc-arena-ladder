import { CacheModule, HttpModule, Module } from "@nestjs/common";
import { TokenProviderService } from "./token-provider.service";

@Module({
    imports:[HttpModule, CacheModule.register()],
    providers:[TokenProviderService],
    exports:[TokenProviderService]
})
export class AuthModule {}