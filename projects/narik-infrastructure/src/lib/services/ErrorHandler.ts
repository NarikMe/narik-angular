/**
 * Error handler
 */
export abstract class ErrorHandler {
    readonly key: string;
    readonly order: number;
    abstract HandleError(data: any): boolean;
}
