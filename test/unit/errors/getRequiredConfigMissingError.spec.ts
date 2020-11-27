import { assert } from "chai";
import { AnyRandom, CharacterSet } from '@auturge/testing';
import { getRequiredConfigMissingError } from '@errors/getRequiredConfigMissingError';

describe('getRequiredConfigMissingError', () => {
    it(`getRequiredConfigMissingError - with value - gets the appropriate error`, () => {
        const path = AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC);
        const message = `A config file was specified, but could not be resolved: ${ path }`;

        const error = getRequiredConfigMissingError(path);

        assert.equal(error.message, message);
        assert.equal(error.name, `RequiredConfigMissingError`);
    });
});
