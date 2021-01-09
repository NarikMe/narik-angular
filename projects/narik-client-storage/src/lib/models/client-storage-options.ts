import { DriverType } from 'ngforage';

export interface ClientStorageOptions {
    validitylen?: number;
    dbName?: string;
    driverTypes?: DriverType[];
}
