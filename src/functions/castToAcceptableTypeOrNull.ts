import { AcceptableType } from '@model/AcceptableType'
import { FunctionType } from '@model/FunctionType'
import { ResultType } from '@model/ResultType'

/** Given an object and an acceptable type, either cast it to the acceptable type or `null`. */
export function castToAcceptableTypeOrNull(
    data: ResultType,
    type: string
): ResultType {
    const dataType = {}.toString.call(data)
    const json = AcceptableType.JSON.toString().toLowerCase()
    const func = AcceptableType.FUNCTION.toString().toLowerCase()

    if (type == json && dataType === '[object Object]') {
        return data
    }

    if (type == func && dataType === '[object Function]') {
        return data as FunctionType
    }

    return null
}
