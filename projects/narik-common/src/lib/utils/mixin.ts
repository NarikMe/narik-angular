export function Mixin<T>(
    superclass: MixinFunction,
    ...mixins: Array<new (...args: any[]) => any>
): new (...args: any[]) => T {
    return __extends(superclass, mixins) as any;
}

function __extends(superclass: MixinFunction, mixins): MixinFunction {
    const mixedClass = class extends superclass {
        constructor(args) {
            super(args);
            const that = this;
            for (const mixinItem of mixins) {
                const mixinObject = new mixinItem(args);
                Object.assign(that, mixinObject);
            }
        }
    };

    for (const mixinItem of mixins) {
        const entryItems = entries(mixinItem.prototype);

        entryItems
            .filter((info) => {
                return info.key !== 'constructor';
            })
            .forEach((info) => {
                Object.defineProperty(
                    superclass.prototype,
                    info.key,
                    info.propInfo
                );
            });

        for (const p in mixinItem) {
            if (mixinItem.hasOwnProperty(p) && p !== 'propDecorators') {
                superclass[p] = mixinItem[p];
            }
        }

        if (mixinItem['propDecorators']) {
            if (!superclass['propDecorators']) {
                superclass['propDecorators'] = {};
            }
            for (const p in mixinItem['propDecorators']) {
                if (mixinItem['propDecorators'].hasOwnProperty(p)) {
                    superclass['propDecorators'][p] =
                        mixinItem['propDecorators'][p];
                }
            }
        }
    }
    return mixedClass;
}
type MixinFunction = new (...args: any[]) => any;

function entries(object) {
    return Object.getOwnPropertyNames(object).map((key) => {
        return {
            key,
            propInfo: Object.getOwnPropertyDescriptor(object, key),
        };
    });
}
