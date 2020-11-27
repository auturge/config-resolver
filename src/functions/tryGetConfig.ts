import { getInvalidStringError, getInvalidTypeError } from '@src/errors';
import { ConfigOption } from "@model/ConfigOption";
import { ResultType } from '@model/ResultType';
import { loadConfig } from './loadConfig';
import { castToAcceptableTypeOrNull } from './castToAcceptableTypeOrNull';
import { getArgumentNullError } from '@src/errors/getArgumentNullError';

export function tryGetConfig(options: ConfigOption): ResultType {
    // Whatever is passed in, validate it's parts
    if (!options)
        throw getArgumentNullError('options');

    if (!options.path || !options.path.trim())
        throw getInvalidStringError(options.path);

    if (!options.type)
        throw getInvalidTypeError(options.type);

    // The options passed validation, so resolve the config.
    const path = options.path.trim();
    const type = options.type;

    const configObject = loadConfig(path);
    if (!configObject)
        return null;

    return castToAcceptableTypeOrNull(configObject, type);
}
