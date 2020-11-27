import { assert } from "chai";
import { AnyRandom } from '@auturge/testing';
import { getInvalidTypeError } from '@errors/getInvalidTypeError';
import { AcceptableType } from '@model/AcceptableType';

describe('getInvalidTypeError', () => {
    it(`getInvalidTypeError - with value - gets the appropriate error`, () => {
        const value = AnyRandom.enum(AcceptableType);
        const message = `[${value}] is not a valid AcceptableType.`;

        const error = getInvalidTypeError(value);

        assert.equal(error.message, message);
        assert.equal(error.name, `InvalidTypeError`);
    });

    it(`getInvalidTypeError - without value - gets the appropriate error`, () => {
        const message = `Invalid AcceptableType.`;

        const error = getInvalidTypeError();

        assert.equal(error.message, message);
        assert.equal(error.name, `InvalidTypeError`);
    });
});
