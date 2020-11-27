import { assert } from "chai";
import { ConfigOption } from '@model';
import { tryResolveAlternatives } from '@functions/tryResolveAlternatives';

describe('tryResolveAlternatives', () => {
    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty', value: [] },
    ].forEach(({ key, value }) => {
        it(`tryResolveAlternatives - when called with ${key}, returns null`, () => {
            const alternatives: ConfigOption[] = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            const result = tryResolveAlternatives(alternatives);

            assert.isNull(result);
        });
    });
});
