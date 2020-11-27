import { assert } from "chai";
import { AnyRandom } from '@auturge/testing';
import { getInvalidStringError } from '@errors/getInvalidStringError';

describe('getInvalidStringError', () => {
    it(`getInvalidStringError - with value - gets the appropriate error`, () => {
        const value = AnyRandom.string();
        const message = `String must not be null, undefined, empty, or pure whitespace, but [${value}] was provided.`;

        const error = getInvalidStringError(value);

        assert.equal(error.message, message);
        assert.equal(error.name, `InvalidStringError`);
    });

    it(`getInvalidStringError - without value - gets the appropriate error`, () => {
        const message = `String must not be null, undefined, empty, or pure whitespace.`;

        const error = getInvalidStringError();

        assert.equal(error.message, message);
        assert.equal(error.name, `InvalidStringError`);
    });
});
