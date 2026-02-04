import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OptimizerService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('OPTIMIZER_URL') ?? 'http://tec_optimizer:8000';
  }

  async health() {
    try {
      const res = await firstValueFrom(this.http.get(`${this.baseUrl}/health`));
      return res.data;
    } catch (e: any) {
      throw new InternalServerErrorException({
        message: 'Optimizer service is not reachable',
        detail: e?.message,
      });
    }
  }

  async optimize(problem: any) {
    try {
      const res = await firstValueFrom(this.http.post(`${this.baseUrl}/optimize`, problem));
      return res.data;
    } catch (e: any) {
      throw new InternalServerErrorException({
        message: 'Optimizer service error',
        detail: e?.response?.data ?? e?.message,
      });
    }
  }
}
