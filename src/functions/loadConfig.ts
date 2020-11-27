import { IProcessResult } from '@model/IProcessResult';
import { getFileLoadError, getArgumentNullError } from '@src/errors';
import { getAbsolutePath } from './getAbsolutePath';
import { rekwire } from './rekwire';
import { pathExists } from './pathExists';
import { validatePath } from './validatePath';

/** Given the specified absolute path, load whatever is there. */
export function loadConfig(data: IProcessResult): IProcessResult {
    if (!data)
        throw getArgumentNullError('data');

    const path = validatePath(data.path);
    data.absolutePath = getAbsolutePath(path);
    if (!pathExists(data.absolutePath)) {
        return data;
    }

    try {
        const config = rekwire(data.absolutePath);
        data.output = config;
        data.success = true;
        return data;
    } catch (error) {
        throw getFileLoadError(data.absolutePath, error);
    }
}
