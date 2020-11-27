import { getInvalidStringError } from '@src/errors';

export function validatePath(candidate: string): string {
    if (candidate == null) throw getInvalidStringError()

    if (!candidate || !candidate.trim())
        throw getInvalidStringError(candidate)

    // The options passed validation, so resolve the config.
    const path = candidate.trim()

    return path;
}
