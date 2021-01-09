export interface ServerResponse<T> {
    data?: T;
    errors?: string[];
    isSucceed?: boolean;
    count?: number;
}
