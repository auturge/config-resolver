"use strict";

const trim = require("../trim");
const path = require("path");
const fs = require("fs");
const isValid = require("is-valid-path");

let sourceIn = "";
let targetFolder = "";
try {
    sourceIn = process.argv.slice(2)[0];
    targetFolder = process.argv.slice(2)[1];
} catch (error) {
    console.error("Could not interpret arguments.");
    console.error(error);
    return 1;
}

if (!targetFolder || targetFolder === "") {
    console.error("Target folder must be supplied.");
    console.error("argv:");
    console.error(process.argv);
    return 1;
}
const resolvedSource = path.join(process.cwd(), sourceIn);
const resolvedTargetFolder = path.join(process.cwd(), targetFolder);
const resolvedTarget = path.join(resolvedTargetFolder, "package.json");

if (!isValid(resolvedTarget)) {
    console.error(`${resolvedTarget} is not a valid path.`);
    return 1;
}

if (!fs.existsSync(resolvedSource)) {
    console.error("Could not find package.json.");
    return 1;
}

if (!fs.existsSync(resolvedTargetFolder)) {
    console.error(`Target folder [${resolvedTargetFolder}] does not exist.`);
    return 1;
}

trim(resolvedSource, resolvedTarget, [
    "author",
    "bugs",
    "browser",
    "dependencies",
    "description",
    "engines", // The version(s) of node (or whatever runtime) that your stuff works on
    "engineStrict", // If you are sure that your module will definitely not run properly on versions of Node/npm other than those specified in the engines object
    "exports",
    "files",
    "homepage",
    "jsnext:main",
    "license",
    "main",
    "module",
    "name",
    "private",
    "productName",
    "repository",
    "type",
    "types",
    "typings",
    "version",
]);
