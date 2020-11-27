import { ConfigOption } from "@model/ConfigOption";

export function getRequiredConfigMissingError(config?: ConfigOption): Error {
    let message = `A config file was specified, but could not be resolved`;
    if (arguments.length > 0) {
        message += `: ${JSON.stringify(config)}`;
    } else {
        message += ".";
    }

    const result = new Error(message);
    result.name = "RequiredConfigMissingError";
    return result;
}
