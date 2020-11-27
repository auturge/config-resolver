import { assert } from "chai";
import { getAbsolutePath } from '@src/functions/getAbsolutePath';
import * as path from 'path';

describe('getAbsolutePath', () => {

    const relativePath = './test/objects/config.js';
    const absolutePath: string = path.resolve(process.cwd(), relativePath);

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty string', value: '' },
        { key: 'only whitespace', value: '  ' }
    ].forEach(({ key, value }) => {
        it(`getAbsolutePath - throws when pathCandidate is ${ key }`, () => {
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
});
