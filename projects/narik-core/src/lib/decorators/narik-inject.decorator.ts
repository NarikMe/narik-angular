import { Type, InjectionToken, InjectFlags, Injector } from '@angular/core';
import { AppInjector } from '../util/app-injector';

export function NarikInject<T>(
    token: Type<T> | InjectionToken<T> | any,
    notFoundValue: T = null,
    flags?: InjectFlags
) {
    return function (target: any, key: string) {
        const prev = Object.getOwnPropertyDescriptor(target, key);
        const getter = function () {
            if (this['$$$Inject_' + token.toString()]) {
                return this['$$$Inject_' + token.toString()];
            }
            let localInjector = this.injector || this['$$$_Injector'];
            if (!localInjector) {
                for (const filedKey in this) {
                    if (this.hasOwnProperty(filedKey)) {
                        if (
                            this[filedKey] instanceof Injector ||
                            (this[filedKey] &&
                                this[filedKey].constructor.name === 'Injector_')
                        ) {
                            localInjector = this[filedKey];
                            this['$$$_Injector'] = localInjector;
                        }
                    }
                }
            }
            if (!localInjector) {
                console.warn(
                    'Could not find local Injector in  (' +
                        target.constructor.name +
                        '), use root injector instead!'
                );
            } else {
                if (
                    localInjector.constructor.name === 'StaticInjector' &&
                    localInjector.parent
                ) {
                    localInjector = localInjector.parent;
                }
            }
            const value = (localInjector || AppInjector.injector).get(
                token,
                notFoundValue,
                flags
            );
            this['$$$' + token.toString()] = value;
            return value;
        };
        Object.defineProperty(target, key, {
            get: getter,
            enumerable: prev == null ? true : prev.enumerable,
            configurable: prev == null ? true : prev.configurable,
        });
    };
}

export function NarikGlobalInject<T>(
    token: Type<T> | InjectionToken<T> | any,
    notFoundValue: T = null,
    flags?: InjectFlags
) {
    return function (target: any, key: string) {
        const prev = Object.getOwnPropertyDescriptor(target, key);
        const getter = function () {
            if (this['$$$Inject_' + token.toString()]) {
                return this['$$$Inject_' + token.toString()];
            }
            const localInjectors: any[] = this.injectors;

            if (!localInjectors) {
                console.warn(
                    'Could not find local Injectors in  (' +
                        target.constructor.name +
                        ')!'
                );
            } else {
                for (let i = localInjectors.length - 1; i >= 0; --i) {
                    const injector = localInjectors[i];
                    const value = injector.get(token, notFoundValue, flags);
                    this['$$$' + token.toString()] = value;
                    return value;
                }
                return undefined;
            }
        };
        Object.defineProperty(target, key, {
            get: getter,
            enumerable: prev == null ? true : prev.enumerable,
            configurable: prev == null ? true : prev.configurable,
        });
    };
}
