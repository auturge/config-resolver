import { AcceptableType } from '@model/AcceptableType';
import { getTypeMissingError, getInvalidTypeError } from '@src/errors';

export function validateType(type: string): string {
    if (type == null) throw getTypeMissingError()

    const stringType = type.toLowerCase()
    const names = Object.keys(AcceptableType).map((key) =>
        key.toString().toLowerCase()
    )

    if (!names.includes(stringType)) throw getInvalidTypeError(stringType)

    return stringType
}
