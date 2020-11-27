import { assert } from "chai";
import { ConfigOption } from '@model/ConfigOption';
import { tryAlternatives } from '@functions/tryAlternatives';
import { IProcessResult } from '@model/IProcessResult';
import { AcceptableType } from '@model/AcceptableType';
import sinon = require('sinon');
import * as cast from '@functions/castToAcceptableTypeOrNull';
import * as tryGetConfig from '@functions/tryGetConfig';

// eslint-disable @typescript-eslint/no-explicit-any

describe('tryAlternatives', () => {

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty', value: [] },
    ].forEach(({ key, value }) => {
        it(`tryAlternatives - when called with ${ key }, returns null`, () => {
            const alternatives: ConfigOption[] = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            const result = tryAlternatives(alternatives);

            assert.deepEqual(IProcessResult.EMPTY, result);
        });
    });


    let castSpy, getSpy;
    before(() => {
        const badResult = IProcessResult.EMPTY;
        badResult.success = true;
        badResult.output = null;
        castSpy = sinon.stub(cast, 'castToAcceptableTypeOrNull').returns(null);
        getSpy = sinon.stub(tryGetConfig, 'tryGetConfig').returns(badResult);
    })

    after(() => {
        (<any>(cast.castToAcceptableTypeOrNull)).restore();
        (<any>(tryGetConfig.tryGetConfig)).restore();
    })

    it('tryAlternatives - if the result cannot be cast to the proper type, does not return it', () => {
        const alternatives: ConfigOption[] = [ {
            path: './test/objects/config.js',
            type: 'function'
        } ]

        const result = tryAlternatives(alternatives);

        assert.deepEqual(result, IProcessResult.EMPTY);
    })
});
