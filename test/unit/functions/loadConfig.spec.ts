import * as sinon from "sinon";
import { assert } from "chai";
import { AnyRandom, CharacterSet } from "@auturge/testing";

import { IProcessResult } from '@model/IProcessResult';
import { loadConfig } from '@src/functions/loadConfig';
import * as paths from '@src/functions/getAbsolutePath';
import * as pathExists from '@src/functions/pathExists';
import * as rekwire from '@src/functions/rekwire';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('loadConfig', () => {

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`loadConfig - when data is ${ key }, throws an error`, () => {
            const data: IProcessResult = <any>value;

            assert.throws(() => {
                loadConfig(data);
            });
        });
    });

    let getPathSpy, requireSpy, pathExistsSpy;
    before(() => {
        getPathSpy = sinon.stub(paths, 'getAbsolutePath').callsFake((path: string) => path);
        requireSpy = sinon.stub(rekwire, "rekwire").throws();
        pathExistsSpy = sinon.stub(pathExists, 'pathExists').returns(true);
    })

    after(() => {
        (<any>(paths.getAbsolutePath)).restore();
        (<any>(rekwire.rekwire)).restore();
        (<any>(pathExists.pathExists)).restore();
    })

    it(`loadConfig - when an error occurs loading the file, throws an error`, () => {
        const data: IProcessResult = IProcessResult.EMPTY;
        data.path = AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC);
        data.absolutePath = AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC);

        assert.throws(() => {
            loadConfig(data);
        });

        sinon.assert.calledOnceWithExactly(getPathSpy, data.absolutePath);
        sinon.assert.calledOnceWithExactly(pathExistsSpy, data.absolutePath);
        sinon.assert.calledOnceWithExactly(requireSpy, data.absolutePath);
    });
});
