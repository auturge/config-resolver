import * as path from 'path';
import { getInvalidStringError } from '@src/errors';

/** Given a relative or absolute path, returns the absolute path. */
export function getAbsolutePath(pathCandidate: string): string {
    if (!pathCandidate || !pathCandidate.trim().length)
        throw getInvalidStringError(pathCandidate);

    let absolutePath = "";
    const isAbsolute = path.isAbsolute(pathCandidate);
    if (isAbsolute) {
        absolutePath = pathCandidate;
    } else {
        absolutePath = path.resolve(process.cwd(), pathCandidate);
    }

    return absolutePath;
}
