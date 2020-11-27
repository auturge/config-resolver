export function getFileLoadError(path: string, error: Error): Error {
    const message = `Could not load file at [${path}] due to ${error.message}: ${error.message}`;
    const result = new Error(message);
    result.name = "FileLoadError";
    return result;
}
