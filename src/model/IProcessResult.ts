import { ResultType } from './ResultType'

export interface IProcessResult {
    absolutePath: string;
    path: string;
    type: string;
    output: ResultType;
    success: boolean;
}

export class IProcessResult {
    static EMPTY: IProcessResult = JSON.parse(JSON.stringify(new IProcessResult('', '')));

    constructor(path: string, type: string) {
        this.absolutePath = '';
        this.path = path;
        this.type = type;
        this.output = null;
        this.success = false;
    }
}
