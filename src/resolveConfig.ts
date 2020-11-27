import { ResolverOptions } from '@model/ResolverOptions'
import { ResultType } from '@model/ResultType'
import { tryGetConfig, tryResolveAlternatives } from './functions'
import {
    getArgumentNullError,
    getRequiredConfigMissingError,
    getOptionsValidationError,
} from './errors'

/** Resolves the given options into a config object, or null if not found. */
export function resolveConfig(options: ResolverOptions): ResultType {
    if (!options) throw getArgumentNullError('options')

    if (
        !options.explicit &&
        !(options.alternatives && options.alternatives.length)
    )
        throw getOptionsValidationError()

    // first, inspect the explicit property. If it's provided, then try it.
    if (options.explicit) {
        // try it.
        const result = tryGetConfig(options.explicit)

        // If the required config object comes back null, then throw the error.
        if (!result) {
            throw getRequiredConfigMissingError(options.explicit)
        }

        // ... otherwise, we got it, so return it!
        return result
    }

    // Explicit was not provided, so look under alternatives
    return tryResolveAlternatives(options.alternatives)
}
