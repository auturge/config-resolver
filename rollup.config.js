import typescript from "@wessberg/rollup-plugin-ts";
import tsConfigPaths from "rollup-plugin-ts-paths";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";
import packageJson from "./package.json";

/** Set to enable properties */
const outputFolder = "./dist";

const minify = false;
const sourceMaps = minify;
const includeCJS = true; // cjs: CommonJS: for Node
const includeESM = true; // esm: ES module: for bundlers
const includeUMD = false; // emd: browser-friendly UMD build

/** Code Below */
const plugins = [ tsConfigPaths(), typescript(), nodeResolve(), commonjs() ];
if (minify) {
    plugins.push(terser());
}

console.log(" ");
const output = [];
const outputs = {
    cjs: { format: "cjs", sourcemap: sourceMaps },
    esm: { format: "es", sourcemap: sourceMaps },
    umd: { format: "emd", sourcemap: sourceMaps },
};
try {
    if (includeCJS) {
        outputs.cjs.file = path.resolve(outputFolder, packageJson.main);
        console.log("Building CommonJS:   ", outputs.cjs.file);
        output.push(outputs.cjs);
    }
    if (includeESM) {
        outputs.esm.file = path.resolve(outputFolder, packageJson.module);
        console.log("Building ES module:  ", outputs.esm.file);
        output.push(outputs.esm);
    }
    if (includeUMD) {
        outputs.umd.file = path.resolve(outputFolder, packageJson.browser);
        console.log("Building UMD output: ", outputs.umd.file);
        output.push(outputs.umd);
    }
} catch (err) {
    console.error("Unable to determine outputs:");
    console.error(err);
}

function keysIfAny(array) {
    if (!array) {
        return [];
    }
    return Object.keys(array);
}

export default {
    watch: {
        clearScreen: false,
    },
    input: "src/exports.ts",
    output: output,
    plugins: plugins,
    external: [
        'fs', 'path',
        "ms",
        ...keysIfAny(packageJson.dependencies),
        ...keysIfAny(packageJson.devDependencies),
        ...keysIfAny(packageJson.peerDependencies),
    ],
};
