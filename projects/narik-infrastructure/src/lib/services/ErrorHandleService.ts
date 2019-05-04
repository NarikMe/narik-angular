
/**
 * Error handle service
 */
export abstract class ErrorHandleService {
  abstract HandleError(errorTypeKey: string, data: any): boolean;
}
