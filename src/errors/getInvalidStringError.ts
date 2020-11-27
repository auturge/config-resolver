export function getInvalidStringError(value?: string | null): Error {
    let message = `String must not be null, undefined, empty, or pure whitespace`;
    message += arguments.length == 0 ? `.` : `, but [${ value }] was provided.`;
    const result = new Error(message);
    result.name = "InvalidStringError";
    return result;
}
