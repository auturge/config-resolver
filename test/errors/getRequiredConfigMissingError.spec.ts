import { assert } from "chai";
import { AnyRandom } from '@auturge/testing';
import { getRequiredConfigMissingError } from '@errors/getRequiredConfigMissingError';
import { AcceptableType } from '@model/AcceptableType';
import { ConfigOption } from '@model/ConfigOption';

describe('getRequiredConfigMissingError', () => {
    it(`getRequiredConfigMissingError - with value - gets the appropriate error`, () => {
        const config: ConfigOption = {
            path: AnyRandom.string(),
            type: AnyRandom.enum(AcceptableType)
        }
        const message = `A config file was specified, but could not be resolved: ${JSON.stringify(config)}`;

        const error = getRequiredConfigMissingError(config);

        assert.equal(error.message, message);
        assert.equal(error.name, `RequiredConfigMissingError`);
    });

    it(`getRequiredConfigMissingError - without value - gets the appropriate error`, () => {
        const message = `A config file was specified, but could not be resolved.`;

        const error = getRequiredConfigMissingError();

        assert.equal(error.message, message);
        assert.equal(error.name, `RequiredConfigMissingError`);
    });
});
