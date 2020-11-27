module.exports = (env) => {
    const config = {
        "source": "./package.json",
        "destination": "./build/dev/package.json",
        "keeplist": [
            "name",
            "version"
        ],
        "trimlist": [
            "main",
            "repository"
        ],
        "loglevel": "DEBUG",
        "env": env
    }

    return config;
}
