declare global {
    interface Array<T> {
        /**
         * convert an array of objects to a mao
         * @param keyfiled keyfiled
         * @param [valuefield] valuefield
         * @returns map mao
         */
        toMap(keyfiled: string, valuefield?: string): Map<any, T>;
    }
}
Array.prototype.toMap = function (
    keyfiled: string,
    valuefield?: string
): Map<any, any> {
    return this.reduce(function (map: Map<any, any>, obj) {
        map.set(obj[keyfiled], valuefield ? obj[valuefield] : obj);
        return map;
    }, new Map<any, any>());
};

export {};
