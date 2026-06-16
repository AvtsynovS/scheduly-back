export class SuccessResponseDto<T = unknown> {
  success!: true;
  data!: T;
}
