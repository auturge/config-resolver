import * as fs from 'fs';

/** Determines whether the given path exists or not. */
export function pathExists(pathCandidate: string): boolean {
    return fs.existsSync(pathCandidate);
}
