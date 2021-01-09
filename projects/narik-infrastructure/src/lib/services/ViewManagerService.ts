import { View } from '../interfaces/meta-data.model';

/**
 * View manager service
 */
export abstract class ViewManagerService {
    /**
     * Gets view info
     * @param moduleKey
     * @param viewKey
     * @returns view info
     */
    abstract getViewInfo(moduleKey: string, viewKey: string): View;
}
