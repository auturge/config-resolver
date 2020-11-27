import { assert } from "chai";
import { AnyRandom } from '@auturge/testing';
import { getArgumentNullError } from '@errors/getArgumentNullError';

describe('getArgumentNullError', () => {
    it(`getArgumentNullError - gets the appropriate error`, () => {
        const name = AnyRandom.string();

        const error = getArgumentNullError(name);

        assert.equal(error.message, `Argument '${name}' must not be null.`);
        assert.equal(error.name, `ArgumentNullError`);
    });
});
