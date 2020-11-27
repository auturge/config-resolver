import { assert } from "chai";
import { ConfigOption } from '@model/ConfigOption';
import { AcceptableType } from '@model/AcceptableType';
import { sortAlternatives } from '@functions/sortAlternatives';
import { AnyRandom } from '@auturge/testing';

describe('sortAlternatives', () => {
    [
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
        { key: 'empty', value: [] },
    ].forEach(({ key, value }) => {
        it(`sortAlternatives - when called with ${key}, throws`, () => {
            const alternatives: ConfigOption[] = <any>value; // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                sortAlternatives(alternatives);
            });
        });
    });

    function getOption(priority: any): ConfigOption { // eslint-disable-line @typescript-eslint/no-explicit-any
        const result: ConfigOption = {
            path: AnyRandom.string(),
            type: AnyRandom.enum(AcceptableType),
            priority: priority
        }
        return result;
    }

    it('sortAlternatives - in place - sorts the alternatives by priority, in ascending order', () => {
        const option0 = getOption(0);
        const option1 = getOption(1);
        const option2 = getOption(2);
        const option3 = getOption(3);
        const option4 = getOption(4);
        const option5 = getOption(5);

        const alternatives: ConfigOption[] = [
            option5, option1, option3, option2, option0, option4
        ];
        const expected = [
            option0, option1, option2, option3, option4, option5
        ];

        sortAlternatives(alternatives);

        assert.deepEqual(alternatives, expected);
    });

    it('sortAlternatives - in place - sorts the alternatives by priority, in ascending order', () => {
        const option0 = getOption(0);
        const option1 = getOption(null);
        const option2 = getOption(null);
        const option3 = getOption(3);
        const option4 = getOption(4);
        const option5 = getOption(5);
        const alternatives: ConfigOption[] = [
            option5, option1, option3, option2, option0, option4
        ];

        sortAlternatives(alternatives);

        assert.equal(alternatives[0].priority, 0);
        assert.equal(alternatives[1].priority, 0);
        assert.equal(alternatives[2].priority, 0);
        assert.equal(alternatives[3].priority, 3);
        assert.equal(alternatives[4].priority, 4);
        assert.equal(alternatives[5].priority, 5);
    });
});
