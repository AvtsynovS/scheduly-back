import { Injectable } from '@nestjs/common';
import { DatabaseConstraintError, DatabaseOperationError } from '@common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './repository/categories.repository';
import { CategoryNotFoundError } from './errors/category-not-found.error';
import { CategoryAlreadyExistsError } from './errors/category-already-exists.error';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}

  private mapInfrastructureError(e: unknown): never {
    if (e instanceof DatabaseOperationError) {
      throw new CategoryNotFoundError();
    }

    if (e instanceof DatabaseConstraintError) {
      throw new CategoryAlreadyExistsError();
    }

    throw e;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.repo.create(createCategoryDto);
    } catch (e) {
      this.mapInfrastructureError(e);
    }
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const category = await this.repo.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.repo.update(id, updateCategoryDto);
    } catch (e) {
      this.mapInfrastructureError(e);
    }
  }
  async remove(id: string) {
    try {
      return this.repo.delete(id);
    } catch (e) {
      this.mapInfrastructureError(e);
    }
  }
}
