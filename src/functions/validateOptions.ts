import { getArgumentNullError, getOptionsValidationError } from '@src/errors';
import { ResolverOptions } from '@src/model/ResolverOptions';

export function validateOptions(options: ResolverOptions): ResolverOptions {
    if (!options) throw getArgumentNullError('options')

    // validate the provided options
    if (
        !options.explicit &&
        !(options.alternatives && options.alternatives.length)
    )
        throw getOptionsValidationError()

    return options;
}
