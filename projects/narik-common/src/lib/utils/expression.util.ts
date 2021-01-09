export function evalStringExpression(expression: string, argNames: string[]) {
    try {
        return Function(...argNames, `return ${expression};`) as any;
    } catch (error) {
        console.error(error);
    }
}
