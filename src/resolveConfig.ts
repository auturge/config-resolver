import { ResolverOptions } from '@model/ResolverOptions'
import { ResultType } from '@model/ResultType'
import { getConfig, tryAlternatives, validateOptions } from '@src/functions'
import { getArgumentNullError } from '@src/errors'

/** Resolves the given options into a config object, or null if not found. */
export function resolveConfig(options: ResolverOptions): ResultType {
    if (!options) throw getArgumentNullError('options')

    // validate the provided options
    validateOptions(options);

    // first, inspect the explicit property. If it's provided, then try it.
    if (options.explicit) {
        return getConfig(options.explicit)
    }

    // Explicit was not provided, so look under alternatives
    return tryAlternatives(options.alternatives).output;
}
