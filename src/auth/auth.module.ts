import { HttpModule, Module } from "@nestjs/common";
import { TokenProviderService } from "./token-provider.service";

@Module({
    imports:[HttpModule],
    providers:[TokenProviderService],
    exports:[TokenProviderService]
})
export class AuthModule {}