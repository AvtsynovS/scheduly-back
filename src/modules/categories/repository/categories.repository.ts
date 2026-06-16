import { PrismaService } from '@prisma/service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Injectable } from '@nestjs/common';
import { PrismaErrorMapper } from '@common';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (e) {
      throw this.mapError(e);
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.category.findUnique({
        where: { id },
      });
    } catch (e) {
      throw this.mapError(e);
    }
  }

  async create(data: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({ data });
    } catch (e) {
      throw this.mapError(e);
    }
  }

  async update(id: string, data: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (e) {
      throw this.mapError(e);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (e) {
      throw this.mapError(e);
    }
  }

  private mapError(error: unknown) {
    return PrismaErrorMapper.map(error);
  }
}
