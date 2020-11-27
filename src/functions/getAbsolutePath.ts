import * as path from 'path';
import { getInvalidStringError } from '@src/errors';
import { pathExists } from './pathExists';

/** Given a relative or absolute path, returns the absolute path. If the path does not exist, returns `null`. */
export function getAbsolutePath(pathCandidate: string): string | null {
    if (!pathCandidate || !pathCandidate.trim().length)
        throw getInvalidStringError(pathCandidate);

    let absolutePath = "";
    const isAbsolute = path.isAbsolute(pathCandidate);
    if (isAbsolute) {
        absolutePath = pathCandidate;
    } else {
        absolutePath = path.resolve(process.cwd(), pathCandidate);
    }

    return pathExists(absolutePath) ? absolutePath : null;
}
