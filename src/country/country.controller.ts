import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get('/trans')
  findAllTransType() {
    return this.countryService.findAllTransType();
  }

  @Get('/get')
  findStateBycountryId(@Query('id', ParseIntPipe) id: number) {
    return this.countryService.findStateBycountryId(id);
  }
}
