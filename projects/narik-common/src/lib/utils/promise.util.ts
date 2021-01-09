import { isArray } from './object.util';

export async function promiseSerial(
    tasks: (() => Promise<any>)[]
): Promise<any> {
    for (const task of tasks) {
        await task();
    }
}
