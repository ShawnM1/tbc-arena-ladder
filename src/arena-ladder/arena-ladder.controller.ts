import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ArenaLadderQuery } from './arena-ladder.dto';
import { ArenaLadderService } from './arena-ladder.service';

@Controller()
export class ArenaLadderController {
    constructor(private arenaLadderService: ArenaLadderService) {}

    @Get('leaderboard')
    async getBracket(@Query(new ValidationPipe({ transform: true })) queryParams: ArenaLadderQuery ) {
        return this.arenaLadderService.getBracket(
            queryParams
        );
    }
}
