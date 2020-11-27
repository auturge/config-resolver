import { assert } from "chai";
import { FunctionType } from '@src/model';

describe('FunctionType', () => {

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

    it(`FunctionType - supports objects`, () => {
        const obj = expected_JSON;

        const thing = (<unknown>obj) as FunctionType;

        assert.deepEqual(thing, <unknown>expected_JSON);
    });

    it(`FunctionType - supports objects`, () => {
        const obj = expected_JS;

        const thing = (<unknown>obj) as FunctionType;

        assert.deepEqual(thing, <unknown>expected_JS);
    });

});
