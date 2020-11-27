import { ConfigOption } from "@model/ConfigOption";
import { getArgumentNullError } from '@src/errors';

/** Sort the alternatives by priority (in ascending order, where NO priority == top priority) */
export function sortAlternatives(alternatives: ConfigOption[]): ConfigOption[] {
    if (!alternatives || alternatives.length == 0)
        throw getArgumentNullError('alternatives');

    return alternatives.sort(function (a, b) {
        a.priority = a.priority || 0;
        b.priority = b.priority || 0;
        return (a.priority - b.priority);
    });
}
