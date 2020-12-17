import { isArray } from './object.util';

export function promiseSerial(tasks) {
  const aArgs = [];
  let self = this;
  if (!isArray(tasks)) {
    tasks = [tasks];
  }
  if (!self) {
    self = this;
  }
  return Promise.all(aArgs).then(function (args) {
    let current = Promise.resolve.call(Promise);
    const result = [];
    tasks.forEach(function (task) {
      if (task && task.apply) {
        result.push(
          (current = current.then(function () {
            return task.apply(self, args);
          }))
        );
      } else {
        result.push(task);
      }
    });
    return Promise.all(result);
  });
}
export async function promiseSerial2(
  tasks: (() => Promise<any>)[]
): Promise<any> {
  for (const task of tasks) {
    await task();
  }
}
