import { PrismaService } from '@prisma/service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Injectable } from '@nestjs/common';
import { PrismaErrorMapper } from '@common';
import { SearchCategoriesQueryDto } from '../dto/search-categories-query.dto';
import { Prisma } from '@prisma/client';
import { ListQueryDto } from '@common/dto';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ search, page, limit }: ListQueryDto) {
    try {
      const where: Prisma.CategoryWhereInput = {};

      if (search) {
        where.name = {
          contains: search,
          mode: 'insensitive',
        };
      }

      const [categories, total] = await this.prisma.$transaction([
        this.prisma.category.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            name: 'asc',
          },
        }),

        this.prisma.category.count({
          where,
        }),
      ]);

      return {
        data: categories,
        meta: {
          total,
          page,
          limit,
        },
      };
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
