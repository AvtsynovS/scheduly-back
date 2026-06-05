import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuid } from 'uuid';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  create(createCategoryDto: CreateCategoryDto) {
    const category: Category = {
      id: uuid(),
      ...createCategoryDto,
    };

    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const category = this.categories.find((category) => category.id === id);

    // ! Вынести обработку ошибок
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categories.find((category) => category.id === id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);

    return category;
  }

  remove(id: string) {
    const category = this.categories.find((category) => category.id === id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    this.categories = this.categories.filter((category) => category.id !== id);
  }
}
