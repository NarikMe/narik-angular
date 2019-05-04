declare global {
  interface Number {

    /**
     * Add Thousands Separator to number.
     * @returns seperator
     */
    thousandsSeparator(): String;
  }
}
Number.prototype.thousandsSeparator = function(): string {
  return Number(this)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export {};
