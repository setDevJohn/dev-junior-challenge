import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CpfPipe } from '../common/pipes/cpf.pipe';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post()
  criar(@Body('cpf', CpfPipe) cpf: string) {
    return this.checkinService.criar(cpf);
  }

  @Get()
  listar() {
    return this.checkinService.listar();
  }

  @Delete()
  limpar() {
    return this.checkinService.limpar();
  }
}
