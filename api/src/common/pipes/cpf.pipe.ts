import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CpfPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const cpf = (value ?? '').replace(/\D/g, '');

    if (cpf.length !== 11) {
      throw new BadRequestException('CPF inválido');
    }

    return cpf;
  }
}
