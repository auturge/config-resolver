import { ResultType } from '@model/ResultType';
import { getInvalidStringError, getFileLoadError } from '@src/errors';
import { getAbsolutePath } from './getAbsolutePath';
import { rekwire } from './rekwire';

/** Given the specified absolute path, load whatever is there. */
export function loadConfig(pathCandidate: string): ResultType {

    if (!pathCandidate || !pathCandidate.trim().length)
        throw getInvalidStringError(pathCandidate);

    const absolutePath: string | null = getAbsolutePath(pathCandidate);
    if (!absolutePath)
        return null;

    try {
        const config = rekwire(absolutePath);
        return config;
    } catch (error) {
        throw getFileLoadError(absolutePath, error);
    }
}
