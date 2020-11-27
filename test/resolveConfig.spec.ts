import { assert } from 'chai'
import { resolveConfig } from '@src/resolveConfig'
import { ResolverOptions } from '@model/ResolverOptions'
import { AcceptableType } from '@model/AcceptableType'
import { FunctionType } from '@model/FunctionType'
import { AnyRandom } from '@auturge/testing'

describe('resolveConfig', () => {
    let config

    const expected_JSON = {
        source: './package.json',
        destination: './build/dev/package.json',
        keeplist: ['name', 'version'],
        trimlist: ['main', 'repository'],
        loglevel: 'DEBUG',
    }

    function expected_JS(env) {
        return {
            source: './package.json',
            destination: './build/dev/package.json',
            keeplist: ['name', 'version'],
            trimlist: ['main', 'repository'],
            loglevel: 'DEBUG',
            env: env,
        }
    }

    ;[
        { key: 'null', value: null },
        { key: 'undefined', value: undefined },
    ].forEach(({ key, value }) => {
        it(`resolve - when called with ${key}, throws an error`, () => {
            const options: ResolverOptions = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                resolveConfig(options)
            })
        })
    })

    it('resolve - golden path - explicit, function (AcceptableType) - with args', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.js',
                type: AcceptableType.FUNCTION,
            },
        }
        const env = AnyRandom.string()
        const expected = expected_JS(env)

        assert.doesNotThrow(() => {
            const func: FunctionType = resolveConfig(options) as FunctionType
            config = func(env)
        })

        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - explicit, function (string) - with args', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.js',
                type: 'function',
            },
        }
        const env = AnyRandom.string()
        const expected = expected_JS(env)

        const func: FunctionType = resolveConfig(options) as FunctionType
        assert.doesNotThrow(() => {
            const func: FunctionType = resolveConfig(options) as FunctionType
            config = func(env)
        })

        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - explicit, function - without args', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.js',
                type: AcceptableType.FUNCTION,
            },
        }
        const expected = expected_JS(undefined)

        assert.doesNotThrow(() => {
            const func: FunctionType = resolveConfig(options) as FunctionType
            config = func()
        })

        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - explicit, json (AcceptableType)', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.json',
                type: AcceptableType.JSON,
            },
        }
        const expected = expected_JSON

        assert.doesNotThrow(() => {
            config = resolveConfig(options)
        })
        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })
    
    it('resolve - golden path - explicit, json (string)', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.json',
                type: 'json',
            },
        }
        const expected = expected_JSON

        assert.doesNotThrow(() => {
            config = resolveConfig(options)
        })
        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - explicit, bad type', () => {
        const options: ResolverOptions = {
            explicit: {
                path: './test/objects/config.json',
                type: AnyRandom.string(),
            },
        }
        
        assert.throws(() => {
            resolveConfig(options)
        })
    })

    it('resolve - explicit, json - file does not exist', () => {
        const options: ResolverOptions = {
            explicit: {
                path: AnyRandom.string(),
                type: AcceptableType.JSON,
            },
        }

        assert.throws(() => {
            config = resolveConfig(options)
        })
    })

    it('resolve - golden path - alternative, json takes precedence', () => {
        const options: ResolverOptions = {
            alternatives: [
                {
                    path: './test/objects/config.json',
                    type: AcceptableType.JSON,
                    priority: 0,
                },
                {
                    path: './test/objects/config.js',
                    type: AcceptableType.FUNCTION,
                    priority: 1,
                },
            ],
        }
        const expected = expected_JSON

        assert.doesNotThrow(() => {
            config = resolveConfig(options)
        })

        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - alternative, js takes precedence', () => {
        const env = AnyRandom.string()
        const options: ResolverOptions = {
            alternatives: [
                {
                    path: './test/objects/config.json',
                    type: AcceptableType.JSON,
                    priority: 1,
                },
                {
                    path: './test/objects/config.js',
                    type: AcceptableType.FUNCTION,
                    priority: 0,
                },
            ],
        }
        const expected = expected_JS(env)

        assert.doesNotThrow(() => {
            const func = resolveConfig(options) as FunctionType
            config = func(env)
        })

        assert.isNotNull(config)
        assert.deepEqual(config, expected)
    })

    it('resolve - golden path - alternative, nothing found, returns null', () => {
        const options: ResolverOptions = {
            alternatives: [
                {
                    path: './test/objects/nope.json',
                    type: AcceptableType.JSON,
                    priority: 1,
                },
                {
                    path: './test/objects/not.this.either.js',
                    type: AcceptableType.FUNCTION,
                    priority: 0,
                },
            ],
        }

        assert.doesNotThrow(() => {
            config = resolveConfig(options)
        })

        assert.isNull(config)
    })

    it('resolve - throws when explicit is not specified, and alternatives list is empty', () => {
        const options: ResolverOptions = {
            alternatives: [],
        }

        assert.throws(() => {
            config = resolveConfig(options)
        })
    })

    it(`resolve - when called with an empty config, throws an error`, () => {
        const options: ResolverOptions = {}

        assert.throws(() => {
            resolveConfig(options)
        })
    })
    ;[
        { key: 'explicit is null', value: { explicit: null } },
        { key: 'explicit is undefined', value: { explicit: undefined } },
        { key: 'alternatives is null', value: { alternatives: null } },
        {
            key: 'alternatives is undefined',
            value: { alternatives: undefined },
        },
        { key: 'alternatives is empty', value: { alternatives: [] } },
    ].forEach(({ key, value }) => {
        it(`resolve - when ${key}, throws an error`, () => {
            const options: ResolverOptions = <any>value // eslint-disable-line @typescript-eslint/no-explicit-any

            assert.throws(() => {
                config = resolveConfig(options)
            })
        })
    })
})
