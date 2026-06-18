import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from './pagination-query.dto';
import { SearchQueryDto } from './search-query.dto';

export class ListQueryDto extends IntersectionType(
  PaginationQueryDto,
  SearchQueryDto,
) {}
