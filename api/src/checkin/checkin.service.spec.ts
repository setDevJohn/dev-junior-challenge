import { ConflictException, NotFoundException } from '@nestjs/common';
import type { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { CheckinService } from './checkin.service';
import type { PrismaService } from '../prisma/prisma.service';

describe('CheckinService', () => {
  let service: CheckinService;
  let prisma: {
    checkIn: {
      findFirst: jest.Mock;
      create: jest.Mock;
    };
  };
  let http: { get: jest.Mock };

  beforeEach(() => {
    prisma = {
      checkIn: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
      },
    };
    http = { get: jest.fn() };

    service = new CheckinService(
      prisma as unknown as PrismaService,
      http as unknown as HttpService,
    );
  });

  it('cria o check-in com o nome vindo do mock-service', async () => {
    http.get.mockReturnValue(of({ data: { nome: 'Ana Souza' } }));
    prisma.checkIn.create.mockResolvedValue({
      id: '1',
      cpf: '11111111111',
      nome: 'Ana Souza',
    });

    const resultado = await service.criar('11111111111');

    expect(resultado.nome).toBe('Ana Souza');
    expect(prisma.checkIn.create).toHaveBeenCalledWith({
      data: { cpf: '11111111111', nome: 'Ana Souza' },
    });
  });

  it('lança 404 quando o CPF não existe no mock-service', async () => {
    http.get.mockReturnValue(
      throwError(() => ({ isAxiosError: true, response: { status: 404 } })),
    );

    await expect(service.criar('99999999999')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('lança 409 quando o paciente já fez check-in hoje', async () => {
    prisma.checkIn.findFirst.mockResolvedValue({ id: 'existente' });

    await expect(service.criar('11111111111')).rejects.toThrow(
      ConflictException,
    );
  });
});
