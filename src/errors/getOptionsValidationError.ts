export function getOptionsValidationError(): Error {
    const message = 'The options argument is invalid because it contains no explicit option and no alternatives.';
    const result = new Error(message);
    result.name = "OptionsValidationError";
    return result;
}
