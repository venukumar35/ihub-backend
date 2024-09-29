import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly services: CountryRepository) {}
 async findAll() {
    return await this.services.findAll();
  }

 async findStateBycountryId(id: number) {
    return await this.services.findStateBycountryId(id);
  }
 async findAllTransType(){
  return await this.services.findAllTransType()
  }
}
