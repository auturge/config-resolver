import { AcceptableType } from "@src/model/AcceptableType";

export function getInvalidTypeError(value?: AcceptableType): Error {
    const message = arguments.length == 0 ? `Invalid AcceptableType.` : `[${value}] is not a valid AcceptableType.`;
    const result = new Error(message);
    result.name = "InvalidTypeError";
    return result;
}
