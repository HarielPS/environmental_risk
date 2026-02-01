import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';
import { OptimizerService } from 'src/optimizer/optimizer.service';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly optimizerService: OptimizerService,
  ) {}

  // CRUD Companies
  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.companiesService.remove(id);
  }

  // Obras
  @Post(':id/obras')
  addObra(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateObraDto,
  ) {
    return this.companiesService.addObra(id, dto);
  }

  @Get(':id/obras')
  listObras(@Param('id', ParseObjectIdPipe) id: string) {
    return this.companiesService.listObras(id);
  }

  @Get(':id/obras/:obraId')
  getObra(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('obraId') obraId: string,
  ) {
    return this.companiesService.getObra(id, obraId);
  }

  @Patch(':id/obras/:obraId')
  updateObra(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('obraId') obraId: string,
    @Body() dto: UpdateObraDto,
  ) {
    return this.companiesService.updateObra(id, obraId, dto);
  }

  @Delete(':id/obras/:obraId')
  removeObra(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('obraId') obraId: string,
  ) {
    return this.companiesService.removeObra(id, obraId);
  }

  @Post(':id/obras/:obraId/optimize')
  optimizeObra(@Param('id') id: string, @Param('obraId') obraId: string) {
    return this.companiesService.optimizeObra(id, obraId);
  }

  @Get('optimizer/health')
  optimizerHealth() {
    return this.optimizerService.health();
  }

  @Get(':id/obras/:obraId/nsga-input')
  async nsgaInput(@Param('id') id: string, @Param('obraId') obraId: string) {
    return this.companiesService.getNsgaInput(id, obraId);
  }

}
