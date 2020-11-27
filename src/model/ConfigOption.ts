import { AcceptableType } from "./AcceptableType";

/** An interface representing a possible configuration file. */
export interface ConfigOption {

    // The path of the config file, either absolute, or relative to process.cwd()
    path: string;

    // The type of object that will be returned
    type: AcceptableType;

    // A non-negative integer. Smaller numbers take precedence. Default: 0
    priority?: number;
}
