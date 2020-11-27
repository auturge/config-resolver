import { AcceptableType } from '@model/AcceptableType';

export function getInvalidTypeError(type?: string | AcceptableType): Error {
    const message =
        arguments.length == 0
            ? `Invalid AcceptableType.`
            : `[${type}] is not a valid AcceptableType.`
    const result = new Error(message)
    result.name = 'InvalidTypeError'
    return result
}
