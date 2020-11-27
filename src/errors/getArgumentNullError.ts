export function getArgumentNullError(parameterName: string): Error {
    const error = new Error(`Argument '${parameterName}' must not be null.`)
    error.name = "ArgumentNullError";
    return error;
}
