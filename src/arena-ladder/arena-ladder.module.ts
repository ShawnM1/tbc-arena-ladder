import { HttpModule, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ArenaLadderController } from "./arena-ladder.controller";
import { ArenaLadderService } from "./arena-ladder.service";

@Module({
    imports: [AuthModule, HttpModule],
    controllers:[ArenaLadderController],
    providers:[ArenaLadderService]
})
export class ArenaLadderModule {}