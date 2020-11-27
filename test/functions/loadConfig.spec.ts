import * as sinon from "sinon";
import { assert } from "chai";
import { AnyRandom } from "@auturge/testing";
import { loadConfig } from '@src/functions/loadConfig';
import * as paths from '@src/functions/getAbsolutePath';
import * as rekwire from '@src/functions/rekwire';

describe('loadConfig', () => {

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty string', value: '' },
        { key: 'whitespace only', value: '  ' }
    ].forEach(({ key, value }) => {
        it(`loadConfig - when path is ${key}, throws an error`, () => {
            const pathCandidate: string = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                loadConfig(pathCandidate);
            });
        });
    });

    let getPathSpy, requireSpy;
    before(() => {
        getPathSpy = sinon.stub(paths, 'getAbsolutePath').callsFake((path: string) => path);
        requireSpy = sinon.stub(rekwire, "rekwire").throws();
    })

    after(() => {
        (<any>(paths.getAbsolutePath)).restore(); // eslint-disable-line @typescript-eslint/no-explicit-any
        (<any>(rekwire.rekwire)).restore(); // eslint-disable-line @typescript-eslint/no-explicit-any
    })

    it(`loadConfig - when an error occurs loading the file, throws an error`, () => {
        const pathCandidate: string = AnyRandom.string(5, 10);

        assert.throws(() => {
            loadConfig(pathCandidate);
        });

        sinon.assert.calledOnceWithExactly(getPathSpy, pathCandidate);
        sinon.assert.calledOnceWithExactly(requireSpy, pathCandidate);
    });
});
