import { AcceptableType } from '@model/AcceptableType';
import { FunctionType } from "@model/FunctionType";
import { ResultType } from '@model/ResultType';

/** Given an object and an acceptable type, either cast it to the acceptable type or `null`. */
export function castToAcceptableTypeOrNull(data: ResultType, type: AcceptableType): ResultType {

    const dataType = {}.toString.call(data);

    if (type == AcceptableType.JSON && dataType === '[object Object]') {
        return data;
    }

    if (type == AcceptableType.FUNCTION && dataType === '[object Function]') {
        return data as FunctionType;
    }

    return null;
}
