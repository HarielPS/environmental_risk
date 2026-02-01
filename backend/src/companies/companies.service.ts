import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
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
      .findByIdAndUpdate(
        companyId,
        { $push: { obras: dto } },
        { new: true },
      )
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
    const obra = company.obras?.find((o) => o.obra_id === obraId);
    if (!obra) throw new NotFoundException('Obra not found');
    return obra;
  }

  async updateObra(companyId: string, obraId: string, dto: UpdateObraDto) {
    const company = await this.findOne(companyId);
    const idx = company.obras.findIndex((o) => o.obra_id === obraId);
    if (idx === -1) throw new NotFoundException('Obra not found');

    company.obras[idx] = { ...company.obras[idx], ...dto } as any;
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
}
