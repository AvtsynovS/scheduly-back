export interface ErrorResponse {
  success: false;
  code: string;
  message: string;
  requestId?: string;
  timestamp: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  fields: {
    field: string;
    constraints: Record<string, string>;
  }[];
}
