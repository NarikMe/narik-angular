import { ModuleInfo, ModuleEventArg } from '../interfaces/narik-module';
import { Observable } from 'rxjs';

/**
 * Module manager
 */
export abstract class ModuleManager {
    /**
     * Narik loaded of module manager
     */
    abstract get narikLoaded(): Observable<any>;

    /**
     * Modules changed of module manager
     */
    readonly modulesChanged: Observable<ModuleEventArg>;

    /**
     * Modules  of module manager
     */
    readonly modules: Map<string, ModuleInfo>;

    /**
     * Adds or update module
     * @param key
     * @param [moduleInfo]
     */
    abstract addOrUpdateModule(key: string, moduleInfo?: ModuleInfo);

    /**
     * Removes module
     * @param key
     */
    abstract removeModule(key: string);

    /**
     * Inits module manager
     * @returns init
     */
    abstract init(): Promise<any>;
}
