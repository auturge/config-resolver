import { assert } from "chai";
import { AnyRandom } from '@auturge/testing';
import { getFileLoadError } from '@errors/getFileLoadError';

describe('getFileLoadError', () => {
    it(`getFileLoadError - gets the appropriate error`, () => {
        const path = AnyRandom.string();
        const error = new Error(AnyRandom.string());
        const message = `Could not load file at [${path}] due to ${error.message}: ${error.message}`;


        const result = getFileLoadError(path, error);

        assert.equal(result.message, message);
        assert.equal(result.name, `FileLoadError`);
    });
});
