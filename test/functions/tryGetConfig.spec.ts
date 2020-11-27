import { assert } from "chai";
import { AnyRandom } from "@auturge/testing";
import { AcceptableType } from '@model/AcceptableType';
import { ConfigOption } from '@model/ConfigOption';
import { tryGetConfig } from '@functions/tryGetConfig';

describe('tryGetConfig', () => {
    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined }
    ].forEach(({ key, value }) => {
        it(`resolveConfig - when called with ${key}, throws an error`, () => {
            const options: ConfigOption = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                tryGetConfig(options);
            });
        });
    });

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty string', value: '' },
        { key: 'whitespace only', value: '  ' }
    ].forEach(({ key, value }) => {
        it(`resolveConfig - when path is ${key}, throws an error`, () => {
            const options: ConfigOption = {
                path: <any>value, // eslint-disable-line @typescript-eslint/no-explicit-any
                type: AnyRandom.enum(AcceptableType)
            };

            assert.throws(() => {
                tryGetConfig(options);
            });
        });
    });

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined }
    ].forEach(({ key, value }) => {
        it(`resolveConfig - when type is ${key}, throws an error`, () => {
            const options: ConfigOption = {
                path: AnyRandom.string(),
                type: <any>value // eslint-disable-line @typescript-eslint/no-explicit-any
            };

            assert.throws(() => {
                tryGetConfig(options);
            });
        });
    });
});
