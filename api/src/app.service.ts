import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'ok',
      service: 'Check-in de Pacientes API',
      rotas: {
        checkin: {
          criar: 'POST /checkin',
          listar: 'GET /checkin',
          limpar: 'DELETE /checkin',
        },
      },
    };
  }
}
