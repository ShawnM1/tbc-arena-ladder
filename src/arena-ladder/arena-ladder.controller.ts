import { Controller, Get, Query } from '@nestjs/common';
import { ArenaLadderService } from './arena-ladder.service';

@Controller()
export class ArenaLadderController {

    constructor(private arenaLadderService: ArenaLadderService) {}

    @Get('ladder')
    async getBracket(
        @Query('bracket') bracket,
        @Query('region') region,
        @Query('season') season,
    ) {
        return this.arenaLadderService.getBracket(bracket, region, season);
    }
}
