import { getArgumentNullError, getRequiredConfigMissingError } from '@src/errors'
import { ConfigOption } from '@model/ConfigOption'
import { ResultType } from '@model/ResultType'
import { tryGetConfig } from './tryGetConfig'

export function getConfig(options: ConfigOption): ResultType {
    if (!options) throw getArgumentNullError('options')

    const result = tryGetConfig(options);

    if (!result.success) {
        // figure out what broke
        throw getRequiredConfigMissingError(result.absolutePath);
    }

    return result.output;
}
