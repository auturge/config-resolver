import * as sinon from "sinon";
import { assert } from "chai";
import { AnyRandom, CharacterSet } from "@auturge/testing";
import { IProcessResult } from '@model/IProcessResult';
import { AcceptableType } from '@model/AcceptableType';
import { ConfigOption } from '@model/ConfigOption';
import { getConfig } from '@functions/getConfig';
import * as tryGetConfig from '@functions/tryGetConfig';

// eslint-disable @typescript-eslint/no-explicit-any

describe('getConfig', () => {

    function getGoodConfig(): IProcessResult {
        const result = IProcessResult.EMPTY;
        result.success = true;
        result.output = { 'foo': 'bar' };
        return result;
    }

    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`getConfig - when options argument is ${ key }, throws an error`, () => {
            const options: IProcessResult = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                getConfig(options);
            });
        });
    });

    let goodConfig: IProcessResult;
    let badConfig: IProcessResult;
    let getConfigSpy;

    beforeEach(() => {
        goodConfig = getGoodConfig();
        badConfig = IProcessResult.EMPTY;
        badConfig.absolutePath = AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC);
        badConfig.success = false;
        getConfigSpy = sinon.stub(tryGetConfig, 'tryGetConfig');
        getConfigSpy.returns(goodConfig);
    })

    afterEach(() => {
        (<any>(tryGetConfig.tryGetConfig)).restore();
    })

    it(`getConfig - when when an error occurs loading the file, throws an error`, () => {
        const options: ConfigOption = {
            path: AnyRandom.string(5, 10, CharacterSet.ALPHANUMERIC),
            type: AnyRandom.enum(AcceptableType)
        }
        getConfigSpy.returns(badConfig);

        assert.throws(() => {
            getConfig(options);
        }, `A config file was specified, but could not be resolved: ${ badConfig.absolutePath }`);

        sinon.assert.calledOnceWithExactly(getConfigSpy, options);
    });
});
