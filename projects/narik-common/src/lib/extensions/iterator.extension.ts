declare global {
  interface Map<K, V> {

    /**
     * @returns values as an array
     */
    valuesArray(): Array<V>;

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
Map.prototype.entriesArray = function(): Array<any> {
  return [...this.entries()].map(x => {
    return { key: x[0], value: x[1] };
  });
};
export {};
