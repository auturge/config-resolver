import { getArgumentNullError } from '@src/errors'
import { ConfigOption } from '@model/ConfigOption'
import { IProcessResult } from '@model/IProcessResult'
import { loadConfig } from './loadConfig'
import { validateType } from './validateType'
import { validatePath } from './validatePath'

export function tryGetConfig(options: ConfigOption): IProcessResult {
    // Whatever is passed in, validate it's parts
    if (!options) throw getArgumentNullError('options')
    const path = validatePath(options.path);
    const type = validateType(options.type);

    const pathInfo: IProcessResult = new IProcessResult(path, type);

    const loadConfigResult = loadConfig(pathInfo)
    return loadConfigResult;
}
