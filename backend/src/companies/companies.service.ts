import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { writeFileSync } from 'fs';

import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

import { OptimizerService } from '../optimizer/optimizer.service';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly optimizerService: OptimizerService,
  ) {}

  async create(dto: CreateCompanyDto) {
    const created = new this.companyModel(dto);
    return created.save();
  }

  async findAll() {
    return this.companyModel.find().exec();
  }

  async findOne(companyId: string) {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(companyId: string, dto: UpdateCompanyDto) {
    const updated = await this.companyModel
      .findByIdAndUpdate(companyId, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Company not found');
    return updated;
  }

  async remove(companyId: string) {
    const deleted = await this.companyModel.findByIdAndDelete(companyId).exec();
    if (!deleted) throw new NotFoundException('Company not found');
    return { deleted: true };
  }

  // =========================
  // OBRAS
  // =========================

  async addObra(companyId: string, dto: CreateObraDto) {
    const res = await this.companyModel
      .findByIdAndUpdate(companyId, { $push: { obras: dto } }, { new: true })
      .exec();

    if (!res) throw new NotFoundException('Company not found');
    return res;
  }

  async listObras(companyId: string) {
    const company = await this.findOne(companyId);
    return company.obras ?? [];
  }

  async getObra(companyId: string, obraId: string) {
    const company = await this.findOne(companyId);
    const obra = company.obras?.find((o: any) => o.obra_id === obraId);
    if (!obra) throw new NotFoundException('Obra not found');
    return obra;
  }

  async updateObra(companyId: string, obraId: string, dto: UpdateObraDto) {
    const company = await this.findOne(companyId);
    const idx = company.obras.findIndex((o: any) => o.obra_id === obraId);
    if (idx === -1) throw new NotFoundException('Obra not found');

    company.obras[idx] = { ...(company.obras[idx] as any), ...dto } as any;
    await company.save();

    return company.obras[idx];
  }

  async removeObra(companyId: string, obraId: string) {
    const res = await this.companyModel
      .findByIdAndUpdate(
        companyId,
        { $pull: { obras: { obra_id: obraId } } },
        { new: true },
      )
      .exec();

    if (!res) throw new NotFoundException('Company not found');
    return { deleted: true };
  }

  // =========================
  // OPTIMIZE (manda JSON al microservicio)
  // =========================

  async optimizeObra(companyId: string, obraId: string) {
    const company = await this.companyModel.findById(companyId).exec();
    if (!company) throw new NotFoundException('Company not found');

    const obra = company.obras?.find((o: any) => o.obra_id === obraId);
    if (!obra) throw new NotFoundException('Obra not found');

    const problem = this.buildProblemFromObra(obra);

    // ✅ snapshot para debug en docker
    try {
      writeFileSync(
        '/tmp/nsga_request.json',
        JSON.stringify(problem, null, 2),
        'utf-8',
      );
      this.logger.log(
        `NSGA payload saved to /tmp/nsga_request.json (reqs=${problem?.requirements?.length ?? 0})`,
      );
    } catch (e: any) {
      this.logger.warn(`Could not write /tmp/nsga_request.json: ${e?.message}`);
    }

    // ✅ llamado a microservicio
    const result = await this.optimizerService.optimize(problem);

    return {
      companyId,
      obraId,
      problem_preview: {
        n_materiales: problem?.requirements?.length ?? 0,
        options_groups: problem?.optionsByRequirement?.length ?? 0,
      },
      result,
    };
  }

  private buildProblemFromObra(obra: any) {
    const requirements = (obra.materiales ?? []).map((m: any, idx: number) => ({
      req_id: `R-${String(idx + 1).padStart(3, '0')}`,
      material_nombre: m.material_nombre,
      categoria: m.categoria,
      unidad: m.unidad,
      cantidad: m.cantidad,
    }));

    const optionsByRequirement = requirements.map((r: any, idx: number) => {
      const prov = mProveedorFallback(obra, idx);
      const mat = obra.materiales?.[idx];

      return {
        req_id: r.req_id,
        options: [
          {
            option_id: `O-${String(idx + 1).padStart(4, '0')}`,
            provedoor_id: prov?.provedoor_id ?? 'UNKNOWN',
            nombre_provedor: prov?.nombre_provedor ?? 'UNKNOWN',
            offer: {
              costo_unitario_mxn: mat?.costo_unitario_mxn ?? 0,
              factor_emision_kgco2e_por_unidad: mat?.factor_emision_kgco2e_por_unidad ?? 0,
              unidad: mat?.unidad ?? r.unidad,
              co2_verified: Boolean(mat?.co2?.verified),
            },
            supplier: {
              latitud: mat?.latitud ?? null,
              longitud: mat?.longitud ?? null,
              delivery: mat?.delivery ?? null,
              rating: mat?.rating ?? null,
            },
          },
        ],
      };
    });

    return {
      site: obra.ubicacion?.coordenadas ?? null,
      requirements,
      optionsByRequirement,
      objectives: { minimize: ['total_cost_mxn', 'total_co2e_kg'] },
    };

    function mProveedorFallback(obra: any, idx: number) {
      const m = obra.materiales?.[idx];
      return m
        ? {
            provedoor_id: m.provedoor_id ?? m.proveedor_id,
            nombre_provedor: m.nombre_provedor ?? m.nombre_proveedor,
          }
        : null;
    }
  }

  async getNsgaInput(companyId: string, obraId: string) {
  const company = await this.companyModel.findById(companyId).exec();
  if (!company) throw new NotFoundException('Company not found');

  const obra = company.obras?.find((o: any) => o.obra_id === obraId);
  if (!obra) throw new NotFoundException('Obra not found');

  return this.buildProblemFromObra(obra);
}

}
