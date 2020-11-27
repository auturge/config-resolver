import { FunctionType } from './FunctionType';

/** The acceptable types of config objects to return. */
export type ResultType = Record<string, unknown> | FunctionType | null;
