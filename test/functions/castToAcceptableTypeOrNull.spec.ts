import { assert } from "chai";
import { castToAcceptableTypeOrNull } from '@functions/castToAcceptableTypeOrNull';
import { AcceptableType } from '@model/AcceptableType';

describe('castToAcceptableTypeOrNull', () => {

    const expected_JSON = {
        source: './package.json',
        destination: './build/dev/package.json',
        keeplist: ['name', 'version'],
        trimlist: ['main', 'repository'],
        loglevel: 'DEBUG'
    };

    function expected_JS(env) {
        return {
            source: './package.json',
            destination: './build/dev/package.json',
            keeplist: ['name', 'version'],
            trimlist: ['main', 'repository'],
            loglevel: 'DEBUG',
            env: env
        };
    }

    it(`castToAcceptableTypeOrNull - expect JSON, get JSON - returns JSON`, () => {
        const obj = expected_JSON;

        const result = castToAcceptableTypeOrNull(obj, AcceptableType.JSON);

        assert.deepEqual(result, expected_JSON);
    });

    it(`castToAcceptableTypeOrNull - expect FUNCTION, GET FUNCTION, returns FUNCTION`, () => {
        const obj = expected_JS;

        const result = castToAcceptableTypeOrNull(obj, AcceptableType.FUNCTION);

        assert.deepEqual(result, expected_JS);
    });

    it(`castToAcceptableTypeOrNull - expect FUNCTION, but get JSON - returns null`, () => {
        const obj = expected_JSON;

        // expecting a function, but got JSON
        const result = castToAcceptableTypeOrNull(obj, AcceptableType.FUNCTION);

        assert.deepEqual(result, null);
    });

    it(`castToAcceptableTypeOrNull - expect JSON, but get FUNCTION - returns null`, () => {
        const obj = expected_JS;

        // expecting JSON, but got a function
        const result = castToAcceptableTypeOrNull(obj, AcceptableType.JSON);

        assert.deepEqual(result, null);
    });
});
