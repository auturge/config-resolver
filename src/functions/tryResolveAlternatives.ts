import { ConfigOption } from "@model/ConfigOption";
import { ResultType } from '@model/ResultType';
import { tryGetConfig } from "./tryGetConfig";
import { sortAlternatives } from './sortAlternatives';

/** Given a possible list of alternatives, try to resolve a config file. */
export function tryResolveAlternatives(alternatives?: ConfigOption[]): ResultType {
    if (!alternatives || alternatives.length == 0)
        return null;

    // then, sort the alternatives by priority 
    // (in ascending order, where NO priority == top priority)
    sortAlternatives(alternatives);

    let result: ResultType = null;

    for (let index = 0; index < alternatives.length; index++) {
        const alternative = alternatives[index];
        result = tryGetConfig(alternative);
        if (result != null)
            break;
    }

    return result;
}
