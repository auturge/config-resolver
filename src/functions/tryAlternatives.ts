import { ConfigOption } from "@model/ConfigOption";
import { tryGetConfig } from "./tryGetConfig";
import { sortAlternatives } from './sortAlternatives';
import { IProcessResult } from '@model/IProcessResult';
import { castToAcceptableTypeOrNull } from './castToAcceptableTypeOrNull';

/** Given a possible list of alternatives, try to resolve a config file. */
export function tryAlternatives(alternatives?: ConfigOption[]): IProcessResult {
    if (!alternatives || alternatives.length == 0)
        return IProcessResult.EMPTY;

    // then, sort the alternatives by priority 
    // (in ascending order, where NO priority == top priority)
    sortAlternatives(alternatives);

    for (let index = 0; index < alternatives.length; index++) {
        const alternative = alternatives[ index ];
        const result = tryGetConfig(alternative);
        if (result.success) {
            result.output = castToAcceptableTypeOrNull(result.output, result.type);
            if (result.output) {
                return result;
            }
        }
    }

    return IProcessResult.EMPTY;
}
