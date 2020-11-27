import { assert } from 'chai'
import { AnyRandom, CharacterSet } from '@auturge/testing'
import { AcceptableType } from '@model/AcceptableType'
import { validateOptions } from '@functions/validateOptions'
import { ResolverOptions } from '@model/ResolverOptions'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('validateOptions', () => {

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`validateOptions - when called with ${ key }, throws an error`, () => {
            const options = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                validateOptions(options);
            })
        })
    })

    it(`validateOptions - when neither explicit nor alternatives are provided, throws an error`, () => {
        const options: ResolverOptions = {};

        assert.throws(() => {
            validateOptions(options);
        })
    })

    it(`validateOptions - when explicit is not provided, and alternatives is an empty array, throws an error`, () => {
        const options: ResolverOptions = {
            alternatives: []
        };

        assert.throws(() => {
            validateOptions(options);
        })
    })

    it(`validateOptions - when options are valid, returns the options`, () => {
        const options: ResolverOptions = {
            explicit: {
                path: AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC),
                type: AnyRandom.enum(AcceptableType)
            }
        }

        const result = validateOptions(options);

        assert.equal(result, options);
    })
})
