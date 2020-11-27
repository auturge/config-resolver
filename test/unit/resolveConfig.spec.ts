import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import sinon = require('sinon');
import { resolveConfig } from '@src/resolveConfig';
import { IProcessResult } from '@model/IProcessResult';
import { ResolverOptions } from '@model/ResolverOptions';
import { AcceptableType } from '@model/AcceptableType';
import * as getConfig from '@functions/getConfig';
import * as tryAlternatives from '@functions/tryAlternatives';

describe('resolveConfig', () => {

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`resolve - when called with ${ key }, throws an error`, () => {
            const options: ResolverOptions = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                resolveConfig(options)
            }, `Argument 'options' must not be null.`)
        })
    });

    [
        { key: 'argument is an empty object', value: {} },
        { key: 'explicit is null and alternatives is missing', value: { explicit: null } },
        { key: 'explicit is undefined and alternatives is missing', value: { explicit: undefined } },
        { key: 'alternatives is null and explicit is missing', value: { alternatives: null } },
        {
            key: 'alternatives is undefined and explicit is missing',
            value: { alternatives: undefined },
        },
        { key: 'alternatives is empty and explicit is missing', value: { alternatives: [] } },
    ].forEach(({ key, value }) => {
        it(`resolve - when ${ key }, throws an error`, () => {
            const options: ResolverOptions = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                resolveConfig(options)
            }, 'The options argument is invalid because it contains no explicit option and no alternatives.')
        })
    });

    it('resolveConfig - when explicit options are provided, returns the result of getConfig', () => {
        const options: ResolverOptions = {
            explicit: {
                path: AnyRandom.string(),
                type: AnyRandom.enum(AcceptableType)
            }
        }
        const expected = { 'foo': 'bar' }
        sinon.stub(getConfig, 'getConfig').returns(expected);

        const result = resolveConfig(options);

        assert.equal(result, expected);
    });

    it('resolveConfig - when explicit option is not specified, returns the result of tryAlternatives', () => {
        const options: ResolverOptions = {
            alternatives: [ {
                path: AnyRandom.string(),
                type: AnyRandom.enum(AcceptableType)
            } ]
        }
        const expected = { 'foo': 'bar' };
        const expectedResult: IProcessResult = new IProcessResult(
            AnyRandom.string(), AnyRandom.enum(AcceptableType)
        );
        expectedResult.output = expected;
        sinon.stub(tryAlternatives, 'tryAlternatives').returns(expectedResult);

        const result = resolveConfig(options);

        assert.equal(result, expected);
    });
})
