import { Observable } from "rxjs/internal/Observable";

export interface ConfigOptions {
  configFilePath: string;
  addTimeParameterToConfigFilePath?: boolean;
}

/**
 * Config service
 */
export abstract class ConfigService {
  /**
   * Config loaded of config service
   * An `Observable` that emit whenever config loaded.
   */
  readonly configLoaded: Observable<any>;
  abstract init(): Promise<any>;
  /**
   * Gets config
   * T Return type of config value.
   * @param key  Config key;
   * @returns config value
   */
  abstract getConfig<T>(key: string): T;

  /**
   * Gets all config keys
   * @returns all keys
   */
  abstract getAllKeys(): string[];
}
