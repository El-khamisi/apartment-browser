import { Controller, Post } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';

@Controller('apartments')
export class ApartmentsController {
    constructor(private apartmentsService: ApartmentsService) {}

    @Post()
    createOne() {}
}
