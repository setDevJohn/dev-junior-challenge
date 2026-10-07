import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

const CADASTRO_URL = process.env.CADASTRO_URL ?? 'http://localhost:4000';

@Injectable()
export class CheckinService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async criar(cpf: string) {
    await this.garantirSemCheckinHoje(cpf);

    const nome = await this.buscarNomePaciente(cpf);

    return await this.prisma.checkIn.create({
      data: { cpf, nome },
    });
  }

  async listar() {
    return await this.prisma.checkIn.findMany({
      orderBy: { criadoEm: 'asc' },
    });
  }

  async limpar() {
    await this.prisma.checkIn.deleteMany();
  }

  private async garantirSemCheckinHoje(cpf: string) {
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);

    const checkinExistente = await this.prisma.checkIn.findFirst({
      where: { cpf, criadoEm: { gte: inicioDoDia } },
    });

    if (checkinExistente) {
      throw new ConflictException('Paciente já fez check-in hoje');
    }
  }

  private async buscarNomePaciente(cpf: string): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<{ nome: string }>(`${CADASTRO_URL}/pacientes/${cpf}`),
      );
      return data.nome;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException('Paciente não encontrado');
      }
      throw error;
    }
  }
}
