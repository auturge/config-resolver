export function getTypeMissingError(): Error {
    const message = `The 'type' property is missing from resolver options.`

    const result = new Error(message)
    result.name = 'TypeMissingError'
    return result
}
