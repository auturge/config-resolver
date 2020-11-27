import { assert } from 'chai'
import { AnyRandom } from '@auturge/testing'
import { validateType } from '@functions/validateType'
import { AcceptableType } from '@model/AcceptableType'

describe('validateType', () => {
    
    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`validateType - when called with ${key}, throws an error`, () => {
            const type = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                validateType(type)
            })
        })
    })

    it(`validateType - when type is not a valid AcceptableType, throws an error`, () => {
        const type = AnyRandom.string()

        assert.throws(() => {
            validateType(type)
        })
    })
    
    it(`validateType - when type is a valid AcceptableType, returns the type as a string`, () => {
        const type = AnyRandom.enum(AcceptableType);

        const result = validateType(type);
        
        assert.equal(result, type.toString().toLowerCase())        
    })
})
