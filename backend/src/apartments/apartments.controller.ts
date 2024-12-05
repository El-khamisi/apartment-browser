import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateOneBodyDto, FindOneParamDto, ListQueryDto } from './dtos';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApartmentEntity, ApartmentsEntity } from './entities';

@Controller('apartments')
export class ApartmentsController {
    constructor(private apartmentsService: ApartmentsService) {}

    @Post()
    @ApiOkResponse({ type: ApartmentEntity })
    createOne(@Body() body: CreateOneBodyDto) {
        return this.apartmentsService.createOne(body);
    }

    @Get(':id')
    @ApiOkResponse({ type: ApartmentEntity })
    findOne(@Param() params: FindOneParamDto) {
        return this.apartmentsService.findOne(params.id);
    }

    @Get()
    @ApiOkResponse({ type: ApartmentsEntity })
    indexList(@Query() query: ListQueryDto) {
        return this.apartmentsService.indexList(query);
    }
}
