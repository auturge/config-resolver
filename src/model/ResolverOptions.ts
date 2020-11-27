import { ConfigOption } from "./ConfigOption";

/** A set of options for resolving a config file. */

export interface ResolverOptions {
    /** The single acceptable config option, provided by (e.g.) a CLI option.
     * If this property exists but cannot be resolved into a config object, then throw an error. */
    explicit?: ConfigOption;

    /** If no explicit config option is supplied, then iterate over this list. If objects in this list are not found, then return null. */
    alternatives?: ConfigOption[];
}
