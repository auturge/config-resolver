import { assert } from "chai";
import { getAbsolutePath } from '@src/functions/getAbsolutePath';
import * as path from 'path';
import { AnyRandom } from '@auturge/testing';

describe('getAbsolutePath', () => {

    const relativePath = './test/objects/config.js';
    const absolutePath: string = path.resolve(process.cwd(), relativePath);

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty string', value: '' },
        { key: 'only whitespace', value: '  ' }
    ].forEach(({ key, value }) => {
        it(`getAbsolutePath - throws when pathCandidate is ${key}`, () => {
            const pathCandidate: string = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any
            assert.throws(() => {
                getAbsolutePath(pathCandidate);
            });
        });
    });

    it(`getAbsolutePath - gets an absolute path`, () => {
        const pathCandidate: string = absolutePath;

        const result = getAbsolutePath(pathCandidate);

        assert.equal(result, absolutePath);
    });

    it(`getAbsolutePath - gets a relative path`, () => {
        const pathCandidate: string = relativePath;

        const result = getAbsolutePath(pathCandidate);

        assert.equal(result, absolutePath);
    });

    it(`getAbsolutePath - returns null when the path does not exist`, () => {
        const pathCandidate: string = AnyRandom.string(5, 10);

        const result = getAbsolutePath(pathCandidate);

        assert.equal(result, null);
    });

});
