export class ErrorResponseDto {
  success!: false;
  code!: string;
  status!: number;
  message!: string;
  timestamp!: string;
  requestId?: string;
}
