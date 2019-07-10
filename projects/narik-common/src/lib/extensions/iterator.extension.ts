declare global {
  interface Map<K, V> {
    /**
     * @returns values as an array
     */
    valuesArray(): Array<V>;

    /**
     * @returns keys as an array
     */
    keysArray(): Array<K>;

    /**
     *
     * @returns entries as an array
     */
    entriesArray(): Array<{ key: K; value: V }>;
  }
}
Map.prototype.valuesArray = function(): Array<any> {
  return [...this.values()];
};
Map.prototype.keysArray = function(): Array<any> {
  return [...this.keys()];
};
Map.prototype.entriesArray = function(): Array<any> {
  return [...this.entries()].map(x => {
    return { key: x[0], value: x[1] };
  });
};
export {};
