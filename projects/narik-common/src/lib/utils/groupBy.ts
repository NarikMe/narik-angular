import { getNestedValue } from "./object.util";

export function groupBy(collection: Array<any>, property: string) {
  if (!collection) {
    return null;
  }

  const groupedCollection = collection.reduce((previous, current) => {
    const cValue = getNestedValue(current, property);
    if (!previous[cValue]) {
      previous[cValue] = [current];
    } else {
      previous[cValue].push(current);
    }

    return previous;
  }, {});

  // this will return an array of objects, each object containing a group of objects
  return Object.keys(groupedCollection).map(key => ({
    key,
    value: groupedCollection[key]
  }));
}
