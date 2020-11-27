export function getRequiredConfigMissingError(path: string): Error {
    let message = `A config file was specified, but could not be resolved: ${ path }`;

    const error = new Error(message);
    error.name = "RequiredConfigMissingError";
    return error;
}
