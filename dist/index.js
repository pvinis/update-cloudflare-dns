require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 650:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.partitionRecords = exports.printConfigRecord = exports.printRemoteRecord = exports.recordTTL = exports.recordContent = exports.sameRecord = exports.remoteRecordToConfigRecord = exports.niceRecordName = void 0;
const string_1 = __nccwpck_require__(5189);
const niceRecordName = (rec) => {
    const removeZone = rec.name.replace(rec.zone_name, '');
    if (removeZone === '')
        return '@';
    return removeZone.slice(0, -1);
};
exports.niceRecordName = niceRecordName;
const setCommonStuff = (rec) => {
    return {
        name: exports.niceRecordName(rec),
        proxied: rec.proxied,
        ttl: rec.ttl,
    };
};
const remoteRecordToConfigRecord = (rec) => {
    var _c;
    switch (rec.type) {
        case 'A':
            return Object.assign(Object.assign({}, setCommonStuff(rec)), { type: 'A', ipv4: rec.content });
        case 'AAAA':
            return Object.assign(Object.assign({}, setCommonStuff(rec)), { type: 'AAAA', ipv6: string_1.toLowerCase(rec.content) });
        // case 'CNAME':
        // 	return {
        // 		...setCommonStuff(rec),
        // 		type: 'CNAME',
        // 		ipv6: toLowerCase(rec.content),
        // 	}
        // case 'HTTPS':
        // 	return {
        // 		...setCommonStuff(rec),
        // 		type: 'HTTPS',
        // 		ipv6: toLowerCase(rec.content),
        // 	}
        case 'TXT':
            return Object.assign(Object.assign({ type: rec.type }, setCommonStuff(rec)), { name: '', content: '', ttl: 1 });
        case 'MX':
            return {
                type: rec.type,
                name: exports.niceRecordName(rec),
                mailServer: rec.content,
                priority: (_c = rec.priority) !== null && _c !== void 0 ? _c : 1,
            };
    }
    // return absurd(rec.type)
    return Object.assign(Object.assign({}, setCommonStuff(rec)), { type: 'A', ipv4: 'OH NO!' });
};
exports.remoteRecordToConfigRecord = remoteRecordToConfigRecord;
const sameRecord = (remoteRecord, configRecord) => {
    var _c, _d;
    if (remoteRecord.type !== configRecord.type)
        return false;
    const niceName = exports.niceRecordName(remoteRecord);
    if (niceName !== configRecord.name)
        return false;
    switch (configRecord.type) {
        case 'A':
            if (remoteRecord.content !== configRecord.ipv4)
                return false;
            if (remoteRecord.proxied !== ((_c = configRecord.proxied) !== null && _c !== void 0 ? _c : true))
                return false;
            break;
        case 'AAAA':
            if (remoteRecord.content.toLowerCase() !== configRecord.ipv6.toLowerCase())
                return false;
            if (remoteRecord.proxied !== ((_d = configRecord.proxied) !== null && _d !== void 0 ? _d : true))
                return false;
            break;
        case 'TXT':
            if (remoteRecord.content !== configRecord.content)
                return false;
            if (remoteRecord.ttl !== configRecord.ttl)
                return false;
            break;
        case 'MX':
            if (remoteRecord.content !== configRecord.mailServer)
                return false;
            if (remoteRecord.priority !== configRecord.priority)
                return false;
            break;
    }
    return true;
};
exports.sameRecord = sameRecord;
const recordContent = (record) => {
    switch (record.type) {
        case 'A':
            return record.ipv4;
        case 'AAAA':
            return record.ipv6;
        case 'TXT':
            return record.content;
        case 'MX':
            return record.mailServer;
    }
    // return absurd(record)
    return 'OH NO';
};
exports.recordContent = recordContent;
const recordTTL = (record) => {
    var _c;
    if (record.type === 'TXT') {
        return (_c = record.ttl) !== null && _c !== void 0 ? _c : 1;
    }
    return 1;
};
exports.recordTTL = recordTTL;
const printRemoteRecord = (record, full = false) => {
    const name = full ? `${record.name}.` : exports.niceRecordName(record);
    return `${name}\t${record.ttl}\tIN\t${record.type}\t${record.priority !== undefined ? `${record.priority} ` : ''}${record.content}${record.type === 'MX' ? '.' : ''}`;
};
exports.printRemoteRecord = printRemoteRecord;
const printConfigRecord = (record, zone, full = false) => {
    const fullName = `${record.name === '@' ? zone : `${record.name}.${zone}`}.`;
    const name = full ? fullName : record.name;
    let content = exports.recordContent(record);
    const ttl = exports.recordTTL(record);
    switch (record.type) {
        case 'TXT':
            content = `"${content}"`;
            break;
        case 'MX':
            content = `${record.priority} ${content}.`;
            break;
    }
    return `${name}\t${ttl}\tIN\t${record.type}\t${content}`;
};
exports.printConfigRecord = printConfigRecord;
const partitionRecords = (remote, local, comparator) => {
    const toBeDeleted = remote.filter((rec) => local.findIndex((possiblySameRec) => comparator(rec, possiblySameRec)) ===
        -1);
    const toBeKept = remote.filter((rec) => local.findIndex((possiblySameRec) => comparator(rec, possiblySameRec)) !==
        -1);
    const toBeAdded = local.filter((rec) => remote.findIndex((possiblySameRec) => comparator(possiblySameRec, rec)) === -1);
    return { toBeDeleted, toBeKept, toBeAdded };
};
exports.partitionRecords = partitionRecords;


/***/ }),

/***/ 4063:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(2186));
// import * as github from '@actions/github'
const process_1 = __nccwpck_require__(1765);
const hjson_1 = __importDefault(__nccwpck_require__(24));
const fs_1 = __importDefault(__nccwpck_require__(5747));
const cloudflare_1 = __importDefault(__nccwpck_require__(5277));
const helpers_1 = __nccwpck_require__(650);
// eslint-disable-next-line @typescript-eslint/no-var-requires
__nccwpck_require__(2437).config();
const inputOrEnv = (inputName, envName) => {
    const input = core.getInput(inputName);
    if (input !== '')
        return input;
    const env = process.env[envName];
    return env;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const ZONE = inputOrEnv('zone', 'ZONE');
    if (ZONE === undefined) {
        console.log('Zone not set. Make sure to provide one in the GitHub action.');
        core.setFailed('Zone not set.');
        process_1.exit(-1);
    }
    //   const time = (new Date()).toTimeString();
    ///   core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
    const TOKEN = inputOrEnv('cloudflareToken', 'CLOUDFLARE_TOKEN');
    if (TOKEN === undefined) {
        console.log('Cloudflare token not found. Make sure to add one in GitHub environments.');
        core.setFailed('Cloudflare token not found.');
        process_1.exit(-1);
    }
    const cf = new cloudflare_1.default({
        token: TOKEN,
    });
    const DRY_RUN = Boolean(process.env.DRY_RUN);
    const rawText = fs_1.default.readFileSync('./DNS-RECORDS.hjson').toString();
    const config = hjson_1.default.parse(rawText);
    // Find the right zone
    let zoneId = '';
    try {
        const response = yield cf.zones.browse();
        const zones = response.result;
        const theZones = zones
            .filter((zone) => zone.name === ZONE)
            .map((zone) => zone.id);
        if (theZones.length === 0) {
            console.log(`No zones found with name: ${ZONE}.`);
            console.log('Make sure you have it right in DNS-RECORDS.hjson.');
            core.setFailed('Zone not found.');
            process_1.exit(-1);
        }
        zoneId = theZones[0];
    }
    catch (err) {
        console.log(err);
        core.setFailed(err);
        process_1.exit(-1);
    }
    // Check which records need to be deleted, kept, or added
    const currentRecords = (yield cf.dnsRecords.browse(zoneId)).result;
    const { toBeDeleted, toBeKept, toBeAdded } = helpers_1.partitionRecords(currentRecords, config.records, helpers_1.sameRecord);
    console.log('Records that will be deleted:');
    yield Promise.all(toBeDeleted.map((rec) => __awaiter(void 0, void 0, void 0, function* () {
        if (!DRY_RUN) {
            try {
                yield cf.dnsRecords.del(zoneId, rec.id);
                console.log('✔ ', helpers_1.printRemoteRecord(rec));
            }
            catch (err) {
                console.log('❌ ', helpers_1.printRemoteRecord(rec));
                console.log(err);
            }
        }
    })));
    console.log('Records that will be kept:');
    toBeKept.forEach((rec) => {
        console.log('✔ ', helpers_1.printRemoteRecord(rec));
    });
    console.log('Records that will be added:');
    yield Promise.all(toBeAdded.map((rec) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!DRY_RUN) {
            try {
                const content = helpers_1.recordContent(rec);
                switch (rec.type) {
                    case 'A':
                    case 'AAAA':
                        yield cf.dnsRecords.add(zoneId, {
                            type: rec.type,
                            name: rec.name,
                            content,
                            ttl: 1,
                            proxied: (_a = rec.proxied) !== null && _a !== void 0 ? _a : true,
                        });
                        break;
                    case 'TXT':
                        yield cf.dnsRecords.add(zoneId, {
                            type: rec.type,
                            name: rec.name,
                            content,
                            ttl: (_b = rec.ttl) !== null && _b !== void 0 ? _b : 1,
                        });
                        break;
                    case 'MX':
                        yield cf.dnsRecords.add(zoneId, {
                            type: rec.type,
                            name: rec.name,
                            content: rec.mailServer,
                            priority: rec.priority,
                            ttl: (_c = rec.ttl) !== null && _c !== void 0 ? _c : 1,
                        });
                        break;
                    default:
                        // absurd(rec)
                        break;
                }
                console.log('✔ ', helpers_1.printConfigRecord(rec, ZONE));
            }
            catch (err) {
                console.log('❌ ', helpers_1.printConfigRecord(rec, ZONE));
                console.log(err);
            }
        }
    })));
    // make sure it errors out if something is missing
    // add some tests for niceName, sameRec
    // make typescript
    // make sure to allow for DNS only or cached
});
main();
// make into a github action, And make this repo into a template with just a hjson and the github action and env setup


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 9690:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __nccwpck_require__(8614);
const debug_1 = __importDefault(__nccwpck_require__(8237));
const promisify_1 = __importDefault(__nccwpck_require__(6570));
const debug = debug_1.default('agent-base');
function isAgent(v) {
    return Boolean(v) && typeof v.addRequest === 'function';
}
function isSecureEndpoint() {
    const { stack } = new Error();
    if (typeof stack !== 'string')
        return false;
    return stack.split('\n').some(l => l.indexOf('(https.js:') !== -1 || l.indexOf('node:https:') !== -1);
}
function createAgent(callback, opts) {
    return new createAgent.Agent(callback, opts);
}
(function (createAgent) {
    /**
     * Base `http.Agent` implementation.
     * No pooling/keep-alive is implemented by default.
     *
     * @param {Function} callback
     * @api public
     */
    class Agent extends events_1.EventEmitter {
        constructor(callback, _opts) {
            super();
            let opts = _opts;
            if (typeof callback === 'function') {
                this.callback = callback;
            }
            else if (callback) {
                opts = callback;
            }
            // Timeout for the socket to be returned from the callback
            this.timeout = null;
            if (opts && typeof opts.timeout === 'number') {
                this.timeout = opts.timeout;
            }
            // These aren't actually used by `agent-base`, but are required
            // for the TypeScript definition files in `@types/node` :/
            this.maxFreeSockets = 1;
            this.maxSockets = 1;
            this.maxTotalSockets = Infinity;
            this.sockets = {};
            this.freeSockets = {};
            this.requests = {};
            this.options = {};
        }
        get defaultPort() {
            if (typeof this.explicitDefaultPort === 'number') {
                return this.explicitDefaultPort;
            }
            return isSecureEndpoint() ? 443 : 80;
        }
        set defaultPort(v) {
            this.explicitDefaultPort = v;
        }
        get protocol() {
            if (typeof this.explicitProtocol === 'string') {
                return this.explicitProtocol;
            }
            return isSecureEndpoint() ? 'https:' : 'http:';
        }
        set protocol(v) {
            this.explicitProtocol = v;
        }
        callback(req, opts, fn) {
            throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
        }
        /**
         * Called by node-core's "_http_client.js" module when creating
         * a new HTTP request with this Agent instance.
         *
         * @api public
         */
        addRequest(req, _opts) {
            const opts = Object.assign({}, _opts);
            if (typeof opts.secureEndpoint !== 'boolean') {
                opts.secureEndpoint = isSecureEndpoint();
            }
            if (opts.host == null) {
                opts.host = 'localhost';
            }
            if (opts.port == null) {
                opts.port = opts.secureEndpoint ? 443 : 80;
            }
            if (opts.protocol == null) {
                opts.protocol = opts.secureEndpoint ? 'https:' : 'http:';
            }
            if (opts.host && opts.path) {
                // If both a `host` and `path` are specified then it's most
                // likely the result of a `url.parse()` call... we need to
                // remove the `path` portion so that `net.connect()` doesn't
                // attempt to open that as a unix socket file.
                delete opts.path;
            }
            delete opts.agent;
            delete opts.hostname;
            delete opts._defaultAgent;
            delete opts.defaultPort;
            delete opts.createConnection;
            // Hint to use "Connection: close"
            // XXX: non-documented `http` module API :(
            req._last = true;
            req.shouldKeepAlive = false;
            let timedOut = false;
            let timeoutId = null;
            const timeoutMs = opts.timeout || this.timeout;
            const onerror = (err) => {
                if (req._hadError)
                    return;
                req.emit('error', err);
                // For Safety. Some additional errors might fire later on
                // and we need to make sure we don't double-fire the error event.
                req._hadError = true;
            };
            const ontimeout = () => {
                timeoutId = null;
                timedOut = true;
                const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
                err.code = 'ETIMEOUT';
                onerror(err);
            };
            const callbackError = (err) => {
                if (timedOut)
                    return;
                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                onerror(err);
            };
            const onsocket = (socket) => {
                if (timedOut)
                    return;
                if (timeoutId != null) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                if (isAgent(socket)) {
                    // `socket` is actually an `http.Agent` instance, so
                    // relinquish responsibility for this `req` to the Agent
                    // from here on
                    debug('Callback returned another Agent instance %o', socket.constructor.name);
                    socket.addRequest(req, opts);
                    return;
                }
                if (socket) {
                    socket.once('free', () => {
                        this.freeSocket(socket, opts);
                    });
                    req.onSocket(socket);
                    return;
                }
                const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
                onerror(err);
            };
            if (typeof this.callback !== 'function') {
                onerror(new Error('`callback` is not defined'));
                return;
            }
            if (!this.promisifiedCallback) {
                if (this.callback.length >= 3) {
                    debug('Converting legacy callback function to promise');
                    this.promisifiedCallback = promisify_1.default(this.callback);
                }
                else {
                    this.promisifiedCallback = this.callback;
                }
            }
            if (typeof timeoutMs === 'number' && timeoutMs > 0) {
                timeoutId = setTimeout(ontimeout, timeoutMs);
            }
            if ('port' in opts && typeof opts.port !== 'number') {
                opts.port = Number(opts.port);
            }
            try {
                debug('Resolving socket for %o request: %o', opts.protocol, `${req.method} ${req.path}`);
                Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
            }
            catch (err) {
                Promise.reject(err).catch(callbackError);
            }
        }
        freeSocket(socket, opts) {
            debug('Freeing socket %o %o', socket.constructor.name, opts);
            socket.destroy();
        }
        destroy() {
            debug('Destroying agent %o', this.constructor.name);
        }
    }
    createAgent.Agent = Agent;
    // So that `instanceof` works correctly
    createAgent.prototype = createAgent.Agent.prototype;
})(createAgent || (createAgent = {}));
module.exports = createAgent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6570:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function promisify(fn) {
    return function (req, opts) {
        return new Promise((resolve, reject) => {
            fn.call(this, req, opts, (err, rtn) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rtn);
                }
            });
        });
    };
}
exports.default = promisify;
//# sourceMappingURL=promisify.js.map

/***/ }),

/***/ 8511:
/***/ (function(module) {

(function() {
  var auto, copyProps, defProp, getDesc, mkAuto, named,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  module.exports = auto = function(cons) {
    return mkAuto(cons);
  };

  mkAuto = function(cons, name, copier) {
    var cls, create;
    if (name == null) {
      name = cons.name;
    }
    if (copier == null) {
      copier = copyProps;
    }
    if (/^class/.test(cons.toString())) {
      cls = copier(cons, named(name, cons, function() {
        var args, cc;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (this instanceof cls || !(cc = cls.prototype.__class_call__)) {
          return new (cons.bind.apply(cons, [cons].concat(args)));
        } else {
          return cc.apply(cls.prototype, arguments);
        }
      }));
    } else {
      cls = copier(cons, named(name, cons, function() {
        var cc, inst, ret;
        if (this instanceof cls) {
          return cons.apply(this, arguments);
        } else if (cc = cls.prototype.__class_call__) {
          return cc.apply(cls.prototype, arguments);
        } else {
          inst = new create();
          ret = cons.apply(inst, arguments);
          if (Object(ret) === ret) {
            return ret;
          } else {
            return inst;
          }
        }
      }));
      (create = function() {}).prototype = cls.prototype;
    }
    return cls;
  };

  getDesc = Object.getOwnPropertyDescriptor;

  defProp = Object.defineProperty;

  copyProps = function(src, dst) {
    var d, i, k, keys, len, ref, ref1, v;
    keys = [].concat((ref1 = typeof Object.getOwnPropertyNames === "function" ? Object.getOwnPropertyNames(src) : void 0) != null ? ref1 : []).concat((ref = typeof Object.getOwnPropertySymbols === "function" ? Object.getOwnPropertySymbols(src) : void 0) != null ? ref : []);
    if (keys.length && (getDesc != null) && (defProp != null)) {
      for (i = 0, len = keys.length; i < len; i++) {
        k = keys[i];
        d = getDesc(dst, k);
        if ((d != null ? d.configurable : void 0) === false) {
          if (d.writable) {
            dst[k] = src[k];
          }
          continue;
        }
        try {
          defProp(dst, k, getDesc(src, k));
        } catch (_error) {}
      }
    } else {
      for (k in src) {
        if (!hasProp.call(src, k)) continue;
        v = src[k];
        dst[k] = v;
      }
      dst.prototype = src.prototype;
    }
    if (dst.__proto__ !== src.__proto__) {
      try {
        dst.__proto__ = src.__proto__;
      } catch (_error) {}
    }
    dst.prototype.constructor = dst;
    return dst;
  };

  auto.subclass = function(name, base, props) {
    if (typeof name === "function") {
      props = base;
      base = name;
      name = base.name;
    }
    return mkAuto(base, name, function(src, dst) {
      dst.prototype = Object.create(base.prototype, props);
      dst.prototype.constructor = dst;
      dst.__proto__ = src;
      return dst;
    });
  };

  named = function(name, src, dst) {
    var args, body, i, j, len, prop, ref, ref1, results;
    src = {
      name: name,
      length: src.length
    };
    ref = ['name', 'length'];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      if (dst[prop] !== src[prop]) {
        try {
          dst[prop] = src[prop];
        } catch (_error) {}
      }
      if (dst[prop] !== src[prop]) {
        try {
          Object.defineProperty(dst, prop, {
            value: src[prop]
          });
        } catch (_error) {}
      }
    }
    if (dst.name !== name || dst.length !== src.length) {
      args = "";
      if (src.length) {
        args = "arg" + (function() {
          results = [];
          for (var j = 1, ref1 = src.length; 1 <= ref1 ? j <= ref1 : j >= ref1; 1 <= ref1 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this).join(', arg');
      }
      try {
        dst = new Function('$$' + name, body = ("return function NAME(" + args + ") {\n    return $$NAME.apply(this, arguments);\n}").replace(/NAME/g, name))(dst);
      } catch (_error) {}
    }
    return dst;
  };

}).call(this);


/***/ }),

/***/ 6582:
/***/ ((module) => {

"use strict";


module.exports = Error.captureStackTrace || function (error) {
	var container = new Error();

	Object.defineProperty(error, 'stack', {
		configurable: true,
		get: function getStack() {
			var stack = container.stack;

			Object.defineProperty(this, 'stack', {
				value: stack
			});

			return stack;
		}
	});
};


/***/ }),

/***/ 5277:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Client = __nccwpck_require__(3549);
const proxy = __nccwpck_require__(2601);

/* eslint-disable global-require */
const resources = {
  dnsRecords: __nccwpck_require__(562),
  enterpriseZoneWorkersScripts: __nccwpck_require__(3310),
  enterpriseZoneWorkersRoutes: __nccwpck_require__(6793),
  enterpriseZoneWorkersKVNamespaces: __nccwpck_require__(6391),
  enterpriseZoneWorkersKV: __nccwpck_require__(3607),
  ips: __nccwpck_require__(3061),
  zones: __nccwpck_require__(8074),
  zoneSettings: __nccwpck_require__(4383),
  zoneCustomHostNames: __nccwpck_require__(5150),
  zoneWorkers: __nccwpck_require__(8908),
  zoneWorkersScript: __nccwpck_require__(3142),
  zoneWorkersRoutes: __nccwpck_require__(5069),
  user: __nccwpck_require__(2643),
};
/* eslint-enable global-require */

/**
 * withEnvProxy configures an HTTPS proxy if required to reach the Cloudflare API.
 *
 * @private
 * @param {Object} opts - The current Cloudflare options
 */
const withEnvProxy = function withEnvProxy(opts) {
  /* eslint-disable no-process-env */
  const httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const noProxy = process.env.NO_PROXY || process.env.no_proxy;
  /* eslint-enable no-process-env */

  if (httpsProxy) {
    const agent = proxy.proxyAgent(
      httpsProxy,
      noProxy,
      'https://api.cloudflare.com'
    );

    if (agent) {
      opts.agent = agent;
    }
  }
};

/**
 * Constructs and returns a new Cloudflare API client with the specified authentication.
 *
 * @class Cloudflare
 * @param {Object} auth - The API authentication for an account
 * @param {string} auth.email - The account email address
 * @param {string} auth.key - The account API key
 * @param {string} auth.token - The account API token
 *
 * @property {DNSRecords} dnsRecords - DNS Records instance
 * @property {IPs} ips - IPs instance
 * @property {Zones} zones - Zones instance
 * @property {ZoneSettings} zoneSettings - Zone Settings instance
 * @property {ZoneCustomHostNames} zoneCustomHostNames - Zone Custom Host Names instance
 * @property {User} user - User instance
 */
const Cloudflare = auto(
  prototypal({
    constructor: function constructor(auth) {
      const opts = {
        email: auth && auth.email,
        key: auth && auth.key,
        token: auth && auth.token,
      };

      withEnvProxy(opts);

      const client = new Client(opts);

      Object.defineProperty(this, '_client', {
        value: client,
        writable: false,
        enumerable: false,
        configurable: false,
      });

      Object.keys(resources).forEach(function(resource) {
        Object.defineProperty(this, resource, {
          value: resources[resource](this._client), // eslint-disable-line security/detect-object-injection
          writable: true,
          enumerable: false,
          configurable: true,
        });
      }, this);
    },
  })
);

module.exports = Cloudflare;


/***/ }),

/***/ 3549:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const pkg = __nccwpck_require__(8615);
const Getter = __nccwpck_require__(6277);

const USER_AGENT = JSON.stringify({
  bindings_version: pkg.version, // eslint-disable-line camelcase
  lang: 'node',
  lang_version: process.version, // eslint-disable-line camelcase
  platform: process.platform,
  arch: process.arch,
  publisher: 'cloudflare',
});

const isPlainObject = function isPlainObject(x) {
  const prototype = Object.getPrototypeOf(x);
  const toString = Object.prototype.toString;

  return (
    toString.call(x) === '[object Object]' &&
    (prototype === null || prototype === Object.getPrototypeOf({}))
  );
};

const isUserServiceKey = function isUserServiceKey(x) {
  return x && x.substring(0, 5) === 'v1.0-';
};

module.exports = prototypal({
  constructor: function constructor(options) {
    this.email = options.email;
    this.key = options.key;
    this.token = options.token;
    this.getter = new Getter(options);
  },
  request(requestMethod, requestPath, data, opts) {
    const uri = `https://api.cloudflare.com/client/v4/${requestPath}`;
    const key = opts.auth.key || this.key;
    const token = opts.auth.token || this.token;
    const email = opts.auth.email || this.email;

    const options = {
      json: opts.json !== false,
      timeout: opts.timeout || 1e4,
      retries: opts.retries,
      method: requestMethod,
      headers: {
        'user-agent': `cloudflare/${pkg.version} node/${process.versions.node}`,
        'Content-Type': opts.contentType || 'application/json',
        Accept: 'application/json',
        'X-Cloudflare-Client-User-Agent': USER_AGENT,
      },
    };

    if (isUserServiceKey(key)) {
      options.headers['X-Auth-User-Service-Key'] = key;
    } else if (key) {
      options.headers['X-Auth-Key'] = key;
      options.headers['X-Auth-Email'] = email;
    } else if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (requestMethod === 'GET') {
      options.query = data;
    } else {
      options.body = data;
    }

    if (
      options.body &&
      (isPlainObject(options.body) || Array.isArray(options.body))
    ) {
      options.body = JSON.stringify(options.body);
    }

    return this.getter.got(uri, options).then(res => res.body);
  },
});


/***/ }),

/***/ 6277:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const assign = __nccwpck_require__(7426);
const got = __nccwpck_require__(3798);

module.exports = prototypal({
  constructor: function constructor(options) {
    this._agent = options.agent;
  },
  got(uri, options) {
    options = assign({}, options);
    options.agent = this._agent;

    return got(uri, options);
  },
});


/***/ }),

/***/ 1935:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const method = __nccwpck_require__(5033);

const BASIC_METHODS = {
  browse: method({
    method: 'GET',
  }),
  read: method({
    method: 'GET',
    path: ':id',
  }),
  edit: method({
    method: 'PATCH',
    path: ':id',
  }),
  add: method({
    method: 'POST',
  }),
  del: method({
    method: 'DELETE',
    path: ':id',
  }),
};

/**
 * Resource generates basic methods defined on subclasses. It is not intended to
 * be constructed directly.
 *
 * @class Resource
 * @private
 */
module.exports = prototypal(
  /** @lends Resource.prototype */
  {
    constructor: function constructor(client) {
      Object.defineProperty(this, '_client', {
        value: client,
        writable: false,
        enumerable: false,
        configurable: false,
      });

      if (Array.isArray(this.includeBasic)) {
        this.includeBasic.forEach(function(basicMethod) {
          Object.defineProperty(this, basicMethod, {
            value: BASIC_METHODS[basicMethod], // eslint-disable-line security/detect-object-injection
            writable: true,
            enumberable: false,
            configurable: true,
          });
        }, this);
      }
    },
    /**
     * @param {string} methodPath - The path from the {@link method} that should be
     *        joined with the resource's path.
     */
    createFullPath(methodPath) {
      return (methodPath && [this.path, methodPath].join('/')) || this.path;
    },
    path: '',
    hasBrokenPatch: false,
  }
);


/***/ }),

/***/ 5033:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const URLPattern = __nccwpck_require__(8549);

const options = ['key', 'email', 'token'];

const isPlainObject = function isPlainObject(x) {
  const prototype = Object.getPrototypeOf(x);
  const toString = Object.prototype.toString;

  return (
    toString.call(x) === '[object Object]' &&
    (prototype === null || prototype === Object.getPrototypeOf({}))
  );
};

const isOptionsHash = function isOptionsHash(obj) {
  const hasProp = function(acc, option) {
    if (acc) {
      return acc;
    }

    return Object.prototype.hasOwnProperty.call(obj, option);
  };

  return isPlainObject(obj) && options.reduce(hasProp, false);
};

const getDataFromArgs = function getDataFromArgs(args) {
  if (args.length > 0) {
    if (!isOptionsHash(args[0])) {
      return args.shift();
    }
  }

  return {};
};

const getOptionsFromArgs = function getOptionsFromArgs(args) {
  const opts = {
    auth: {},
    headers: {},
  };

  if (args.length > 0) {
    const arg = args[args.length - 1];

    if (isOptionsHash(arg)) {
      const params = args.pop();

      if (params.key) {
        opts.auth.key = params.key;
      }

      if (params.email) {
        opts.auth.email = params.email;
      }
    }
  }

  return opts;
};

const identity = function identity(x) {
  return x;
};

module.exports = function(spec) {
  const requestMethod = (spec.method || 'GET').toUpperCase();
  const encode = spec.encode || identity;
  const json = spec.json !== false;
  const contentType = spec.contentType || 'application/json';

  return function() {
    const fullPath = this.createFullPath(spec.path);
    const urlPattern = new URLPattern(fullPath);
    const urlParams = urlPattern.names;
    let err;
    const args = Array.prototype.slice.call(arguments);
    const urlData = {};

    for (let i = 0, length = urlParams.length; i < length; i++) {
      const arg = args[0];

      const param = urlParams[i]; // eslint-disable-line security/detect-object-injection

      if (!arg) {
        /* eslint-disable security/detect-object-injection */
        err = new Error(
          `Cloudflare: Argument "${
            urlParams[i]
          }" required, but got: ${arg} (on API request to ${requestMethod} ${fullPath})`
        );
        /* eslint-enable security/detect-object-injection */

        return Promise.reject(err);
      }

      urlData[param] = args.shift(); // eslint-disable-line security/detect-object-injection
    }

    const data = encode(getDataFromArgs(args));
    const opts = getOptionsFromArgs(args);

    opts.json = json;
    opts.contentType = contentType;

    if (args.length !== 0) {
      err = new Error(
        `Cloudflare: Unknown arguments (${args}). Did you mean to pass an options object? (on API request to ${requestMethod} ${fullPath})`
      );

      return Promise.reject(err);
    }

    const requestPath = urlPattern.stringify(urlData);

    if (requestMethod !== 'PATCH' || !this.hasBrokenPatch) {
      return this._client.request(requestMethod, requestPath, data, opts);
    }

    const patched = Object.keys(data);

    const sendPatch = function sendPatch() {
      const patch = patched.pop();
      const datum = {};

      datum[patch] = data[patch]; // eslint-disable-line security/detect-object-injection

      // noinspection JSPotentiallyInvalidUsageOfThis
      return this._client
        .request(requestMethod, requestPath, datum, opts)
        .then(response => {
          if (patched.length > 0) {
            return sendPatch.call(this);
          }

          return response;
        });
    };

    return sendPatch.call(this);
  };
};


/***/ }),

/***/ 2601:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const shouldProxy = __nccwpck_require__(5882);
const HttpsProxyAgent = __nccwpck_require__(7219);

/**
 * proxyAgent returns an HTTPS agent to use to access the base URL.
 *
 * @private
 * @param {string} httpsProxy - HTTPS Proxy URL
 * @param {string} noProxy - URLs that should be excluded from proxying
 * @param {string} base - The client base URL
 * @returns {https.Agent|null} - The HTTPS agent, if required to access the base URL.
 */
const proxyAgent = function proxyAgent(httpsProxy, noProxy, base) {
  if (!httpsProxy) {
    return null;
  }
  noProxy = noProxy || '';

  const ok = shouldProxy(base, {
    no_proxy: noProxy, // eslint-disable-line camelcase
  });

  if (!ok) {
    return null;
  }

  return new HttpsProxyAgent(httpsProxy);
};

module.exports.proxyAgent = proxyAgent;


/***/ }),

/***/ 562:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * DNSRecords represents the /zones/:zoneID/dns_records API endpoint.
 *
 * @class DNSRecords
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/dns_records',

    includeBasic: ['browse', 'read', 'add', 'del'],

    /**
     * edit allows for modification of the specified DNS Record
     *
     * @function edit
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The DNS record ID being modified
     * @param {Object} record - The modified dns record object
     * @returns {Promise<Object>} The DNS record object.
     */
    edit: method({
      method: 'PUT',
      path: ':id',
    }),

    /**
     * export retrieves all of a zone's DNS Records in BIND configuration format.
     *
     * @function export
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @returns {Promise<Object>} The DNS browser response object.
     */
    export: method({
      method: 'GET',
      path: 'export',
      json: false,
    }),

    /**
     * browse allows for listing all DNS Records for a zone
     *
     * @function browse
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @returns {Promise<Object>} The DNS browser response object.
     */
    /**
     * read allows for retrieving the specified DNS Record
     *
     * @function read
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The DNS record ID
     * @returns {Promise<Object>} The DNS record object.
     */
    /**
     * add allows for creating a new DNS record for a zone.
     *
     * @function add
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {Object} record - The new DNS record object
     * @returns {Promise<Object>} The created DNS record object.
     */
    /**
     * del allows for deleting the specified DNS Record
     *
     * @function del
     * @memberof DNSRecords
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The DNS record ID to delete
     * @returns {Promise<Object>} The deleted DNS record object.
     */
  })
);


/***/ }),

/***/ 3607:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * EnterpriseZoneWorkersKV represents the accounts/:accountId/storage/kv/namespaces API endpoint.
 *
 * @class EnterpriseZoneWorkersKV
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'accounts/:accountId/storage/kv/namespaces/:namespaceId',

    /**
     * browse allows for listing all the keys of a namespace
     *
     * @function browse
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @returns {Promise<Object>} The KV response object.
     */
    browse: method({
      method: 'GET',
      path: 'keys',
    }),
    /**
     * add allows for creating a key-value pair in a namespace
     *
     * @function add
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @param {string} value - The value to store
     * @returns {Promise<Object>} The KV response object
     */
    add: method({
      method: 'PUT',
      path: 'values/:id',
    }),
    /**
     * read allows for reading the contents of key in a namespace
     *
     * @function read
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @param {string} key_name - The key name
     * @returns {Promise<Object>} The KV response object
     */
    read: method({
      method: 'GET',
      path: 'values/:id',
      json: false,
      contentType: 'text/plain',
    }),
    /**
     * del allows for deleting a key and its contents in a namespace
     *
     * @function del
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @param {string} key_name - The key name
     * @returns {Promise<Object>} The KV response object
     */
    del: method({
      method: 'DELETE',
      path: 'values/:id',
    }),
    /**
     * addMulti allows for creating multiple key-value pairs in a namespace
     *
     * @function addMulti
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @param {Array<Object>} data - An array containing key-vaue pair Objects to add
     * @returns {Promise<Object>} The KV response object
     */
    addMulti: method({
      method: 'PUT',
      path: 'bulk',
    }),
    /**
     * delMulti allows for deleting multiple key-value pairs in a namespace
     *
     * @function delMulti
     * @memberof EnterpriseZoneWorkersKV
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} namespace_id - The namespace ID
     * @param {Array<String>} data - The array with keys to delete
     * @returns {Promise<Object>} The KV response object
     */
    delMulti: method({
      method: 'DELETE',
      path: 'bulk',
    }),
  })
);


/***/ }),

/***/ 6391:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * EnterpriseZoneWorkersKVNamespaces represents the accounts/:accountId/storage/kv/namespaces API endpoint.
 *
 * @class EnterpriseZoneWorkersKVNamespaces
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'accounts/:accountId/storage/kv/namespaces',

    includeBasic: ['browse', 'add', 'del'],

    /**
     * browse allows for listing all of a zone's workers namespaces
     *
     * @function browse
     * @memberof EnterpriseZoneWorkersKVNamespaces
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @returns {Promise<Object>} The namespace response object.
     */
    /**
     * add allows for creating a workers namespace
     *
     * @function add
     * @memberof EnterpriseZoneWorkersKVNamespaces
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {Object} config - The namespace object
     * @returns {Promise<Object>} The namespace response object.
     */
    /**
     * del allows for deleting a workers namespace
     *
     * @function del
     * @memberof EnterpriseZoneWorkersKVNamespaces
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} id - The namespace id
     * @returns {Promise<Object>} The namespace response object.
     */
    /**
     * edit allows for renaming a workers namespace
     *
     * @function edit
     * @memberof EnterpriseZoneWorkersKVNamespaces
     * @instance
     * @async
     * @param {string} account_id - The account ID
     * @param {string} id - The namespace id
     * @param {Object} config - The namespace object
     * @returns {Promise<Object>} The namespace response object.
     */
    edit: method({
      method: 'PUT',
      path: ':id',
    }),
  })
);


/***/ }),

/***/ 6793:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * EnterpriseZoneWorkersRoutes represents the zones/:zoneId/workers/routes API endpoint.
 *
 * @class EnterpriseZoneWorkersRoutes
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/workers/routes',

    includeBasic: ['browse', 'read', 'add', 'del'],

    /**
     * browse allows for listing all of a zone's workers routes
     *
     * @function browse
     * @memberof EnterpriseZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @returns {Promise<Object>} The route browse response object.
     */
    /**
     * read allows for retrieving a specific zone's workers route
     *
     * @function read
     * @memberof EnterpriseZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID
     * @returns {Promise<Object>} The route response object.
     */
    /**
     * edit allows for modifying a specific zone's workers
     *
     * @function edit
     * @memberof EnterpriseZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID
     * @param {Object} config - The modified route object
     * @returns {Promise<Object>} The custom hostname response object.
     */
    edit: method({
      method: 'PUT',
      path: ':id',
    }),
    /**
     * add allows for creating a workers route
     *
     * @function add
     * @memberof EnterpriseZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {Object} config - The new route object
     * @returns {Promise<Object>} The custom route response object.
     */
    /**
     * del allows for removing a workers routes
     *
     * @function del
     * @memberof EnterpriseZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID to delete
     * @returns {Promise<Object>} The custom route response object.
     */
  })
);


/***/ }),

/***/ 3310:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * EnterpriseZoneWorkersScripts represents the accounts/:accountId/workers/scripts API endpoint.
 *
 * @class EnterpriseZoneWorkersScripts
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'accounts/:accountId/workers/scripts',

    includeBasic: ['browse', 'del'],

    /**
     * read retrieves a single workers script
     *
     * @function read
     * @memberof EnterpriseZoneWorkersScripts
     * @instance
     * @async
     * @param {string} account_id - The enterprise account ID
     * @param {string} name - The script name
     * @returns {Promise<Object>} The workers script response object.
     */
    read: method({
      method: 'GET',
      path: ':name',
      json: false,
    }),

    /**
     * edit uploads a new version of a workers script
     *
     * @function edit
     * @memberof EnterpriseZoneWorkersScripts
     * @instance
     * @async
     * @param {string} account_id - The enterprise account ID
     * @param {string} name - The script name
     * @param {string} script - The script
     * @returns {Promise<Object>} The response object
     */
    edit: method({
      method: 'PUT',
      path: ':name',
      contentType: 'application/javascript',
    }),

    /**
     * browse allows for listing all the workers scripts
     *
     * @function browse
     * @memberof EnterpriseZoneWorkersScripts
     * @instance
     * @async
     * @param {string} account_id - The enterprise account ID
     * @param {string} name - The script name
     * @returns {Promise<Object>} The zone workers script response object.
     */
    /**
     * del allows for deleting the specified workers script
     *
     * @function del
     * @memberof EnterpriseZoneWorkersScripts
     * @instance
     * @async
     * @param {string} account_id - The enterprise account ID
     * @param {string} name - The script name
     * @returns {Promise<Object>} The deleted zone workers script response object.
     */
  })
);


/***/ }),

/***/ 3061:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);

/**
 * IPs represents the /ips API endpoint.
 *
 * @class IPs
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'ips',

    includeBasic: ['browse'],

    /**
     * browse returns a Promise of the current Cloudflare IPv4 and IPv6 addresses.
     *
     * @function browse
     * @memberof IPs
     * @instance
     * @async
     * @returns {Promise<Object>} The IPv4 and IPv6 addresses
     * @example
     * // logs the fetched IP addresses
     * cf.ips.browse(console.log)
     */
  })
);


/***/ }),

/***/ 2643:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * User represents the /user API endpoint.
 *
 * @class User
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'user',

    /**
     * read returns the current user object
     *
     * @function read
     * @memberof User
     * @instance
     * @async
     * @returns {Promise<Object>} The user object
     */
    read: method({
      method: 'GET',
    }),

    /**
     * edit allows for modification of the current user
     *
     * @function edit
     * @memberof User
     * @instance
     * @async
     * @param {Object} user - The modified user object
     * @returns {Promise<Object>} The user object
     */
    edit: method({
      method: 'PATCH',
    }),
  })
);


/***/ }),

/***/ 5150:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);

/**
 * ZoneCustomHostNames represents the /zones/:zoneID/custom_hostnames API endpoint.
 *
 * @class ZoneCustomHostNames
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/custom_hostnames',

    includeBasic: ['browse', 'read', 'edit', 'add', 'del'],

    /**
     * browse allows for listing all of a zone's custom hostanames
     *
     * @function browse
     * @memberof ZoneCustomHostNames
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @returns {Promise<Object>} The custom hostname browse response object.
     */
    /**
     * read allows for retrieving a specific custom hostname
     *
     * @function read
     * @memberof ZoneCustomHostNames
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The custom hostname ID
     * @returns {Promise<Object>} The custom hostname response object.
     */
    /**
     * edit allows for modifying a specific zone
     *
     * @function edit
     * @memberof ZoneCustomHostNames
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The custom hostname ID
     * @param {Object} config - The modified custom hostname object
     * @returns {Promise<Object>} The custom hostname response object.
     */
    /**
     * add allows for creating a new zone
     *
     * @function add
     * @memberof ZoneCustomHostNames
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {Object} config - The new custom hostname object
     * @returns {Promise<Object>} The custom hostname response object.
     */
    /**
     * del allows for removing a new zone
     *
     * @function del
     * @memberof ZoneCustomHostNames
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The custom hostname ID to delete
     * @returns {Promise<Object>} The custom hostname response object.
     */
  })
);


/***/ }),

/***/ 4383:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * ZoneSettings represents the /zones/:zoneID/settings API endpoint.
 *
 * @class ZoneSettings
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/settings',

    includeBasic: ['browse', 'read', 'edit'],

    /**
     * editAll allows for editing of all the zone settings at once
     *
     * @function editAll
     * @memberof ZoneSettings
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @param {Object} settings - The modified zone settings
     * @returns {Promise<Object>} The response object
     */
    editAll: method({
      method: 'PATCH',
    }),

    /**
     * browse allows for listing all the zone settings
     *
     * @function browse
     * @memberof ZoneSettings
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @returns {Promise<Object>} The zone settings response object.
     */
    /**
     * read retrieves a single zone setting
     *
     * @function read
     * @memberof ZoneSettings
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @param {string} setting = The setting name
     * @returns {Promise<Object>} The zone settings response object.
     */
    /**
     * edit modifies a single zone setting
     *
     * @function edit
     * @memberof ZoneSettings
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @param {string} setting = The setting name
     * @param {string|Object} value - The new zone setting
     * @returns {Promise<Object>} The zone settings response object.
     */
  })
);


/***/ }),

/***/ 8908:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * ZoneWorkers represents the /zones/:zoneId/workers API endpoint.
 *
 * @class ZoneWorkers
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/workers',

    /**
     * validate allows for validating a workers script
     *
     * @function validate
     * @memberof ZoneWorkers
     * @instance
     * @async
     * @param {string} zoneId - The zone ID
     * @param {string} script - The worker script
     * @returns {Promise<Object>} The validate response object.
     */
    validate: method({
      method: 'PUT',
      path: 'validate',
      contentType: 'application/javascript',
    }),
  })
);


/***/ }),

/***/ 5069:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * ZoneWorkersRoutes represents the zones/:zoneId/workers/filters API endpoint.
 *
 * @class ZoneWorkersRoutes
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/workers/filters',

    includeBasic: ['browse', 'read', 'add', 'del'],

    /**
     * edit allows for modifying a specific zone's workers route
     *
     * @function edit
     * @memberof ZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID
     * @param {Object} config - The modified route object
     * @returns {Promise<Object>} The custom hostname response object.
     */
    edit: method({
      method: 'PUT',
      path: ':id',
    }),

    /**
     * browse allows for listing all of a zone's workers routes
     *
     * @function browse
     * @memberof ZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @returns {Promise<Object>} The route browse response object.
     */
    /**
     * read allows for retrieving a specific zone's workers route
     *
     * @function read
     * @memberof ZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID
     * @returns {Promise<Object>} The route response object.
     */
    /**
     * add allows for creating a workers route
     *
     * @function add
     * @memberof ZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {Object} config - The new route object
     * @returns {Promise<Object>} The custom route response object.
     */
    /**
     * del allows for removing a workers route
     *
     * @function del
     * @memberof ZoneWorkersRoutes
     * @instance
     * @async
     * @param {string} zone_id - The zone ID
     * @param {string} id - The route ID to delete
     * @returns {Promise<Object>} The custom route response object.
     */
  })
);


/***/ }),

/***/ 3142:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * ZoneWorkersScript represents the /zones/:zoneID/workers/script API endpoint.
 *
 * @class ZoneWorkersScript
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones/:zoneId/workers/script',

    /**
     * read retrieves a the current workers script
     *
     * @function read
     * @memberof ZoneWorkersScript
     * @instance
     * @async
     * @param {string} zone_id - The enterprise account ID
     * @returns {Promise<Object>} The workers script response object.
     */
    read: method({
      method: 'GET',
      json: false,
    }),

    /**
     * read retrieves a the current workers script
     *
     * @function read
     * @memberof ZoneWorkersScript
     * @instance
     * @async
     * @param {string} zone_id - The enterprise account ID
     * @param {string} script - The script
     * @returns {Promise<Object>} The workers script response object.
     */
    edit: method({
      method: 'PUT',
      contentType: 'application/javascript',
    }),

    /**
     * del allows for deleting the workers script
     *
     * @function del
     * @memberof ZoneWorkersScript
     * @instance
     * @async
     * @returns {Promise<Object>} The deleted zone workers script response object.
     */
    del: method({
      method: 'DELETE',
    }),
  })
);


/***/ }),

/***/ 8074:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*
 * Copyright (C) 2014-present Cloudflare, Inc.

 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */



const prototypal = __nccwpck_require__(8931);
const auto = __nccwpck_require__(8511);

const Resource = __nccwpck_require__(1935);
const method = __nccwpck_require__(5033);

/**
 * Zones represents the /zones API endpoint.
 *
 * @class Zones
 * @hideconstructor
 * @extends Resource
 */
module.exports = auto(
  prototypal({
    extends: Resource,
    path: 'zones',
    hasBrokenPatch: true,

    includeBasic: ['browse', 'read', 'edit', 'add', 'del'],

    /**
     * activationCheck initiates another zone activation check
     *
     * @function activationCheck
     * @memberof Zones
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @returns {Promise<Object>} The response object
     */
    activationCheck: method({
      method: 'PUT',
      path: ':id/activation_check',
    }),

    /**
     * purgeCache purges files from Cloudflare's cache
     *
     * @function purgeCache
     * @memberof Zones
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @param {Object} [params] - Parameters to restrict purges
     * @param {string[]|Object[]} [params.files] - Files to purge from the Cloudflare cache
     * @param {string[]} [params.tags] - Purge files served with these Cache-Tag headers
     * @param {string[]} [params.hosts] - Purge files that match these hosts
     * @returns {Promise<Object>} The response object
     */
    purgeCache: method({
      method: 'DELETE',
      path: ':id/purge_cache',
    }),

    /**
     * browse allows for listing all the zones
     *
     * @function browse
     * @memberof Zones
     * @instance
     * @async
     * @returns {Promise<Object>} The zone browse response object.
     */
    /**
     * read allows for retrieving a specific zone
     *
     * @function read
     * @memberof Zones
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @returns {Promise<Object>} The zone response object.
     */
    /**
     * edit allows for modifying a specific zone
     *
     * @function edit
     * @memberof Zones
     * @instance
     * @async
     * @param {string} id - The zone ID
     * @param {Object} zone - The modified zone object
     * @returns {Promise<Object>} The zone response object.
     */
    /**
     * add allows for creating a new zone
     *
     * @function add
     * @memberof Zones
     * @instance
     * @async
     * @param {Object} zone - The new zone object
     * @returns {Promise<Object>} The zone response object.
     */
    /**
     * del allows for removing a new zone
     *
     * @function del
     * @memberof Zones
     * @instance
     * @async
     * @param {string} id - The zone ID to delete
     * @returns {Promise<Object>} The zone response object.
     */
  })
);


/***/ }),

/***/ 4532:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

var captureStackTrace = __nccwpck_require__(6582);

function inherits(ctor, superCtor) {
	ctor.super_ = superCtor;
	ctor.prototype = Object.create(superCtor.prototype, {
		constructor: {
			value: ctor,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
}

module.exports = function createErrorClass(className, setup) {
	if (typeof className !== 'string') {
		throw new TypeError('Expected className to be a string');
	}

	if (/[^0-9a-zA-Z_$]/.test(className)) {
		throw new Error('className contains invalid characters');
	}

	setup = setup || function (message) {
		this.message = message;
	};

	var ErrorClass = function () {
		Object.defineProperty(this, 'name', {
			configurable: true,
			value: className,
			writable: true
		});

		captureStackTrace(this, this.constructor);

		setup.apply(this, arguments);
	};

	inherits(ErrorClass, Error);

	return ErrorClass;
};


/***/ }),

/***/ 8222:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 6243:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(900);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 8237:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(8222);
} else {
	module.exports = __nccwpck_require__(5332);
}


/***/ }),

/***/ 5332:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(3867);
const util = __nccwpck_require__(1669);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(9318);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 2437:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __nccwpck_require__(5747)
const path = __nccwpck_require__(5622)
const os = __nccwpck_require__(2087)

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\r\n|\n|\r/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

function resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ }),

/***/ 7994:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


var stream = __nccwpck_require__(2413);

function DuplexWrapper(options, writable, readable) {
  if (typeof readable === "undefined") {
    readable = writable;
    writable = options;
    options = null;
  }

  stream.Duplex.call(this, options);

  if (typeof readable.read !== "function") {
    readable = (new stream.Readable(options)).wrap(readable);
  }

  this._writable = writable;
  this._readable = readable;
  this._waiting = false;

  var self = this;

  writable.once("finish", function() {
    self.end();
  });

  this.once("finish", function() {
    writable.end();
  });

  readable.on("readable", function() {
    if (self._waiting) {
      self._waiting = false;
      self._read();
    }
  });

  readable.once("end", function() {
    self.push(null);
  });

  if (!options || typeof options.bubbleErrors === "undefined" || options.bubbleErrors) {
    writable.on("error", function(err) {
      self.emit("error", err);
    });

    readable.on("error", function(err) {
      self.emit("error", err);
    });
  }
}

DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});

DuplexWrapper.prototype._write = function _write(input, encoding, done) {
  this._writable.write(input, encoding, done);
};

DuplexWrapper.prototype._read = function _read() {
  var buf;
  var reads = 0;
  while ((buf = this._readable.read()) !== null) {
    this.push(buf);
    reads++;
  }
  if (reads === 0) {
    this._waiting = true;
  }
};

module.exports = function duplex2(options, writable, readable) {
  return new DuplexWrapper(options, writable, readable);
};

module.exports.DuplexWrapper = DuplexWrapper;


/***/ }),

/***/ 8931:
/***/ ((module) => {

/*!
Copyright (C) 2015 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var Class = Class || (function (Object) {
  'use strict';

  /*! (C) Andrea Giammarchi - MIT Style License */

  var
    // shortcuts for minifiers and ES3 private keywords too
    CONSTRUCTOR = 'constructor',
    EXTENDS = 'extends',
    IMPLEMENTS = 'implements',
    INIT = 'init',
    PROTOTYPE = 'prototype',
    STATIC = 'static',
    SUPER = 'super',
    TO_STRING = 'toString',
    VALUE = 'value',
    WITH = 'with',

    // infamous property used as fallback
    // for IE8 and lower only
    PROTO = '__proto__',

    // used to copy non enumerable properties on IE
    nonEnumerables = [
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      TO_STRING,
      'valueOf'
    ],

    // common shortcuts
    ObjectPrototype = Object[PROTOTYPE],
    hOP = ObjectPrototype[nonEnumerables[0]],
    toString = ObjectPrototype[TO_STRING],

    // Espruino 1.7x does not have (yet) Object.prototype.propertyIsEnumerable
    propertyIsEnumerable = ObjectPrototype[nonEnumerables[2]] || function (p) {
      for (var k in this) if (p === k) return hOP.call(this, p);
      return false;
    },

    // IE < 9 bug only
    hasIEEnumerableBug = !propertyIsEnumerable.call({toString: 0}, TO_STRING),

    // basic ad-hoc private fallback for old browsers
    // use es5-shim if you want a properly patched polyfill
    create = Object.create || function (proto) {
      /*jshint newcap: false */
      var isInstance = this instanceof create;
      create[PROTOTYPE] = isInstance ? createPrototype : (proto || ObjectPrototype);
      return isInstance ? this : new create();
    },

    // very old browsers actually work better
    // without assigning null as prototype
    createPrototype = create[PROTOTYPE],

    // redefined if not present
    defineProperty = Object.defineProperty,

    // redefined if not present
    gOPD = Object.getOwnPropertyDescriptor,

    // basic ad-hoc private fallback for old browsers
    // use es5-shim if you want a properly patched polyfill
    gOPN = Object.getOwnPropertyNames || function (object) {
        var names = [], i, key;
        for (key in object) {
          if (hOP.call(object, key)) {
            names.push(key);
          }
        }
        if (hasIEEnumerableBug) {
          for (i = 0; i < nonEnumerables.length; i++) {
            key = nonEnumerables[i];
            if (hOP.call(object, key)) {
              names.push(key);
            }
          }
        }
        return names;
    },

    // basic ad-hoc private fallback for old browsers
    // returns empty Array if nonexistent
    gOPS = Object.getOwnPropertySymbols || function () {
      return [];
    },

    // needed to verify the existence
    getPrototypeOf = Object.getPrototypeOf,

    // needed to allow Classes as traits
    gPO = getPrototypeOf || function (o) {
      return o[PROTO] || null;
    },

    // equivalent of Reflect.ownKeys
    oK = function (o) {
      return gOPN(o).concat(gOPS(o));
    },

    // used to filter mixin  Symbol
    isArray = Array.isArray || function (a) {
      return toString.call(a) === '[object Array]';
    },

    // used to avoid setting `arguments` and other function properties
    // when public static are copied over
    nativeFunctionOPN = gOPN(function () {}).concat('arguments'),
    indexOf = nativeFunctionOPN.indexOf || function (v) {
      for (var i = this.length; i-- && this[i] !== v;) {}
      return i;
    },

    // used to flag classes
    isClassDescriptor = {value: true},

    trustSuper = ('' + function () {
      // this test should never be minifier sensitive
      // or the indexOf check after will fail
      this['super']();
    }).indexOf(SUPER) < 0 ?
      // In 2010 Opera 10.5 for Linux Debian 6
      // goes nut with methods to string representation,
      // truncating pieces of text in an unpredictable way.
      // If you are targeting such browser
      // be aware that super invocation might fail.
      // This is the only exception I could find
      // from year 2000 to modern days browsers
      // plus everything else would work just fine.
      function () { return true; } :
      // all other JS engines should be just fine
      function (method) {
        var
          str = '' + method,
          i = str.indexOf(SUPER)
        ;
        return i < 0 ?
          false :
          isBoundary(str.charCodeAt(i - 1)) &&
          isBoundary(str.charCodeAt(i + 5));
      }
  ;

  // verified broken IE8 or older browsers
  try {
    defineProperty({}, '{}', {});
  } catch(o_O) {
    if ('__defineGetter__' in {}) {
      defineProperty = function (object, name, descriptor) {
        if (hOP.call(descriptor, VALUE)) {
          object[name] = descriptor[VALUE];
        } else {
          if (hOP.call(descriptor, 'get')) {
            object.__defineGetter__(name, descriptor.get);
          }
          if (hOP.call(descriptor, 'set')) {
            object.__defineSetter__(name, descriptor.set);
          }
        }
        return object;
      };
      gOPD = function (object, key) {
        var
          get = object.__lookupGetter__(key),
          set = object.__lookupSetter__(key),
          descriptor = {}
        ;
        if (get || set) {
          if (get) {
            descriptor.get = get;
          }
          if (set) {
            descriptor.set = set;
          }
        } else {
          descriptor[VALUE] = object[key];
        }
        return descriptor;
      };
    } else {
      defineProperty = function (object, name, descriptor) {
        object[name] = descriptor[VALUE];
        return object;
      };
      gOPD = function (object, key) {
        return {value: object[key]};
      };
    }
  }

  // copy all imported enumerable methods and properties
  function addMixins(mixins, target, inherits, isNOTExtendingNative) {
    for (var
      source,
      init = [],
      i = 0; i < mixins.length; i++
    ) {
      source = transformMixin(mixins[i]);
      if (hOP.call(source, INIT)) {
        init.push(source[INIT]);
      }
      copyOwn(source, target, inherits, false, false, isNOTExtendingNative);
    }
    return init;
  }

  // deep copy all properties of an object (static objects only)
  function copyDeep(source) {
    for (var
      key, descriptor, value,
      target = create(gPO(source)),
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      descriptor = gOPD(source, key);
      if (hOP.call(descriptor, VALUE)) {
        copyValueIfObject(descriptor, copyDeep);
      }
      defineProperty(target, key, descriptor);
    }
    return target;
  }

  // given two objects, performs a deep copy
  // per each property not present in the target
  // otherwise merges, without overwriting,
  // all properties within the object
  function copyMerged(source, target) {
    for (var
      key, descriptor, value, tvalue,
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      descriptor = gOPD(source, key);
      // target already has this property
      if (hOP.call(target, key)) {
        // verify the descriptor can  be merged
        if (hOP.call(descriptor, VALUE)) {
          value = descriptor[VALUE];
          // which means, verify it's an object
          if (isObject(value)) {
            // in such case, verify the target can be modified
            descriptor = gOPD(target, key);
            // meaning verify it's a data descriptor
            if (hOP.call(descriptor, VALUE)) {
              tvalue = descriptor[VALUE];
              // and it's actually an object
              if (isObject(tvalue)) {
                copyMerged(value, tvalue);
              }
            }
          }
        }
      } else {
        // target has no property at all
        if (hOP.call(descriptor, VALUE)) {
          // copy deep if it's an object
          copyValueIfObject(descriptor, copyDeep);
        }
        defineProperty(target, key, descriptor);
      }
    }
  }

  // configure source own properties in the target
  function copyOwn(source, target, inherits, publicStatic, allowInit, isNOTExtendingNative) {
    for (var
      key,
      noFunctionCheck = typeof source !== 'function',
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      if (
        (noFunctionCheck || indexOf.call(nativeFunctionOPN, key) < 0) &&
        isNotASpecialKey(key, allowInit)
      ) {
        if (hOP.call(target, key)) {
          warn('duplicated: ' + key.toString());
        }
        setProperty(inherits, target, key, gOPD(source, key), publicStatic, isNOTExtendingNative);
      }
    }
  }

  // shortcut to copy objects into descriptor.value
  function copyValueIfObject(where, how) {
    var what = where[VALUE];
    if (isObject(what)) {
      where[VALUE] = how(what);
    }
  }


  // return the right constructor analyzing the parent.
  // if the parent is empty there is no need to call it.
  function createConstructor(hasParentPrototype, parent) {
    var Class = function Class() {};
    return hasParentPrototype && ('' + parent) !== ('' + Class) ?
      function Class() {
        return parent.apply(this, arguments);
      } :
      Class
    ;
  }

  // common defineProperty wrapper
  function define(target, key, value, publicStatic) {
    var configurable = isConfigurable(key, publicStatic);
    defineProperty(target, key, {
      enumerable: false, // was: publicStatic,
      configurable: configurable,
      writable: configurable,
      value: value
    });
  }

  // verifies a specific char code is not in [A-Za-z_]
  // used to avoid RegExp for non RegExp aware environment
  function isBoundary(code) {
    return code ?
      (code < 65 || 90 < code) &&
      (code < 97 || 122 < code) &&
      code !== 95 :
      true;
  }

  // if key is UPPER_CASE and the property is public static
  // it will define the property as non configurable and non writable
  function isConfigurable(key, publicStatic) {
    return publicStatic ? !isPublicStatic(key) : true;
  }

  // verifies a key is not special for the class
  function isNotASpecialKey(key, allowInit) {
    return  key !== CONSTRUCTOR &&
            key !== EXTENDS &&
            key !== IMPLEMENTS &&
            // Blackberry 7 and old WebKit bug only:
            //  user defined functions have
            //  enumerable prototype and constructor
            key !== PROTOTYPE &&
            key !== STATIC &&
            key !== SUPER &&
            key !== WITH &&
            (allowInit || key !== INIT);
  }

  // verifies a generic value is actually an object
  function isObject(value) {
    /*jshint eqnull: true */
    return value != null && typeof value === 'object';
  }

  // verifies the entire string is upper case
  // and contains eventually an underscore
  // used to avoid RegExp for non RegExp aware environment
  function isPublicStatic(key) {
    for(var c, i = 0; i < key.length; i++) {
      c = key.charCodeAt(i);
      if ((c < 65 || 90 < c) && c !== 95) {
        return false;
      }
    }
    return true;
  }

  // will eventually convert classes or constructors
  // into trait objects, before assigning them as such
  function transformMixin(trait) {
    if (isObject(trait)) return trait;
    else {
      var i, key, keys, object, proto;
      if (trait.isClass) {
        if (trait.length) {
          warn((trait.name || 'Class') + ' should not expect arguments');
        }
        for (
          object = {init: trait},
          proto = trait.prototype;
          proto && proto !== Object.prototype;
          proto = gPO(proto)
        ) {
          for (i = 0, keys = oK(proto); i < keys.length; i++) {
            key = keys[i];
            if (isNotASpecialKey(key, false) && !hOP.call(object, key)) {
              defineProperty(object, key, gOPD(proto, key));
            }
          }
        }
      } else {
        for (
          i = 0,
          object = {},
          proto = trait({}),
          keys = oK(proto);
          i < keys.length; i++
        ) {
          key = keys[i];
          if (key !== INIT) {
            // if this key is the mixin one
            if (~key.toString().indexOf('mixin:init') && isArray(proto[key])) {
              // set the init simply as own method
              object.init = proto[key][0];
            } else {
              // simply assign the descriptor
              defineProperty(object, key, gOPD(proto, key));
            }
          }
        }
      }
      return object;
    }
  }

  // set a property via defineProperty using a common descriptor
  // only if properties where not defined yet.
  // If publicStatic is true, properties are both non configurable and non writable
  function setProperty(inherits, target, key, descriptor, publicStatic, isNOTExtendingNative) {
    var
      hasValue = hOP.call(descriptor, VALUE),
      configurable,
      value
    ;
    if (publicStatic) {
      if (hOP.call(target, key)) {
        // in case the value is not a static one
        if (
          inherits &&
          isObject(target[key]) &&
          isObject(inherits[CONSTRUCTOR][key])
        ) {
          copyMerged(inherits[CONSTRUCTOR][key], target[key]);
        }
        return;
      } else if (hasValue) {
        // in case it's an object perform a deep copy
        copyValueIfObject(descriptor, copyDeep);
      }
    } else if (hasValue) {
      value = descriptor[VALUE];
      if (typeof value === 'function' && trustSuper(value)) {
        descriptor[VALUE] = wrap(inherits, key, value, publicStatic);
      }
    } else if (isNOTExtendingNative) {
      wrapGetOrSet(inherits, key, descriptor, 'get');
      wrapGetOrSet(inherits, key, descriptor, 'set');
    }
    configurable = isConfigurable(key, publicStatic);
    descriptor.enumerable = false; // was: publicStatic;
    descriptor.configurable = configurable;
    if (hasValue) {
      descriptor.writable = configurable;
    }
    defineProperty(target, key, descriptor);
  }

  // basic check against expected properties or methods
  // used when `implements` is used
  function verifyImplementations(interfaces, target) {
    for (var
      current,
      key,
      i = 0; i < interfaces.length; i++
    ) {
      current = interfaces[i];
      for (key in current) {
        if (hOP.call(current, key) && !hOP.call(target, key)) {
          warn(key.toString() + ' is not implemented');
        }
      }
    }
  }

  // warn if something doesn't look right
  // such overwritten public statics
  // or traits / mixins assigning twice same thing
  function warn(message) {
    try {
      console.warn(message);
    } catch(meh) {
      /*\_(ツ)_*/
    }
  }

  // lightweight wrapper for methods that requires
  // .super(...) invokaction - inspired by old klass.js
  function wrap(inherits, key, method, publicStatic) {
    return function () {
      if (!hOP.call(this, SUPER)) {
        // define it once in order to use
        // fast assignment every other time
        define(this, SUPER, null, publicStatic);
      }
      var
        previous = this[SUPER],
        current = (this[SUPER] = inherits[key]),
        result = method.apply(this, arguments)
      ;
      this[SUPER] = previous;
      return result;
    };
  }

  // get/set shortcut for the eventual wrapper
  function wrapGetOrSet(inherits, key, descriptor, gs, publicStatic) {
    if (hOP.call(descriptor, gs) && trustSuper(descriptor[gs])) {
      descriptor[gs] = wrap(
        gOPD(inherits, key),
        gs,
        descriptor[gs],
        publicStatic
      );
    }
  }

  // the actual Class({ ... }) definition
  return function (description) {
    var
      hasConstructor = hOP.call(description, CONSTRUCTOR),
      hasParent = hOP.call(description, EXTENDS),
      parent = hasParent && description[EXTENDS],
      hasParentPrototype = hasParent && typeof parent === 'function',
      inherits = hasParentPrototype ? parent[PROTOTYPE] : parent,
      constructor = hasConstructor ?
        description[CONSTRUCTOR] :
        createConstructor(hasParentPrototype, parent),
      hasSuper = hasParent && hasConstructor && trustSuper(constructor),
      prototype = hasParent ? create(inherits) : constructor[PROTOTYPE],
      // do not wrap getters and setters in GJS extends
      isNOTExtendingNative = toString.call(inherits).indexOf(' GObject_') < 0,
      mixins,
      length
    ;
    if (hasSuper && isNOTExtendingNative) {
      constructor = wrap(inherits, CONSTRUCTOR, constructor, false);
    }
    // add modules/mixins (that might swap the constructor)
    if (hOP.call(description, WITH)) {
      mixins = addMixins([].concat(description[WITH]), prototype, inherits, isNOTExtendingNative);
      length = mixins.length;
      if (length) {
        constructor = (function (parent) {
          return function () {
            var i = 0;
            while (i < length) mixins[i++].call(this);
            return parent.apply(this, arguments);
          };
        }(constructor));
        constructor[PROTOTYPE] = prototype;
      }
    }
    if (hOP.call(description, STATIC)) {
      // add new public static properties first
      copyOwn(description[STATIC], constructor, inherits, true, true, isNOTExtendingNative);
    }
    if (hasParent) {
      // in case it's a function
      if (parent !== inherits) {
        // copy possibly inherited statics too
        copyOwn(parent, constructor, inherits, true, true, isNOTExtendingNative);
      }
      constructor[PROTOTYPE] = prototype;
    }
    if (prototype[CONSTRUCTOR] !== constructor) {
      define(prototype, CONSTRUCTOR, constructor, false);
    }
    // enrich the prototype
    copyOwn(description, prototype, inherits, false, true, isNOTExtendingNative);
    if (hOP.call(description, IMPLEMENTS)) {
      verifyImplementations([].concat(description[IMPLEMENTS]), prototype);
    }
    if (hasParent && !getPrototypeOf) {
      define(prototype, PROTO, inherits, false);
    }
    return defineProperty(constructor, 'isClass', isClassDescriptor);
  };

}(Object));
module.exports = Class;

/***/ }),

/***/ 205:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
var function_1 = __nccwpck_require__(6985);
function ap(F, G) {
    return function (fa) { return function (fab) {
        return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
    }; };
}
exports.ap = ap;
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
exports.apFirst = apFirst;
function apSecond(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
    }; };
}
exports.apSecond = apSecond;
function apS(F) {
    return function (name, fb) { return function (fa) {
        return F.ap(F.map(fa, function (a) { return function (b) {
            var _a;
            return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
        }; }), fb);
    }; };
}
exports.apS = apS;
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
exports.getApplySemigroup = getApplySemigroup;
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!tupleConstructors.hasOwnProperty(len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
exports.sequenceT = sequenceT;
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}
exports.sequenceS = sequenceS;


/***/ }),

/***/ 2372:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bind = exports.chainFirst = void 0;
function chainFirst(M) {
    return function (f) { return function (first) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); }; };
}
exports.chainFirst = chainFirst;
function bind(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}
exports.bind = bind;


/***/ }),

/***/ 6964:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eqDate = exports.eqNumber = exports.eqString = exports.eqBoolean = exports.eq = exports.strictEqual = exports.getStructEq = exports.getTupleEq = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.eqStrict = exports.URI = exports.contramap = exports.tuple = exports.struct = exports.fromEquals = void 0;
var function_1 = __nccwpck_require__(6985);
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromEquals = function (equals) { return ({
    equals: function (x, y) { return x === y || equals(x, y); }
}); };
exports.fromEquals = fromEquals;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.10.0
 */
var struct = function (eqs) {
    return exports.fromEquals(function (first, second) {
        for (var key in eqs) {
            if (!eqs[key].equals(first[key], second[key])) {
                return false;
            }
        }
        return true;
    });
};
exports.struct = struct;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { tuple } from 'fp-ts/Eq'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const E = tuple(S.Eq, N.Eq, B.Eq)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return exports.fromEquals(function (first, second) { return eqs.every(function (E, i) { return E.equals(first[i], second[i]); }); });
};
exports.tuple = tuple;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return exports.fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
exports.eqStrict = {
    equals: function (a, b) { return a === b; }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (x, y) { return exports.fromEquals(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.6.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: empty
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleEq = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getStructEq = exports.struct;
/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @since 2.0.0
 * @deprecated
 */
exports.strictEqual = exports.eqStrict.equals;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eq = exports.Contravariant;
/**
 * Use [`Eq`](./boolean.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqBoolean = exports.eqStrict;
/**
 * Use [`Eq`](./string.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqString = exports.eqStrict;
/**
 * Use [`Eq`](./number.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqNumber = exports.eqStrict;
/**
 * Use [`Eq`](./Date.ts.html#eq) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.eqDate = {
    equals: function (first, second) { return first.valueOf() === second.valueOf(); }
};


/***/ }),

/***/ 5533:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFunctorComposition = exports.bindTo = exports.flap = exports.map = void 0;
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
var function_1 = __nccwpck_require__(6985);
function map(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
exports.map = map;
function flap(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
exports.flap = flap;
function bindTo(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
exports.bindTo = bindTo;
/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map(F, G);
    return {
        map: function (fga, f) { return function_1.pipe(fga, _map(f)); }
    };
}
exports.getFunctorComposition = getFunctorComposition;


/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 2.0.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatAll = exports.endo = exports.filterSecond = exports.filterFirst = exports.reverse = void 0;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @category combinators
 * @since 2.11.0
 */
var reverse = function (M) { return ({
    concat: function (first, second) { return M.concat(second, first); }
}); };
exports.reverse = reverse;
/**
 * @category combinators
 * @since 2.11.0
 */
var filterFirst = function (predicate) { return function (M) { return ({
    concat: function (first, second) { return (predicate(first) ? M.concat(first, second) : second); }
}); }; };
exports.filterFirst = filterFirst;
/**
 * @category combinators
 * @since 2.11.0
 */
var filterSecond = function (predicate) { return function (M) { return ({
    concat: function (first, second) { return (predicate(second) ? M.concat(first, second) : first); }
}); }; };
exports.filterSecond = filterSecond;
/**
 * @category combinators
 * @since 2.11.0
 */
var endo = function (f) { return function (M) { return ({
    concat: function (first, second) { return M.concat(f(first), f(second)); }
}); }; };
exports.endo = endo;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
var concatAll = function (M) { return function (startWith) { return function (as) {
    return as.reduce(function (a, acc) { return M.concat(a, acc); }, startWith);
}; }; };
exports.concatAll = concatAll;


/***/ }),

/***/ 6685:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ordDate = exports.ordNumber = exports.ordString = exports.ordBoolean = exports.ord = exports.getDualOrd = exports.getTupleOrd = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.equals = exports.trivial = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.URI = exports.contramap = exports.reverse = exports.tuple = exports.fromCompare = exports.equalsDefault = void 0;
var Eq_1 = __nccwpck_require__(6964);
var function_1 = __nccwpck_require__(6985);
// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------
/**
 * @category defaults
 * @since 2.10.0
 */
var equalsDefault = function (compare) { return function (first, second) {
    return first === second || compare(first, second) === 0;
}; };
exports.equalsDefault = equalsDefault;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromCompare = function (compare) { return ({
    equals: exports.equalsDefault(compare),
    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
}); };
exports.fromCompare = fromCompare;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Ord'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 *
 * const O = tuple(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    return exports.fromCompare(function (first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
            var r = ords[i].compare(first[i], second[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(first[i], second[i]);
    });
};
exports.tuple = tuple;
/**
 * @category combinators
 * @since 2.10.0
 */
var reverse = function (O) { return exports.fromCompare(function (first, second) { return O.compare(second, first); }); };
exports.reverse = reverse;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return function_1.pipe(fa, exports.contramap(f)); };
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return exports.fromCompare(function (first, second) { return fa.compare(f(first), f(second)); });
}; };
exports.contramap = contramap;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
exports.URI = 'Ord';
/**
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) {
        return exports.fromCompare(function (a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
        });
    }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as B from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   readonly id: number
 *   readonly name: string
 *   readonly age: number
 *   readonly rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   S.Ord,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   N.Ord,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   B.Ord,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
var getMonoid = function () { return ({
    concat: exports.getSemigroup().concat,
    empty: exports.fromCompare(function () { return 0; })
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
exports.trivial = {
    equals: function_1.constTrue,
    compare: function_1.constant(0)
};
/**
 * @since 2.11.0
 */
var equals = function (O) { return function (second) { return function (first) {
    return first === second || O.compare(first, second) === 0;
}; }; };
exports.equals = equals;
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
var lt = function (O) { return function (first, second) { return O.compare(first, second) === -1; }; };
exports.lt = lt;
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
var gt = function (O) { return function (first, second) { return O.compare(first, second) === 1; }; };
exports.gt = gt;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
var leq = function (O) { return function (first, second) { return O.compare(first, second) !== 1; }; };
exports.leq = leq;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
var geq = function (O) { return function (first, second) { return O.compare(first, second) !== -1; }; };
exports.geq = geq;
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var min = function (O) { return function (first, second) {
    return first === second || O.compare(first, second) < 1 ? first : second;
}; };
exports.min = min;
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var max = function (O) { return function (first, second) {
    return first === second || O.compare(first, second) > -1 ? first : second;
}; };
exports.max = max;
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
var clamp = function (O) {
    var minO = exports.min(O);
    var maxO = exports.max(O);
    return function (low, hi) { return function (a) { return maxO(minO(a, hi), low); }; };
};
exports.clamp = clamp;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
var between = function (O) {
    var ltO = exports.lt(O);
    var gtO = exports.gt(O);
    return function (low, hi) { return function (a) { return (ltO(a, low) || gtO(a, hi) ? false : true); }; };
};
exports.between = between;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
// tslint:disable: deprecation
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleOrd = exports.tuple;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getDualOrd = exports.reverse;
/**
 * Use [`Contravariant`](#contravariant) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ord = exports.Contravariant;
// default compare for primitive types
function compare(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
    equals: Eq_1.eqStrict.equals,
    compare: compare
};
/**
 * Use [`Ord`](./boolean.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordBoolean = strictOrd;
/**
 * Use [`Ord`](./string.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordString = strictOrd;
/**
 * Use [`Ord`](./number.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordNumber = strictOrd;
/**
 * Use [`Ord`](./Date.ts.html#ord) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.ordDate = 
/*#__PURE__*/
function_1.pipe(exports.ordNumber, 
/*#__PURE__*/
exports.contramap(function (date) { return date.valueOf(); }));


/***/ }),

/***/ 8630:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
exports.uncons = exports.filterWithIndex = exports.filter = exports.groupSort = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = void 0;
var Apply_1 = __nccwpck_require__(205);
var Chain_1 = __nccwpck_require__(2372);
var Eq_1 = __nccwpck_require__(6964);
var function_1 = __nccwpck_require__(6985);
var Functor_1 = __nccwpck_require__(5533);
var _ = __importStar(__nccwpck_require__(1840));
var Ord_1 = __nccwpck_require__(6685);
var Se = __importStar(__nccwpck_require__(6339));
// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
exports.empty = _.emptyReadonlyArray;
/**
 * @internal
 */
exports.isNonEmpty = _.isNonEmpty;
/**
 * @internal
 */
var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
exports.isOutOfBound = isOutOfBound;
/**
 * @internal
 */
var prependW = function (head) { return function (tail) { return __spreadArray([head], tail); }; };
exports.prependW = prependW;
/**
 * @internal
 */
exports.prepend = exports.prependW;
/**
 * @internal
 */
var appendW = function (end) { return function (init) { return __spreadArray(__spreadArray([], init), [end]); }; };
exports.appendW = appendW;
/**
 * @internal
 */
exports.append = exports.appendW;
/**
 * @internal
 */
var unsafeInsertAt = function (i, a, as) {
    if (exports.isNonEmpty(as)) {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
exports.unsafeInsertAt = unsafeInsertAt;
/**
 * @internal
 */
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var uniq = function (E) { return function (as) {
    if (as.length === 1) {
        return as;
    }
    var out = [exports.head(as)];
    var rest = exports.tail(as);
    var _loop_1 = function (a) {
        if (out.every(function (o) { return !E.equals(o, a); })) {
            out.push(a);
        }
    };
    for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
        var a = rest_1[_i];
        _loop_1(a);
    }
    return out;
}; };
exports.uniq = uniq;
/**
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
 *
 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.11.0
 */
var sortBy = function (ords) {
    if (exports.isNonEmpty(ords)) {
        var M = Ord_1.getMonoid();
        return exports.sort(ords.reduce(M.concat, M.empty));
    }
    return function_1.identity;
};
exports.sortBy = sortBy;
/**
 * @category combinators
 * @since 2.11.0
 */
var union = function (E) {
    var uniqE = exports.uniq(E);
    return function (second) { return function (first) { return uniqE(function_1.pipe(first, concat(second))); }; };
};
exports.union = union;
/**
 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @category combinators
 * @since 2.11.0
 */
var rotate = function (n) { return function (as) {
    var len = as.length;
    var m = Math.round(n) % len;
    if (exports.isOutOfBound(Math.abs(m), as) || m === 0) {
        return as;
    }
    if (m < 0) {
        var _a = exports.splitAt(-m)(as), f = _a[0], s = _a[1];
        return function_1.pipe(s, concat(f));
    }
    else {
        return exports.rotate(m - len)(as);
    }
}; };
exports.rotate = rotate;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
 *
 * @category constructors
 * @since 2.5.0
 */
var fromReadonlyArray = function (as) {
    return exports.isNonEmpty(as) ? _.some(as) : _.none;
};
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy = function (f) { return function (n) {
    var j = Math.max(0, Math.floor(n));
    var out = [f(0)];
    for (var i = 1; i < j; i++) {
        out.push(f(i));
    }
    return out;
}; };
exports.makeBy = makeBy;
/**
 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate = function (a) { return exports.makeBy(function () { return a; }); };
exports.replicate = replicate;
/**
 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range = function (start, end) {
    return start <= end ? exports.makeBy(function (i) { return start + i; })(end - start + 1) : [start];
};
exports.range = range;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
var unprepend = function (as) { return [exports.head(as), exports.tail(as)]; };
exports.unprepend = unprepend;
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
var unappend = function (as) { return [exports.init(as), exports.last(as)]; };
exports.unappend = unappend;
// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------
/**
 * @category interop
 * @since 2.5.0
 */
var fromArray = function (as) { return exports.fromReadonlyArray(as.slice()); };
exports.fromArray = fromArray;
function concatW(second) {
    return function (first) { return first.concat(second); };
}
exports.concatW = concatW;
function concat(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
exports.concat = concat;
/**
 * @category combinators
 * @since 2.5.0
 */
var reverse = function (as) {
    return as.length === 1 ? as : __spreadArray([exports.last(as)], as.slice(0, -1).reverse());
};
exports.reverse = reverse;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return exports.empty;
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var a = as[i];
            if (E.equals(a, head)) {
                nea.push(a);
            }
            else {
                out.push(nea);
                head = a;
                nea = [head];
            }
        }
        out.push(nea);
        return out;
    };
}
exports.group = group;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @category combinators
 * @since 2.5.0
 */
var groupBy = function (f) { return function (as) {
    var out = {};
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        var k = f(a);
        if (out.hasOwnProperty(k)) {
            out[k].push(a);
        }
        else {
            out[k] = [a];
        }
    }
    return out;
}; };
exports.groupBy = groupBy;
/**
 * @category combinators
 * @since 2.5.0
 */
var sort = function (O) { return function (as) {
    return as.length === 1 ? as : as.slice().sort(O.compare);
}; };
exports.sort = sort;
/**
 * @category combinators
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return exports.modifyAt(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * @category combinators
 * @since 2.5.0
 */
var modifyAt = function (i, f) { return function (as) { return (exports.isOutOfBound(i, as) ? _.none : _.some(exports.unsafeUpdateAt(i, f(as[i]), as))); }; };
exports.modifyAt = modifyAt;
/**
 * @category combinators
 * @since 2.5.1
 */
var zipWith = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return exports.zipWith(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * @category combinators
 * @since 2.5.1
 */
var unzip = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.10.0
 */
var prependAll = function (middle) { return function (as) {
    var out = [middle, as[0]];
    for (var i = 1; i < as.length; i++) {
        out.push(middle, as[i]);
    }
    return out;
}; };
exports.prependAll = prependAll;
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = function (middle) { return function (as) {
    var rest = exports.tail(as);
    return exports.isNonEmpty(rest) ? function_1.pipe(rest, exports.prependAll(middle), exports.prepend(exports.head(as))) : as;
}; };
exports.intersperse = intersperse;
/**
 * @category combinators
 * @since 2.10.0
 */
var chainWithIndex = function (f) { return function (as) {
    var out = _.fromReadonlyNonEmptyArray(f(0, exports.head(as)));
    for (var i = 1; i < as.length; i++) {
        out.push.apply(out, f(i, as[i]));
    }
    return out;
}; };
exports.chainWithIndex = chainWithIndex;
/**
 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
 * value and the tail of the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.10.0
 */
var chop = function (f) { return function (as) {
    var _a = f(as), b = _a[0], rest = _a[1];
    var out = [b];
    var next = rest;
    while (exports.isNonEmpty(next)) {
        var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
        out.push(b_1);
        next = rest_2;
    }
    return out;
}; };
exports.chop = chop;
/**
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category combinators
 * @since 2.10.0
 */
var splitAt = function (n) { return function (as) {
    var m = Math.max(1, n);
    return m >= as.length ? [as, exports.empty] : [function_1.pipe(as.slice(1, m), exports.prepend(exports.head(as))), as.slice(m)];
}; };
exports.splitAt = splitAt;
/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.10.0
 */
var chunksOf = function (n) { return exports.chop(exports.splitAt(n)); };
exports.chunksOf = chunksOf;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var _map = function (fa, f) { return function_1.pipe(fa, exports.map(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return function_1.pipe(fa, exports.mapWithIndex(f)); };
var _ap = function (fab, fa) { return function_1.pipe(fab, exports.ap(fa)); };
var _chain = function (ma, f) { return function_1.pipe(ma, exports.chain(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return function_1.pipe(wa, exports.extend(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return function_1.pipe(fa, exports.reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = exports.foldMap(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return function_1.pipe(fa, exports.reduceRight(b, f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = exports.traverse(F);
    return function (ta, f) { return function_1.pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return function_1.pipe(fa, exports.alt(that)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceWithIndex(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = exports.foldMapWithIndex(M);
    return function (fa, f) { return function_1.pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return function_1.pipe(fa, exports.reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (ta, f) { return function_1.pipe(ta, traverseWithIndexF(f)); };
};
// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------
/**
 * @category Pointed
 * @since 2.5.0
 */
exports.of = _.singleton;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (as) { return function_1.pipe(as, concatW(that())); }; };
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
exports.alt = exports.altW;
/**
 * @category Apply
 * @since 2.5.0
 */
var ap = function (as) { return exports.chain(function (f) { return function_1.pipe(as, exports.map(f)); }); };
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
var chain = function (f) { return exports.chainWithIndex(function (_, a) { return f(a); }); };
exports.chain = chain;
/**
 * @category Extend
 * @since 2.5.0
 */
var extend = function (f) { return function (as) {
    var next = exports.tail(as);
    var out = [f(as)];
    while (exports.isNonEmpty(next)) {
        out.push(f(next));
        next = exports.tail(next);
    }
    return out;
}; };
exports.extend = extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/
exports.extend(function_1.identity);
/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/
exports.chain(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) {
    return exports.mapWithIndex(function (_, a) { return f(a); });
};
exports.map = map;
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (as) {
    var out = [f(0, exports.head(as))];
    for (var i = 1; i < as.length; i++) {
        out.push(f(i, as[i]));
    }
    return out;
}; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return exports.reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (S) { return function (f) { return function (as) {
    return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
}; }; };
exports.foldMap = foldMap;
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return exports.reduceRightWithIndex(b, function (_, b, a) { return f(b, a); });
};
exports.reduceRight = reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (as) {
    return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
}; };
exports.reduceWithIndex = reduceWithIndex;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var foldMapWithIndex = function (S) { return function (f) { return function (as) { return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0])); }; }; };
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (as) { return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b); }; };
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = exports.traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return exports.traverseWithIndex(F)(function_1.SK); };
exports.sequence = sequence;
/**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) { return function (as) {
    var out = F.map(f(0, exports.head(as)), exports.of);
    for (var i = 1; i < as.length; i++) {
        out = F.ap(F.map(out, function (bs) { return function (b) { return function_1.pipe(bs, exports.append(b)); }; }), f(i, as[i]));
    }
    return out;
}; }; };
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category Comonad
 * @since 2.6.3
 */
exports.extract = _.head;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
}); };
exports.getShow = getShow;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: concat
}); };
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return Eq_1.fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
exports.getEq = getEq;
/**
 * @category combinators
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = exports.union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
exports.flap = 
/*#_PURE_*/
Functor_1.flap(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apFirst = 
/*#__PURE__*/
Apply_1.apFirst(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.apSecond = 
/*#__PURE__*/
Apply_1.apSecond(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: _chain
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.5.0
 */
exports.chainFirst = 
/*#__PURE__*/
Chain_1.chainFirst(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: _chain
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Comonad = {
    URI: exports.URI,
    map: _map,
    extend: _extend,
    extract: exports.extract
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
exports.Do = 
/*#__PURE__*/
exports.of(_.emptyRecord);
/**
 * @since 2.8.0
 */
exports.bindTo = 
/*#__PURE__*/
Functor_1.bindTo(exports.Functor);
/**
 * @since 2.8.0
 */
exports.bind = 
/*#__PURE__*/
Chain_1.bind(exports.Chain);
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
exports.apS = 
/*#__PURE__*/
Apply_1.apS(exports.Apply);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.head = exports.extract;
/**
 * @since 2.5.0
 */
exports.tail = _.tail;
/**
 * @since 2.5.0
 */
var last = function (as) { return as[as.length - 1]; };
exports.last = last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
var init = function (as) { return as.slice(0, -1); };
exports.init = init;
/**
 * @since 2.5.0
 */
var min = function (O) {
    var S = Se.min(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.min = min;
/**
 * @since 2.5.0
 */
var max = function (O) {
    var S = Se.max(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.max = max;
/**
 * @since 2.10.0
 */
var concatAll = function (S) { return function (as) { return as.reduce(S.concat); }; };
exports.concatAll = concatAll;
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchLeft = function (f) { return function (as) {
    return f(exports.head(as), exports.tail(as));
}; };
exports.matchLeft = matchLeft;
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category destructors
 * @since 2.11.0
 */
var matchRight = function (f) { return function (as) {
    return f(exports.init(as), exports.last(as));
}; };
exports.matchRight = matchRight;
/**
 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) { return function (as) { return __spreadArray([
    f(exports.head(as))
], exports.tail(as)); }; };
exports.modifyHead = modifyHead;
/**
 * Change the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateHead = function (a) { return exports.modifyHead(function () { return a; }); };
exports.updateHead = updateHead;
/**
 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) { return function (as) {
    return function_1.pipe(exports.init(as), exports.append(f(exports.last(as))));
}; };
exports.modifyLast = modifyLast;
/**
 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.11.0
 */
var updateLast = function (a) { return exports.modifyLast(function () { return a; }); };
exports.updateLast = updateLast;
function groupSort(O) {
    var sortO = exports.sort(O);
    var groupO = group(O);
    return function (as) { return (exports.isNonEmpty(as) ? groupO(sortO(as)) : exports.empty); };
}
exports.groupSort = groupSort;
function filter(predicate) {
    return exports.filterWithIndex(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
var filterWithIndex = function (predicate) { return function (as) { return exports.fromReadonlyArray(as.filter(function (a, i) { return predicate(i, a); })); }; };
exports.filterWithIndex = filterWithIndex;
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
exports.uncons = exports.unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category destructors
 * @since 2.10.0
 * @deprecated
 */
exports.unsnoc = exports.unappend;
function cons(head, tail) {
    return tail === undefined ? exports.prepend(head) : function_1.pipe(tail, exports.prepend(head));
}
exports.cons = cons;
/**
 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
var snoc = function (init, end) { return function_1.pipe(init, concat([end])); };
exports.snoc = snoc;
/**
 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
var insertAt = function (i, a) { return function (as) {
    return i < 0 || i > as.length ? _.none : _.some(exports.unsafeInsertAt(i, a, as));
}; };
exports.insertAt = insertAt;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category combinators
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @since 2.5.0
 * @deprecated
 */
exports.fold = exports.concatAll;
/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyNonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: _chain,
    extend: _extend,
    extract: exports.extract,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    alt: _alt
};


/***/ }),

/***/ 6339:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
var function_1 = __nccwpck_require__(6985);
var _ = __importStar(__nccwpck_require__(1840));
var M = __importStar(__nccwpck_require__(179));
var Or = __importStar(__nccwpck_require__(6685));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.min(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (O) { return ({
    concat: Or.min(O)
}); };
exports.min = min;
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.max(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (O) { return ({
    concat: Or.max(O)
}); };
exports.max = max;
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
exports.constant = constant;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
 *
 * @category combinators
 * @since 2.10.0
 */
exports.reverse = M.reverse;
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = struct<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category combinators
 * @since 2.10.0
 */
var struct = function (semigroups) { return ({
    concat: function (first, second) {
        var r = {};
        for (var k in semigroups) {
            if (_.has.call(semigroups, k)) {
                r[k] = semigroups[k].concat(first[k], second[k]);
            }
        }
        return r;
    }
}); };
exports.struct = struct;
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Semigroup'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @category combinators
 * @since 2.10.0
 */
var tuple = function () {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return ({
        concat: function (first, second) { return semigroups.map(function (s, i) { return s.concat(first[i], second[i]); }); }
    });
};
exports.tuple = tuple;
/**
 * Between each pair of elements insert `middle`.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
 *
 * @category combinators
 * @since 2.10.0
 */
var intercalate = function (middle) { return function (S) { return ({
    concat: function (x, y) { return S.concat(x, S.concat(middle, y)); }
}); }; };
exports.intercalate = intercalate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
var first = function () { return ({ concat: function_1.identity }); };
exports.first = first;
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var last = function () { return ({ concat: function (_, y) { return y; } }); };
exports.last = last;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = concatAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.10.0
 */
exports.concatAll = M.concatAll;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `void` module instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupVoid = exports.constant(undefined);
/**
 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var getObjectSemigroup = function () { return ({
    concat: function (first, second) { return Object.assign({}, first, second); }
}); };
exports.getObjectSemigroup = getObjectSemigroup;
/**
 * Use [`last`](#last) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getLastSemigroup = exports.last;
/**
 * Use [`first`](#first) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getFirstSemigroup = exports.first;
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleSemigroup = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getStructSemigroup = exports.struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
exports.getDualSemigroup = exports.reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.getJoinSemigroup = exports.max;
/**
 * Use [`min`](#min) instead.
 *
 * @category constructors
 * @since 2.0.0
 * @deprecated
 */
exports.getMeetSemigroup = exports.min;
/**
 * Use [`intercalate`](#intercalate) instead.
 *
 * @category combinators
 * @since 2.5.0
 * @deprecated
 */
exports.getIntercalateSemigroup = exports.intercalate;
function fold(S) {
    var concatAllS = exports.concatAll(S);
    return function (startWith, as) { return (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as)); };
}
exports.fold = fold;
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.getFunctionSemigroup = function_1.getSemigroup;
/**
 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupProduct = {
    concat: function (x, y) { return x * y; }
};


/***/ }),

/***/ 6985:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var getBooleanAlgebra = function (B) { return function () { return ({
    meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
    join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
    zero: function () { return B.zero; },
    one: function () { return B.one; },
    implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
    not: function (x) { return function (a) { return B.not(x(a)); }; }
}); }; };
exports.getBooleanAlgebra = getBooleanAlgebra;
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function (S) { return function () { return ({
    concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
}); }; };
exports.getSemigroup = getSemigroup;
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getMonoid = function (M) {
    var getSemigroupM = exports.getSemigroup(M);
    return function () { return ({
        concat: getSemigroupM().concat,
        empty: function () { return M.empty; }
    }); };
};
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemiring = function (S) { return ({
    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
    zero: function () { return S.zero; },
    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
    one: function () { return S.one; }
}); };
exports.getSemiring = getSemiring;
/**
 * @category instances
 * @since 2.10.0
 */
var getRing = function (R) {
    var S = exports.getSemiring(R);
    return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
    };
};
exports.getRing = getRing;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var apply = function (a) { return function (f) { return f(a); }; };
exports.apply = apply;
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
exports.identity = identity;
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
exports.constant = constant;
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
exports.constTrue = 
/*#__PURE__*/
constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
exports.constFalse = 
/*#__PURE__*/
constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
exports.constNull = 
/*#__PURE__*/
constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
exports.constUndefined = 
/*#__PURE__*/
constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
exports.constVoid = exports.constUndefined;
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
function flip(f) {
    return function (b, a) { return f(a, b); };
}
exports.flip = flip;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
exports.flow = flow;
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
exports.tuple = tuple;
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
exports.increment = increment;
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
exports.decrement = decrement;
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
exports.tupled = tupled;
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
exports.untupled = untupled;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
        case 11:
            return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
        case 12:
            return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
        case 13:
            return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
        case 14:
            return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
        case 15:
            return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
        case 16:
            return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
        case 17:
            return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
        case 18:
            return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
        case 19:
            return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
        case 20:
            return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
    }
    return;
}
exports.pipe = pipe;
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
exports.hole = absurd;
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
exports.SK = SK;
/**
 * Use `Predicate` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
exports.not = not;
/**
 * Use `Endomorphism` module instead.
 *
 * @category instances
 * @since 2.10.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return ({
    concat: function (first, second) { return flow(first, second); },
    empty: identity
}); };
exports.getEndomorphismMonoid = getEndomorphismMonoid;


/***/ }),

/***/ 1840:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isNone = function (fa) { return fa._tag === 'None'; };
exports.isNone = isNone;
/** @internal */
var isSome = function (fa) { return fa._tag === 'Some'; };
exports.isSome = isSome;
/** @internal */
exports.none = { _tag: 'None' };
/** @internal */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
exports.some = some;
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft = function (ma) { return ma._tag === 'Left'; };
exports.isLeft = isLeft;
/** @internal */
var isRight = function (ma) { return ma._tag === 'Right'; };
exports.isRight = isRight;
/** @internal */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
exports.left = left;
/** @internal */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
exports.right = right;
// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var singleton = function (a) { return [a]; };
exports.singleton = singleton;
/** @internal */
var isNonEmpty = function (as) { return as.length > 0; };
exports.isNonEmpty = isNonEmpty;
/** @internal */
var head = function (as) { return as[0]; };
exports.head = head;
/** @internal */
var tail = function (as) { return as.slice(1); };
exports.tail = tail;
// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------
/** @internal */
exports.emptyReadonlyArray = [];
/** @internal */
exports.emptyRecord = {};
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
exports.has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1)); };
exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;


/***/ }),

/***/ 5189:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endsWith = exports.startsWith = exports.includes = exports.split = exports.size = exports.isEmpty = exports.empty = exports.slice = exports.trimRight = exports.trimLeft = exports.trim = exports.replace = exports.toLowerCase = exports.toUpperCase = exports.isString = exports.Show = exports.Ord = exports.Monoid = exports.Semigroup = exports.Eq = void 0;
var ReadonlyNonEmptyArray_1 = __nccwpck_require__(8630);
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Eq.equals('a', 'a'), true)
 * assert.deepStrictEqual(S.Eq.equals('a', 'b'), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Semigroup = {
    concat: function (first, second) { return first + second; }
};
/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
 * assert.deepStrictEqual(S.Monoid.concat('a', S.Monoid.empty), 'a')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Monoid = {
    concat: exports.Semigroup.concat,
    empty: ''
};
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Ord.compare('a', 'a'), 0)
 * assert.deepStrictEqual(S.Ord.compare('a', 'b'), -1)
 * assert.deepStrictEqual(S.Ord.compare('b', 'a'), 1)
 *
 * @category instances
 * @since 2.10.0
 */
exports.Ord = {
    equals: exports.Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Show.show('a'), '"a"')
 *
 * @category instances
 * @since 2.10.0
 */
exports.Show = {
    show: function (s) { return JSON.stringify(s); }
};
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.isString('a'), true)
 * assert.deepStrictEqual(S.isString(1), false)
 *
 * @category refinements
 * @since 2.11.0
 */
var isString = function (u) { return typeof u === 'string'; };
exports.isString = isString;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @category combinators
 * @since 2.11.0
 */
var toUpperCase = function (s) { return s.toUpperCase(); };
exports.toUpperCase = toUpperCase;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @category combinators
 * @since 2.11.0
 */
var toLowerCase = function (s) { return s.toLowerCase(); };
exports.toLowerCase = toLowerCase;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @category combinators
 * @since 2.11.0
 */
var replace = function (searchValue, replaceValue) { return function (s) {
    return s.replace(searchValue, replaceValue);
}; };
exports.replace = replace;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
 *
 * @category combinators
 * @since 2.11.0
 */
var trim = function (s) { return s.trim(); };
exports.trim = trim;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
 *
 * @category combinators
 * @since 2.11.0
 */
var trimLeft = function (s) { return s.trimLeft(); };
exports.trimLeft = trimLeft;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
 *
 * @category combinators
 * @since 2.11.0
 */
var trimRight = function (s) { return s.trimRight(); };
exports.trimRight = trimRight;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @category combinators
 * @since 2.11.0
 */
var slice = function (start, end) { return function (s) { return s.slice(start, end); }; };
exports.slice = slice;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty `string`.
 *
 * @since 2.10.0
 */
exports.empty = '';
/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
 *
 * @since 2.10.0
 */
var isEmpty = function (s) { return s.length === 0; };
exports.isEmpty = isEmpty;
/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.size), 3)
 *
 * @since 2.10.0
 */
var size = function (s) { return s.length; };
exports.size = size;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 2.11.0
 */
var split = function (separator) { return function (s) {
    var out = s.split(separator);
    return ReadonlyNonEmptyArray_1.isNonEmpty(out) ? out : [s];
}; };
exports.split = split;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
 *
 * @since 2.11.0
 */
var includes = function (searchString, position) { return function (s) {
    return s.includes(searchString, position);
}; };
exports.includes = includes;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
 *
 * @since 2.11.0
 */
var startsWith = function (searchString, position) { return function (s) {
    return s.startsWith(searchString, position);
}; };
exports.startsWith = startsWith;
/**
 * @example
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
 *
 * @since 2.11.0
 */
var endsWith = function (searchString, position) { return function (s) {
    return s.endsWith(searchString, position);
}; };
exports.endsWith = endsWith;


/***/ }),

/***/ 1585:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const PassThrough = __nccwpck_require__(2413).PassThrough;

module.exports = opts => {
	opts = Object.assign({}, opts);

	const array = opts.array;
	let encoding = opts.encoding;
	const buffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || buffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (buffer) {
		encoding = null;
	}

	let len = 0;
	const ret = [];
	const stream = new PassThrough({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	stream.on('data', chunk => {
		ret.push(chunk);

		if (objectMode) {
			len = ret.length;
		} else {
			len += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return ret;
		}

		return buffer ? Buffer.concat(ret, len) : ret.join('');
	};

	stream.getBufferedLength = () => len;

	return stream;
};


/***/ }),

/***/ 1766:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const bufferStream = __nccwpck_require__(1585);

function getStream(inputStream, opts) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	opts = Object.assign({maxBuffer: Infinity}, opts);

	const maxBuffer = opts.maxBuffer;
	let stream;
	let clean;

	const p = new Promise((resolve, reject) => {
		const error = err => {
			if (err) { // null check
				err.bufferedData = stream.getBufferedValue();
			}

			reject(err);
		};

		stream = bufferStream(opts);
		inputStream.once('error', error);
		inputStream.pipe(stream);

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				reject(new Error('maxBuffer exceeded'));
			}
		});
		stream.once('error', error);
		stream.on('end', resolve);

		clean = () => {
			// some streams doesn't implement the `stream.Readable` interface correctly
			if (inputStream.unpipe) {
				inputStream.unpipe(stream);
			}
		};
	});

	p.then(clean, clean);

	return p.then(() => stream.getBufferedValue());
}

module.exports = getStream;
module.exports.buffer = (stream, opts) => getStream(stream, Object.assign({}, opts, {encoding: 'buffer'}));
module.exports.array = (stream, opts) => getStream(stream, Object.assign({}, opts, {array: true}));


/***/ }),

/***/ 3798:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const EventEmitter = __nccwpck_require__(8614);
const http = __nccwpck_require__(8605);
const https = __nccwpck_require__(7211);
const PassThrough = __nccwpck_require__(2413).PassThrough;
const urlLib = __nccwpck_require__(8835);
const querystring = __nccwpck_require__(1191);
const duplexer3 = __nccwpck_require__(7994);
const isStream = __nccwpck_require__(1554);
const getStream = __nccwpck_require__(1766);
const timedOut = __nccwpck_require__(9478);
const urlParseLax = __nccwpck_require__(3194);
const lowercaseKeys = __nccwpck_require__(9662);
const isRedirect = __nccwpck_require__(4409);
const unzipResponse = __nccwpck_require__(9428);
const createErrorClass = __nccwpck_require__(4532);
const isRetryAllowed = __nccwpck_require__(841);
const Buffer = __nccwpck_require__(1867).Buffer;
const pkg = __nccwpck_require__(9248);

function requestAsEventEmitter(opts) {
	opts = opts || {};

	const ee = new EventEmitter();
	const requestUrl = opts.href || urlLib.resolve(urlLib.format(opts), opts.path);
	let redirectCount = 0;
	let retryCount = 0;
	let redirectUrl;

	const get = opts => {
		const fn = opts.protocol === 'https:' ? https : http;

		const req = fn.request(opts, res => {
			const statusCode = res.statusCode;

			if (isRedirect(statusCode) && opts.followRedirect && 'location' in res.headers && (opts.method === 'GET' || opts.method === 'HEAD')) {
				res.resume();

				if (++redirectCount > 10) {
					ee.emit('error', new got.MaxRedirectsError(statusCode, opts), null, res);
					return;
				}

				const bufferString = Buffer.from(res.headers.location, 'binary').toString();

				redirectUrl = urlLib.resolve(urlLib.format(opts), bufferString);
				const redirectOpts = Object.assign({}, opts, urlLib.parse(redirectUrl));

				ee.emit('redirect', res, redirectOpts);

				get(redirectOpts);

				return;
			}

			setImmediate(() => {
				const response = typeof unzipResponse === 'function' && req.method !== 'HEAD' ? unzipResponse(res) : res;
				response.url = redirectUrl || requestUrl;
				response.requestUrl = requestUrl;

				ee.emit('response', response);
			});
		});

		req.once('error', err => {
			const backoff = opts.retries(++retryCount, err);

			if (backoff) {
				setTimeout(get, backoff, opts);
				return;
			}

			ee.emit('error', new got.RequestError(err, opts));
		});

		if (opts.gotTimeout) {
			timedOut(req, opts.gotTimeout);
		}

		setImmediate(() => {
			ee.emit('request', req);
		});
	};

	get(opts);
	return ee;
}

function asPromise(opts) {
	return new Promise((resolve, reject) => {
		const ee = requestAsEventEmitter(opts);

		ee.on('request', req => {
			if (isStream(opts.body)) {
				opts.body.pipe(req);
				opts.body = undefined;
				return;
			}

			req.end(opts.body);
		});

		ee.on('response', res => {
			const stream = opts.encoding === null ? getStream.buffer(res) : getStream(res, opts);

			stream
				.catch(err => reject(new got.ReadError(err, opts)))
				.then(data => {
					const statusCode = res.statusCode;
					const limitStatusCode = opts.followRedirect ? 299 : 399;

					res.body = data;

					if (opts.json && res.body) {
						try {
							res.body = JSON.parse(res.body);
						} catch (e) {
							throw new got.ParseError(e, statusCode, opts, data);
						}
					}

					if (statusCode < 200 || statusCode > limitStatusCode) {
						throw new got.HTTPError(statusCode, opts);
					}

					resolve(res);
				})
				.catch(err => {
					Object.defineProperty(err, 'response', {value: res});
					reject(err);
				});
		});

		ee.on('error', reject);
	});
}

function asStream(opts) {
	const input = new PassThrough();
	const output = new PassThrough();
	const proxy = duplexer3(input, output);

	if (opts.json) {
		throw new Error('got can not be used as stream when options.json is used');
	}

	if (opts.body) {
		proxy.write = () => {
			throw new Error('got\'s stream is not writable when options.body is used');
		};
	}

	const ee = requestAsEventEmitter(opts);

	ee.on('request', req => {
		proxy.emit('request', req);

		if (isStream(opts.body)) {
			opts.body.pipe(req);
			return;
		}

		if (opts.body) {
			req.end(opts.body);
			return;
		}

		if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
			input.pipe(req);
			return;
		}

		req.end();
	});

	ee.on('response', res => {
		const statusCode = res.statusCode;

		res.pipe(output);

		if (statusCode < 200 || statusCode > 299) {
			proxy.emit('error', new got.HTTPError(statusCode, opts), null, res);
			return;
		}

		proxy.emit('response', res);
	});

	ee.on('redirect', proxy.emit.bind(proxy, 'redirect'));
	ee.on('error', proxy.emit.bind(proxy, 'error'));

	return proxy;
}

function normalizeArguments(url, opts) {
	if (typeof url !== 'string' && typeof url !== 'object') {
		throw new Error(`Parameter \`url\` must be a string or object, not ${typeof url}`);
	}

	if (typeof url === 'string') {
		url = url.replace(/^unix:/, 'http://$&');
		url = urlParseLax(url);

		if (url.auth) {
			throw new Error('Basic authentication must be done with auth option');
		}
	}

	opts = Object.assign(
		{
			protocol: 'http:',
			path: '',
			retries: 5
		},
		url,
		opts
	);

	opts.headers = Object.assign({
		'user-agent': `${pkg.name}/${pkg.version} (https://github.com/sindresorhus/got)`,
		'accept-encoding': 'gzip,deflate'
	}, lowercaseKeys(opts.headers));

	const query = opts.query;

	if (query) {
		if (typeof query !== 'string') {
			opts.query = querystring.stringify(query);
		}

		opts.path = `${opts.path.split('?')[0]}?${opts.query}`;
		delete opts.query;
	}

	if (opts.json && opts.headers.accept === undefined) {
		opts.headers.accept = 'application/json';
	}

	let body = opts.body;

	if (body) {
		if (typeof body !== 'string' && !(body !== null && typeof body === 'object')) {
			throw new Error('options.body must be a ReadableStream, string, Buffer or plain Object');
		}

		opts.method = opts.method || 'POST';

		if (isStream(body) && typeof body.getBoundary === 'function') {
			// Special case for https://github.com/form-data/form-data
			opts.headers['content-type'] = opts.headers['content-type'] || `multipart/form-data; boundary=${body.getBoundary()}`;
		} else if (body !== null && typeof body === 'object' && !Buffer.isBuffer(body) && !isStream(body)) {
			opts.headers['content-type'] = opts.headers['content-type'] || 'application/x-www-form-urlencoded';
			body = opts.body = querystring.stringify(body);
		}

		if (opts.headers['content-length'] === undefined && opts.headers['transfer-encoding'] === undefined && !isStream(body)) {
			const length = typeof body === 'string' ? Buffer.byteLength(body) : body.length;
			opts.headers['content-length'] = length;
		}
	}

	opts.method = (opts.method || 'GET').toUpperCase();

	if (opts.hostname === 'unix') {
		const matches = /(.+):(.+)/.exec(opts.path);

		if (matches) {
			opts.socketPath = matches[1];
			opts.path = matches[2];
			opts.host = null;
		}
	}

	if (typeof opts.retries !== 'function') {
		const retries = opts.retries;

		opts.retries = (iter, err) => {
			if (iter > retries || !isRetryAllowed(err)) {
				return 0;
			}

			const noise = Math.random() * 100;

			return ((1 << iter) * 1000) + noise;
		};
	}

	if (opts.followRedirect === undefined) {
		opts.followRedirect = true;
	}

	if (opts.timeout) {
		opts.gotTimeout = opts.timeout;
		delete opts.timeout;
	}

	return opts;
}

function got(url, opts) {
	try {
		return asPromise(normalizeArguments(url, opts));
	} catch (err) {
		return Promise.reject(err);
	}
}

const helpers = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

helpers.forEach(el => {
	got[el] = (url, opts) => got(url, Object.assign({}, opts, {method: el}));
});

got.stream = (url, opts) => asStream(normalizeArguments(url, opts));

for (const el of helpers) {
	got.stream[el] = (url, opts) => got.stream(url, Object.assign({}, opts, {method: el}));
}

function stdError(error, opts) {
	if (error.code !== undefined) {
		this.code = error.code;
	}

	Object.assign(this, {
		message: error.message,
		host: opts.host,
		hostname: opts.hostname,
		method: opts.method,
		path: opts.path
	});
}

got.RequestError = createErrorClass('RequestError', stdError);
got.ReadError = createErrorClass('ReadError', stdError);
got.ParseError = createErrorClass('ParseError', function (e, statusCode, opts, data) {
	stdError.call(this, e, opts);
	this.statusCode = statusCode;
	this.statusMessage = http.STATUS_CODES[this.statusCode];
	this.message = `${e.message} in "${urlLib.format(opts)}": \n${data.slice(0, 77)}...`;
});

got.HTTPError = createErrorClass('HTTPError', function (statusCode, opts) {
	stdError.call(this, {}, opts);
	this.statusCode = statusCode;
	this.statusMessage = http.STATUS_CODES[this.statusCode];
	this.message = `Response code ${this.statusCode} (${this.statusMessage})`;
});

got.MaxRedirectsError = createErrorClass('MaxRedirectsError', function (statusCode, opts) {
	stdError.call(this, {}, opts);
	this.statusCode = statusCode;
	this.statusMessage = http.STATUS_CODES[this.statusCode];
	this.message = 'Redirected 10 times. Aborting.';
});

module.exports = got;


/***/ }),

/***/ 1621:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 3038:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* Hjson https://hjson.github.io */


var common=__nccwpck_require__(5573);

function makeComment(b, a, x) {
  var c;
  if (b) c={ b: b };
  if (a) (c=c||{}).a=a;
  if (x) (c=c||{}).x=x;
  return c;
}

function extractComments(value, root) {

  if (value===null || typeof value!=='object') return;
  var comments=common.getComment(value);
  if (comments) common.removeComment(value);

  var i, length; // loop
  var any, res;
  if (Object.prototype.toString.apply(value) === '[object Array]') {
    res={ a: {} };
    for (i=0, length=value.length; i<length; i++) {
      if (saveComment(res.a, i, comments.a[i], extractComments(value[i])))
        any=true;
    }
    if (!any && comments.e){
      res.e=makeComment(comments.e[0], comments.e[1]);
      any=true;
    }
  } else {
    res={ s: {} };

    // get key order (comments and current)
    var keys, currentKeys=Object.keys(value);
    if (comments && comments.o) {
      keys=[];
      comments.o.concat(currentKeys).forEach(function(key) {
        if (Object.prototype.hasOwnProperty.call(value, key) && keys.indexOf(key)<0)
          keys.push(key);
      });
    } else keys=currentKeys;
    res.o=keys;

    // extract comments
    for (i=0, length=keys.length; i<length; i++) {
      var key=keys[i];
      if (saveComment(res.s, key, comments.c[key], extractComments(value[key])))
        any=true;
    }
    if (!any && comments.e) {
      res.e=makeComment(comments.e[0], comments.e[1]);
      any=true;
    }
  }

  if (root && comments && comments.r) {
    res.r=makeComment(comments.r[0], comments.r[1]);
  }

  return any?res:undefined;
}

function mergeStr() {
  var res="";
  [].forEach.call(arguments, function(c) {
    if (c && c.trim()!=="") {
      if (res) res+="; ";
      res+=c.trim();
    }
  });
  return res;
}

function mergeComments(comments, value) {
  var dropped=[];
  merge(comments, value, dropped, []);

  // append dropped comments:
  if (dropped.length>0) {
    var text=rootComment(value, null, 1);
    text+="\n# Orphaned comments:\n";
    dropped.forEach(function(c) {
      text+=("# "+c.path.join('/')+": "+mergeStr(c.b, c.a, c.e)).replace("\n", "\\n ")+"\n";
    });
    rootComment(value, text, 1);
  }
}

function saveComment(res, key, item, col) {
  var c=makeComment(item?item[0]:undefined, item?item[1]:undefined, col);
  if (c) res[key]=c;
  return c;
}

function droppedComment(path, c) {
  var res=makeComment(c.b, c.a);
  res.path=path;
  return res;
}

function dropAll(comments, dropped, path) {

  if (!comments) return;

  var i, length; // loop

  if (comments.a) {

    for (i=0, length=comments.a.length; i<length; i++) {
      var kpath=path.slice().concat([i]);
      var c=comments.a[i];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    }
  } else if (comments.o) {

    comments.o.forEach(function(key) {
      var kpath=path.slice().concat([key]);
      var c=comments.s[key];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    });
  }

  if (comments.e)
    dropped.push(droppedComment(path, comments.e));
}

function merge(comments, value, dropped, path) {

  if (!comments) return;
  if (value===null || typeof value!=='object') {
    dropAll(comments, dropped, path);
    return;
  }

  var i; // loop
  var setComments=common.createComment(value);

  if (path.length===0 && comments.r)
    setComments.r=[comments.r.b, comments.r.a];

  if (Object.prototype.toString.apply(value) === '[object Array]') {
    setComments.a=[];
    var a=comments.a||{}; // Treating Array like an Object, so using {} for speed
    for (var key in a) {
      if (a.hasOwnProperty(key)) {
        i=parseInt(key);
        var c=comments.a[key];
        if (c) {
          var kpath=path.slice().concat([i]);
          if (i<value.length) {
            setComments.a[i]=[c.b, c.a];
            merge(c.x, value[i], dropped, kpath);
          } else {
            dropped.push(droppedComment(kpath, c));
            dropAll(c.x, dropped, kpath);
          }
        }
      }
    }
    if (i===0 && comments.e) setComments.e=[comments.e.b, comments.e.a];
  } else {
    setComments.c={};
    setComments.o=[];
    (comments.o||[]).forEach(function(key) {
      var kpath=path.slice().concat([key]);
      var c=comments.s[key];
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        setComments.o.push(key);
        if (c) {
          setComments.c[key]=[c.b, c.a];
          merge(c.x, value[key], dropped, kpath);
        }
      } else if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    });
    if (comments.e) setComments.e=[comments.e.b, comments.e.a];
  }
}

function rootComment(value, setText, header) {
  var comment=common.createComment(value, common.getComment(value));
  if (!comment.r) comment.r=["", ""];
  if (setText || setText==="") comment.r[header]=common.forceComment(setText);
  return comment.r[header]||"";
}

module.exports={
  extract: function(value) { return extractComments(value, true); },
  merge: mergeComments,
  header: function(value, setText) { return rootComment(value, setText, 0); },
  footer: function(value, setText) { return rootComment(value, setText, 1); },
};


/***/ }),

/***/ 5573:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* Hjson https://hjson.github.io */


var os=__nccwpck_require__(2087); // will be {} when used in a browser

function tryParseNumber(text, stopAtNext) {

  // try to parse a number

  var number, string = '', leadingZeros = 0, testLeading = true;
  var at = 0;
  var ch;
  function next() {
    ch = text.charAt(at);
    at++;
    return ch;
  }

  next();
  if (ch === '-') {
    string = '-';
    next();
  }
  while (ch >= '0' && ch <= '9') {
    if (testLeading) {
      if (ch == '0') leadingZeros++;
      else testLeading = false;
    }
    string += ch;
    next();
  }
  if (testLeading) leadingZeros--; // single 0 is allowed
  if (ch === '.') {
    string += '.';
    while (next() && ch >= '0' && ch <= '9')
      string += ch;
  }
  if (ch === 'e' || ch === 'E') {
    string += ch;
    next();
    if (ch === '-' || ch === '+') {
      string += ch;
      next();
    }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }
  }

  // skip white/to (newline)
  while (ch && ch <= ' ') next();

  if (stopAtNext) {
    // end scan if we find a punctuator character like ,}] or a comment
    if (ch === ',' || ch === '}' || ch === ']' ||
      ch === '#' || ch === '/' && (text[at] === '/' || text[at] === '*')) ch = 0;
  }

  number = +string;
  if (ch || leadingZeros || !isFinite(number)) return undefined;
  else return number;
}

function createComment(value, comment) {
  if (Object.defineProperty) Object.defineProperty(value, "__COMMENTS__", { enumerable: false, writable: true });
  return (value.__COMMENTS__ = comment||{});
}

function removeComment(value) {
  Object.defineProperty(value, "__COMMENTS__", { value: undefined });
}

function getComment(value) {
  return value.__COMMENTS__;
}

function forceComment(text) {
  if (!text) return "";
  var a = text.split('\n');
  var str, i, j, len;
  for (j = 0; j < a.length; j++) {
    str = a[j];
    len = str.length;
    for (i = 0; i < len; i++) {
      var c = str[i];
      if (c === '#') break;
      else if (c === '/' && (str[i+1] === '/' || str[i+1] === '*')) {
        if (str[i+1] === '*') j = a.length; // assume /**/ covers whole block, bail out
        break;
      }
      else if (c > ' ') {
        a[j] = '# ' + str;
        break;
      }
    }
  }
  return a.join('\n');
}

module.exports = {
  EOL: os.EOL || '\n',
  tryParseNumber: tryParseNumber,
  createComment: createComment,
  removeComment: removeComment,
  getComment: getComment,
  forceComment: forceComment,
};


/***/ }),

/***/ 8042:
/***/ ((module) => {

"use strict";
/* Hjson https://hjson.github.io */


function loadDsf(col, type) {

  if (Object.prototype.toString.apply(col) !== '[object Array]') {
    if (col) throw new Error("dsf option must contain an array!");
    else return nopDsf;
  } else if (col.length === 0) return nopDsf;

  var dsf = [];
  function isFunction(f) { return {}.toString.call(f) === '[object Function]'; }

  col.forEach(function(x) {
    if (!x.name || !isFunction(x.parse) || !isFunction(x.stringify))
      throw new Error("extension does not match the DSF interface");
    dsf.push(function() {
      try {
        if (type == "parse") {
          return x.parse.apply(null, arguments);
        } else if (type == "stringify") {
          var res=x.stringify.apply(null, arguments);
          // check result
          if (res !== undefined && (typeof res !== "string" ||
            res.length === 0 ||
            res[0] === '"' ||
            [].some.call(res, function(c) { return isInvalidDsfChar(c); })))
            throw new Error("value may not be empty, start with a quote or contain a punctuator character except colon: " + res);
          return res;
        } else throw new Error("Invalid type");
      } catch (e) {
        throw new Error("DSF-"+x.name+" failed; "+e.message);
      }
    });
  });

  return runDsf.bind(null, dsf);
}

function runDsf(dsf, value) {
  if (dsf) {
    for (var i = 0; i < dsf.length; i++) {
      var res = dsf[i](value);
      if (res !== undefined) return res;
    }
  }
}

function nopDsf(/*value*/) {
}

function isInvalidDsfChar(c) {
  return c === '{' || c === '}' || c === '[' || c === ']' || c === ',';
}


function math(/*opt*/) {
  return {
    name: "math",
    parse: function (value) {
      switch (value) {
        case "+inf":
        case "inf":
        case "+Inf":
        case "Inf": return Infinity;
        case "-inf":
        case "-Inf": return -Infinity;
        case "nan":
        case "NaN": return NaN;
      }
    },
    stringify: function (value) {
      if (typeof value !== 'number') return;
      if (1 / value === -Infinity) return "-0"; // 0 === -0
      if (value === Infinity) return "Inf";
      if (value === -Infinity) return "-Inf";
      if (isNaN(value)) return "NaN";
    },
  };
}
math.description="support for Inf/inf, -Inf/-inf, Nan/naN and -0";

function hex(opt) {
  var out=opt && opt.out;
  return {
    name: "hex",
    parse: function (value) {
      if (/^0x[0-9A-Fa-f]+$/.test(value))
        return parseInt(value, 16);
    },
    stringify: function (value) {
      if (out && Number.isInteger(value))
        return "0x"+value.toString(16);
    },
  };
}
hex.description="parse hexadecimal numbers prefixed with 0x";

function date(/*opt*/) {
  return {
    name: "date",
    parse: function (value) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(?:.\d+)(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
        var dt = Date.parse(value);
        if (!isNaN(dt)) return new Date(dt);
      }
    },
    stringify: function (value) {
      if (Object.prototype.toString.call(value) === '[object Date]') {
        var dt = value.toISOString();
        if (dt.indexOf("T00:00:00.000Z", dt.length - 14) !== -1) return dt.substr(0, 10);
        else return dt;
      }
    },
  };
}
date.description="support ISO dates";

module.exports = {
  loadDsf: loadDsf,
  std: {
    math: math,
    hex: hex,
    date: date,
  },
};


/***/ }),

/***/ 5269:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* Hjson https://hjson.github.io */


module.exports = function(source, opt) {

  var common = __nccwpck_require__(5573);
  var dsf = __nccwpck_require__(8042);

  var text;
  var at;   // The index of the current character
  var ch;   // The current character
  var escapee = {
    '"': '"',
    "'": "'",
    '\\': '\\',
    '/': '/',
    b:  '\b',
    f:  '\f',
    n:  '\n',
    r:  '\r',
    t:  '\t'
  };

  var keepComments;
  var runDsf; // domain specific formats

  function resetAt() {
    at = 0;
    ch = ' ';
  }

  function isPunctuatorChar(c) {
    return c === '{' || c === '}' || c === '[' || c === ']' || c === ',' || c === ':';
  }

  // Call error when something is wrong.
  function error(m) {
    var i, col=0, line=1;
    for (i = at-1; i > 0 && text[i] !== '\n'; i--, col++) {}
    for (; i > 0; i--) if (text[i] === '\n') line++;
    throw new Error(m + " at line " + line + "," + col + " >>>" + text.substr(at-col, 20) + " ...");
  }

  function next() {
    // get the next character.
    ch = text.charAt(at);
    at++;
    return ch;
  }

  function peek(offs) {
    // range check is not required
    return text.charAt(at + offs);
  }

  function string(allowML) {
    // Parse a string value.
    // callers make sure that (ch === '"' || ch === "'")
    var string = '';

    // When parsing for string values, we must look for "/' and \ characters.
    var exitCh = ch;
    while (next()) {
      if (ch === exitCh) {
        next();
        if (allowML && exitCh === "'" && ch === "'" && string.length === 0) {
          // ''' indicates a multiline string
          next();
          return mlString();
        } else return string;
      }
      if (ch === '\\') {
        next();
        if (ch === 'u') {
          var uffff = 0;
          for (var i = 0; i < 4; i++) {
            next();
            var c = ch.charCodeAt(0), hex;
            if (ch >= '0' && ch <= '9') hex = c - 48;
            else if (ch >= 'a' && ch <= 'f') hex = c - 97 + 0xa;
            else if (ch >= 'A' && ch <= 'F') hex = c - 65 + 0xa;
            else error("Bad \\u char " + ch);
            uffff = uffff * 16 + hex;
          }
          string += String.fromCharCode(uffff);
        } else if (typeof escapee[ch] === 'string') {
          string += escapee[ch];
        } else break;
      } else if (ch === '\n' || ch === '\r') {
        error("Bad string containing newline");
      } else {
        string += ch;
      }
    }
    error("Bad string");
  }

  function mlString() {
    // Parse a multiline string value.
    var string = '', triple = 0;

    // we are at ''' +1 - get indent
    var indent = 0;
    for (;;) {
      var c=peek(-indent-5);
      if (!c || c === '\n') break;
      indent++;
    }

    function skipIndent() {
      var skip = indent;
      while (ch && ch <= ' ' && ch !== '\n' && skip-- > 0) next();
    }

    // skip white/to (newline)
    while (ch && ch <= ' ' && ch !== '\n') next();
    if (ch === '\n') { next(); skipIndent(); }

    // When parsing multiline string values, we must look for ' characters.
    for (;;) {
      if (!ch) {
        error("Bad multiline string");
      } else if (ch === '\'') {
        triple++;
        next();
        if (triple === 3) {
          if (string.slice(-1) === '\n') string=string.slice(0, -1); // remove last EOL
          return string;
        } else continue;
      } else {
        while (triple > 0) {
          string += '\'';
          triple--;
        }
      }
      if (ch === '\n') {
        string += '\n';
        next();
        skipIndent();
      } else {
        if (ch !== '\r') string += ch;
        next();
      }
    }
  }

  function keyname() {
    // quotes for keys are optional in Hjson
    // unless they include {}[],: or whitespace.

    if (ch === '"' || ch === "'") return string(false);

    var name = "", start = at, space = -1;
    for (;;) {
      if (ch === ':') {
        if (!name) error("Found ':' but no key name (for an empty key name use quotes)");
        else if (space >=0 && space !== name.length) { at = start + space; error("Found whitespace in your key name (use quotes to include)"); }
        return name;
      } else if (ch <= ' ') {
        if (!ch) error("Found EOF while looking for a key name (check your syntax)");
        else if (space < 0) space = name.length;
      } else if (isPunctuatorChar(ch)) {
        error("Found '" + ch + "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)");
      } else {
        name += ch;
      }
      next();
    }
  }

  function white() {
    while (ch) {
      // Skip whitespace.
      while (ch && ch <= ' ') next();
      // Hjson allows comments
      if (ch === '#' || ch === '/' && peek(0) === '/') {
        while (ch && ch !== '\n') next();
      } else if (ch === '/' && peek(0) === '*') {
        next(); next();
        while (ch && !(ch === '*' && peek(0) === '/')) next();
        if (ch) { next(); next(); }
      } else break;
    }
  }

  function tfnns() {
    // Hjson strings can be quoteless
    // returns string, true, false, or null.
    var value = ch;
    if (isPunctuatorChar(ch))
      error("Found a punctuator character '" + ch + "' when expecting a quoteless string (check your syntax)");

    for(;;) {
      next();
      // (detection of ml strings was moved to string())
      var isEol = ch === '\r' || ch === '\n' || ch === '';
      if (isEol ||
        ch === ',' || ch === '}' || ch === ']' ||
        ch === '#' ||
        ch === '/' && (peek(0) === '/' || peek(0) === '*')
        ) {
        // this tests for the case of {true|false|null|num}
        // followed by { ',' | '}' | ']' | '#' | '//' | '/*' }
        // which needs to be parsed as the specified value
        var chf = value[0];
        switch (chf) {
          case 'f': if (value.trim() === "false") return false; break;
          case 'n': if (value.trim() === "null") return null; break;
          case 't': if (value.trim() === "true") return true; break;
          default:
            if (chf === '-' || chf >= '0' && chf <= '9') {
              var n = common.tryParseNumber(value);
              if (n !== undefined) return n;
            }
        }
        if (isEol) {
          // remove any whitespace at the end (ignored in quoteless strings)
          value = value.trim();
          var dsfValue = runDsf(value);
          return dsfValue !== undefined ? dsfValue : value;
        }
      }
      value += ch;
    }
  }

  function getComment(cAt, first) {
    var i;
    cAt--;
    // remove trailing whitespace
    // but only up to EOL
    for (i = at - 2; i > cAt && text[i] <= ' ' && text[i] !== '\n'; i--);
    if (text[i] === '\n') i--;
    if (text[i] === '\r') i--;
    var res = text.substr(cAt, i-cAt+1);
    // return if we find anything other than whitespace
    for (i = 0; i < res.length; i++) {
      if (res[i] > ' ') {
        var j = res.indexOf('\n');
        if (j >= 0) {
          var c = [res.substr(0, j), res.substr(j+1)];
          if (first && c[0].trim().length === 0) c.shift();
          return c;
        } else return [res];
      }
    }
    return [];
  }

  function errorClosingHint(value) {
    function search(value, ch) {
      var i, k, length, res;
      switch (typeof value) {
        case 'string':
          if (value.indexOf(ch) >= 0) res = value;
          break;
        case 'object':
          if (Object.prototype.toString.apply(value) === '[object Array]') {
            for (i = 0, length = value.length; i < length; i++) {
              res=search(value[i], ch) || res;
            }
          } else {
            for (k in value) {
              if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
              res=search(value[k], ch) || res;
            }
          }
      }
      return res;
    }

    function report(ch) {
      var possibleErr=search(value, ch);
      if (possibleErr) {
        return "found '"+ch+"' in a string value, your mistake could be with:\n"+
          "  > "+possibleErr+"\n"+
          "  (unquoted strings contain everything up to the next line!)";
      } else return "";
    }

    return report('}') || report(']');
  }

  function array() {
    // Parse an array value.
    // assuming ch === '['

    var array = [];
    var comments, cAt, nextComment;
    try {
      if (keepComments) comments = common.createComment(array, { a: [] });

      next();
      cAt = at;
      white();
      if (comments) nextComment = getComment(cAt, true).join('\n');
      if (ch === ']') {
        next();
        if (comments) comments.e = [nextComment];
        return array;  // empty array
      }

      while (ch) {
        array.push(value());
        cAt = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        // note that we do not keep comments before the , if there are any
        if (ch === ',') { next(); cAt = at; white(); }
        if (comments) {
          var c = getComment(cAt);
          comments.a.push([nextComment||"", c[0]||""]);
          nextComment = c[1];
        }
        if (ch === ']') {
          next();
          if (comments) comments.a[comments.a.length-1][1] += nextComment||"";
          return array;
        }
        white();
      }

      error("End of input while parsing an array (missing ']')");
    } catch (e) {
      e.hint=e.hint||errorClosingHint(array);
      throw e;
    }
  }

  function object(withoutBraces) {
    // Parse an object value.

    var key = "", object = {};
    var comments, cAt, nextComment;

    try {
      if (keepComments) comments = common.createComment(object, { c: {}, o: []  });

      if (!withoutBraces) {
        // assuming ch === '{'
        next();
        cAt = at;
      } else cAt = 1;

      white();
      if (comments) nextComment = getComment(cAt, true).join('\n');
      if (ch === '}' && !withoutBraces) {
        if (comments) comments.e = [nextComment];
        next();
        return object;  // empty object
      }
      while (ch) {
        key = keyname();
        white();
        if (ch !== ':') error("Expected ':' instead of '" + ch + "'");
        next();
        // duplicate keys overwrite the previous value
        object[key] = value();
        cAt = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        // note that we do not keep comments before the , if there are any
        if (ch === ',') { next(); cAt = at; white(); }
        if (comments) {
          var c = getComment(cAt);
          comments.c[key] = [nextComment||"", c[0]||""];
          nextComment = c[1];
          comments.o.push(key);
        }
        if (ch === '}' && !withoutBraces) {
          next();
          if (comments) comments.c[key][1] += nextComment||"";
          return object;
        }
        white();
      }

      if (withoutBraces) return object;
      else error("End of input while parsing an object (missing '}')");
    } catch (e) {
      e.hint=e.hint||errorClosingHint(object);
      throw e;
    }
  }

  function value() {
    // Parse a Hjson value. It could be an object, an array, a string, a number or a word.

    white();
    switch (ch) {
      case '{': return object();
      case '[': return array();
      case "'":
      case '"': return string(true);
      default: return tfnns();
    }
  }

  function checkTrailing(v, c) {
    var cAt = at;
    white();
    if (ch) error("Syntax error, found trailing characters");
    if (keepComments) {
      var b = c.join('\n'), a = getComment(cAt).join('\n');
      if (a || b) {
        var comments = common.createComment(v, common.getComment(v));
        comments.r = [b, a];
      }
    }
    return v;
  }

  function rootValue() {
    white();
    var c = keepComments ? getComment(1) : null;
    switch (ch) {
      case '{': return checkTrailing(object(), c);
      case '[': return checkTrailing(array(), c);
      default: return checkTrailing(value(), c);
    }
  }

  function legacyRootValue() {
    // Braces for the root object are optional
    white();
    var c = keepComments ? getComment(1) : null;
    switch (ch) {
      case '{': return checkTrailing(object(), c);
      case '[': return checkTrailing(array(), c);
    }

    try {
      // assume we have a root object without braces
      return checkTrailing(object(true), c);
    } catch (e) {
      // test if we are dealing with a single JSON value instead (true/false/null/num/"")
      resetAt();
      try { return checkTrailing(value(), c); }
      catch (e2) { throw e; } // throw original error
    }
  }

  if (typeof source!=="string") throw new Error("source is not a string");
  var dsfDef = null;
  var legacyRoot = true;
  if (opt && typeof opt === 'object') {
    keepComments = opt.keepWsc;
    dsfDef = opt.dsf;
    legacyRoot = opt.legacyRoot !== false; // default true
  }
  runDsf = dsf.loadDsf(dsfDef, "parse");
  text = source;
  resetAt();
  return legacyRoot ? legacyRootValue() : rootValue();
};


/***/ }),

/***/ 8712:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* Hjson https://hjson.github.io */


module.exports = function(data, opt) {

  var common = __nccwpck_require__(5573);
  var dsf = __nccwpck_require__(8042);

  var plainToken = {
    obj:  [ '{', '}' ],
    arr:  [ '[', ']' ],
    key:  [ '',  '' ],
    qkey: [ '"', '"' ],
    col:  [ ':', '' ],
    com:  [ ',', '' ],
    str:  [ '', '' ],
    qstr: [ '"', '"' ],
    mstr: [ "'''", "'''" ],
    num:  [ '', '' ],
    lit:  [ '', '' ],
    dsf:  [ '', '' ],
    esc:  [ '\\', '' ],
    uni:  [ '\\u', '' ],
    rem:  [ '', '' ],
  };

  // options
  var eol = common.EOL;
  var indent = '  ';
  var keepComments = false;
  var bracesSameLine = false;
  var quoteKeys = false;
  var quoteStrings = false;
  var condense = 0;
  var multiline = 1; // std=1, no-tabs=2, off=0
  var separator = ''; // comma separator
  var dsfDef = null;
  var sortProps = false;
  var token = plainToken;

  if (opt && typeof opt === 'object') {
    opt.quotes = opt.quotes === 'always' ? 'strings' : opt.quotes; // legacy

    if (opt.eol === '\n' || opt.eol === '\r\n') eol = opt.eol;
    keepComments = opt.keepWsc;
    condense = opt.condense || 0;
    bracesSameLine = opt.bracesSameLine;
    quoteKeys = opt.quotes === 'all' || opt.quotes === 'keys';
    quoteStrings = opt.quotes === 'all' || opt.quotes === 'strings' || opt.separator === true;
    if (quoteStrings || opt.multiline == 'off') multiline = 0;
    else multiline = opt.multiline == 'no-tabs' ? 2 : 1;
    separator = opt.separator === true ? token.com[0] : '';
    dsfDef = opt.dsf;
    sortProps = opt.sortProps;

    // If the space parameter is a number, make an indent string containing that
    // many spaces. If it is a string, it will be used as the indent string.

    if (typeof opt.space === 'number') {
      indent = new Array(opt.space + 1).join(' ');
    } else if (typeof opt.space === 'string') {
      indent = opt.space;
    }

    if (opt.colors === true) {
      token = {
        obj:  [ '\x1b[37m{\x1b[0m', '\x1b[37m}\x1b[0m' ],
        arr:  [ '\x1b[37m[\x1b[0m', '\x1b[37m]\x1b[0m' ],
        key:  [ '\x1b[33m',  '\x1b[0m' ],
        qkey: [ '\x1b[33m"', '"\x1b[0m' ],
        col:  [ '\x1b[37m:\x1b[0m', '' ],
        com:  [ '\x1b[37m,\x1b[0m', '' ],
        str:  [ '\x1b[37;1m', '\x1b[0m' ],
        qstr: [ '\x1b[37;1m"', '"\x1b[0m' ],
        mstr: [ "\x1b[37;1m'''", "'''\x1b[0m" ],
        num:  [ '\x1b[36;1m', '\x1b[0m' ],
        lit:  [ '\x1b[36m', '\x1b[0m' ],
        dsf:  [ '\x1b[37m', '\x1b[0m' ],
        esc:  [ '\x1b[31m\\', '\x1b[0m' ],
        uni:  [ '\x1b[31m\\u', '\x1b[0m' ],
        rem:  [ '\x1b[35m', '\x1b[0m' ],
      };
    }

    var i, ckeys=Object.keys(plainToken);
    for (i = ckeys.length - 1; i >= 0; i--) {
      var k = ckeys[i];
      token[k].push(plainToken[k][0].length, plainToken[k][1].length);
    }
  }

  //
  var runDsf; // domain specific formats

  var commonRange='\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff';
  // needsEscape tests if the string can be written without escapes
  var needsEscape = new RegExp('[\\\\\\"\x00-\x1f'+commonRange+']', 'g');
  // needsQuotes tests if the string can be written as a quoteless string (like needsEscape but without \\ and \")
  var needsQuotes = new RegExp('^\\s|^"|^\'|^#|^\\/\\*|^\\/\\/|^\\{|^\\}|^\\[|^\\]|^:|^,|\\s$|[\x00-\x1f'+commonRange+']', 'g');
  // needsEscapeML tests if the string can be written as a multiline string (like needsEscape but without \n, \r, \\, \", \t unless multines is 'std')
  var needsEscapeML = new RegExp('\'\'\'|^[\\s]+$|[\x00-'+(multiline === 2 ? '\x09' : '\x08')+'\x0b\x0c\x0e-\x1f'+commonRange+']', 'g');
  // starts with a keyword and optionally is followed by a comment
  var startsWithKeyword = new RegExp('^(true|false|null)\\s*((,|\\]|\\}|#|//|/\\*).*)?$');
  var meta = {
    // table of character substitutions
    '\b': 'b',
    '\t': 't',
    '\n': 'n',
    '\f': 'f',
    '\r': 'r',
    '"' : '"',
    '\\': '\\'
  };
  var needsEscapeName = /[,\{\[\}\]\s:#"']|\/\/|\/\*/;
  var gap = '';
  //
  var wrapLen = 0;

  function wrap(tk, v) {
    wrapLen += tk[0].length + tk[1].length - tk[2] - tk[3];
    return tk[0] + v + tk[1];
  }

  function quoteReplace(string) {
    return string.replace(needsEscape, function (a) {
      var c = meta[a];
      if (typeof c === 'string') return wrap(token.esc, c);
      else return wrap(token.uni, ('0000' + a.charCodeAt(0).toString(16)).slice(-4));
    });
  }

  function quote(string, gap, hasComment, isRootObject) {
    if (!string) return wrap(token.qstr, '');

    needsQuotes.lastIndex = 0;
    startsWithKeyword.lastIndex = 0;

    // Check if we can insert this string without quotes
    // see hjson syntax (must not parse as true, false, null or number)

    if (quoteStrings || hasComment ||
      needsQuotes.test(string) ||
      common.tryParseNumber(string, true) !== undefined ||
      startsWithKeyword.test(string)) {

      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we first check if the string can be expressed in multiline
      // format or we must replace the offending characters with safe escape
      // sequences.

      needsEscape.lastIndex = 0;
      needsEscapeML.lastIndex = 0;
      if (!needsEscape.test(string)) return wrap(token.qstr, string);
      else if (!needsEscapeML.test(string) && !isRootObject && multiline) return mlString(string, gap);
      else return wrap(token.qstr, quoteReplace(string));
    } else {
      // return without quotes
      return wrap(token.str, string);
    }
  }

  function mlString(string, gap) {
    // wrap the string into the ''' (multiline) format

    var i, a = string.replace(/\r/g, "").split('\n');
    gap += indent;

    if (a.length === 1) {
      // The string contains only a single line. We still use the multiline
      // format as it avoids escaping the \ character (e.g. when used in a
      // regex).
      return wrap(token.mstr, a[0]);
    } else {
      var res = eol + gap + token.mstr[0];
      for (i = 0; i < a.length; i++) {
        res += eol;
        if (a[i]) res += gap + a[i];
      }
      return res + eol + gap + token.mstr[1];
    }
  }

  function quoteKey(name) {
    if (!name) return '""';

    // Check if we can insert this key without quotes

    if (quoteKeys || needsEscapeName.test(name)) {
      needsEscape.lastIndex = 0;
      return wrap(token.qkey, needsEscape.test(name) ? quoteReplace(name) : name);
    } else {
      // return without quotes
      return wrap(token.key, name);
    }
  }

  function str(value, hasComment, noIndent, isRootObject) {
    // Produce a string from value.

    function startsWithNL(str) { return str && str[str[0] === '\r' ? 1 : 0] === '\n'; }
    function commentOnThisLine(str) { return str && !startsWithNL(str); }
    function makeComment(str, prefix, trim) {
      if (!str) return "";
      str = common.forceComment(str);
      var i, len = str.length;
      for (i = 0; i < len && str[i] <= ' '; i++) {}
      if (trim && i > 0) str = str.substr(i);
      if (i < len) return prefix + wrap(token.rem, str);
      else return str;
    }

    // What happens next depends on the value's type.

    // check for DSF
    var dsfValue = runDsf(value);
    if (dsfValue !== undefined) return wrap(token.dsf, dsfValue);

    switch (typeof value) {
      case 'string':
        return quote(value, gap, hasComment, isRootObject);

      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? wrap(token.num, String(value)) : wrap(token.lit, 'null');

      case 'boolean':
        return wrap(token.lit, String(value));

      case 'object':
        // If the type is 'object', we might be dealing with an object or an array or
        // null.

        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) return wrap(token.lit, 'null');

        var comments; // whitespace & comments
        if (keepComments) comments = common.getComment(value);

        var isArray = Object.prototype.toString.apply(value) === '[object Array]';

        // Make an array to hold the partial results of stringifying this object value.
        var mind = gap;
        gap += indent;
        var eolMind = eol + mind;
        var eolGap = eol + gap;
        var prefix = noIndent || bracesSameLine ? '' : eolMind;
        var partial = [];
        var setsep;
        // condense helpers:
        var cpartial = condense ? [] : null;
        var saveQuoteStrings = quoteStrings, saveMultiline = multiline;
        var iseparator = separator ? '' : token.com[0];
        var cwrapLen = 0;

        var i, length; // loop
        var k, v, vs; // key, value
        var c, ca;
        var res, cres;

        if (isArray) {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          for (i = 0, length = value.length; i < length; i++) {
            setsep = i < length -1;
            if (comments) {
              c = comments.a[i]||[];
              ca = commentOnThisLine(c[1]);
              partial.push(makeComment(c[0], "\n") + eolGap);
              if (cpartial && (c[0] || c[1] || ca)) cpartial = null;
            }
            else partial.push(eolGap);
            wrapLen = 0;
            v = value[i];
            partial.push(str(v, comments ? ca : false, true) + (setsep ? separator : ''));
            if (cpartial) {
              // prepare the condensed version
              switch (typeof v) {
                case 'string':
                  wrapLen = 0;
                  quoteStrings = true; multiline = 0;
                  cpartial.push(str(v, false, true) + (setsep ? token.com[0] : ''));
                  quoteStrings = saveQuoteStrings; multiline = saveMultiline;
                  break;
                case 'object': if (v) { cpartial = null; break; } // falls through
                default: cpartial.push(partial[partial.length - 1] + (setsep ? iseparator : '')); break;
              }
              if (setsep) wrapLen += token.com[0].length - token.com[2];
              cwrapLen += wrapLen;
            }
            if (comments && c[1]) partial.push(makeComment(c[1], ca ? " " : "\n", ca));
          }

          if (length === 0) {
            // when empty
            if (comments && comments.e) partial.push(makeComment(comments.e[0], "\n") + eolMind);
          }
          else partial.push(eolMind);

          // Join all of the elements together, separated with newline, and wrap them in
          // brackets.

          if (partial.length === 0) res = wrap(token.arr, '');
          else {
            res = prefix + wrap(token.arr, partial.join(''));
            // try if the condensed version can fit (parent key name is not included)
            if (cpartial) {
              cres = cpartial.join(' ');
              if (cres.length - cwrapLen <= condense) res = wrap(token.arr, cres);
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.
          var commentKeys = comments ? comments.o.slice() : [];
          var objectKeys = [];
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k) && commentKeys.indexOf(k) < 0)
              objectKeys.push(k);
          }
          if(sortProps) {
            objectKeys.sort();
          }
          var keys = commentKeys.concat(objectKeys);

          for (i = 0, length = keys.length; i < length; i++) {
            setsep = i < length - 1;
            k = keys[i];
            if (comments) {
              c = comments.c[k]||[];
              ca = commentOnThisLine(c[1]);
              partial.push(makeComment(c[0], "\n") + eolGap);
              if (cpartial && (c[0] || c[1] || ca)) cpartial = null;
            }
            else partial.push(eolGap);

            wrapLen = 0;
            v = value[k];
            vs = str(v, comments && ca);
            partial.push(quoteKey(k) + token.col[0] + (startsWithNL(vs) ? '' : ' ') + vs + (setsep ? separator : ''));
            if (comments && c[1]) partial.push(makeComment(c[1], ca ? " " : "\n", ca));
            if (cpartial) {
              // prepare the condensed version
              switch (typeof v) {
                case 'string':
                  wrapLen = 0;
                  quoteStrings = true; multiline = 0;
                  vs = str(v, false);
                  quoteStrings = saveQuoteStrings; multiline = saveMultiline;
                  cpartial.push(quoteKey(k) + token.col[0] + ' ' + vs + (setsep ? token.com[0] : ''));
                  break;
                case 'object': if (v) { cpartial = null; break; } // falls through
                default: cpartial.push(partial[partial.length - 1] + (setsep ? iseparator : '')); break;
              }
              wrapLen += token.col[0].length - token.col[2];
              if (setsep) wrapLen += token.com[0].length - token.com[2];
              cwrapLen += wrapLen;
            }
          }
          if (length === 0) {
            // when empty
            if (comments && comments.e) partial.push(makeComment(comments.e[0], "\n") + eolMind);
          }
          else partial.push(eolMind);

          // Join all of the member texts together, separated with newlines
          if (partial.length === 0) {
            res = wrap(token.obj, '');
          } else {
            // and wrap them in braces
            res = prefix + wrap(token.obj, partial.join(''));
            // try if the condensed version can fit
            if (cpartial) {
              cres = cpartial.join(' ');
              if (cres.length - cwrapLen <= condense) res = wrap(token.obj, cres);
            }
          }
        }

        gap = mind;
        return res;
    }
  }


  runDsf = dsf.loadDsf(dsfDef, 'stringify');

  var res = "";
  var comments = keepComments ? comments = (common.getComment(data) || {}).r : null;
  if (comments && comments[0]) res = comments[0] + '\n';

  // get the result of stringifying the data.
  res += str(data, null, true, true);

  if (comments) res += comments[1]||"";

  return res;
};


/***/ }),

/***/ 8053:
/***/ ((module) => {

module.exports="3.2.1";


/***/ }),

/***/ 24:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/*!
 * Hjson v3.2.1
 * https://hjson.github.io
 *
 * Copyright 2014-2017 Christian Zangl, MIT license
 * Details and documentation:
 * https://github.com/hjson/hjson-js
 *
 * This code is based on the the JSON version by Douglas Crockford:
 * https://github.com/douglascrockford/JSON-js (json_parse.js, json2.js)
 */

/*

  This file creates a Hjson object:


    Hjson.parse(text, options)

      options {
        keepWsc     boolean, keep white space and comments. This is useful
                    if you want to edit an hjson file and save it while
                    preserving comments (default false)

        dsf         array of DSF (see Hjson.dsf)

        legacyRoot  boolean, support omitting root braces (default true)
      }

      This method parses Hjson text to produce an object or array.
      It can throw a SyntaxError exception.


    Hjson.stringify(value, options)

      value         any JavaScript value, usually an object or array.

      options {     all options are

        keepWsc     boolean, keep white space. See parse.

        condense    integer, will try to fit objects/arrays onto one line
                    when the output is shorter than condense characters
                    and the fragment contains no comments. Default 0 (off).

        bracesSameLine
                    boolean, makes braces appear on the same line as the key
                    name. Default false.

        quotes      string, controls how strings are displayed.
                    setting separator implies "strings"
                    "min"     - no quotes whenever possible (default)
                    "keys"    - use quotes around keys
                    "strings" - use quotes around string values
                    "all"     - use quotes around keys and string values

        multiline   string, controls how multiline strings are displayed.
                    setting quotes implies "off"
                    "std"     - strings containing \n are shown in
                                multiline format (default)
                    "no-tabs" - like std but disallow tabs
                    "off"     - show in JSON format

        separator   boolean, output a comma separator between elements. Default false.

        space       specifies the indentation of nested structures. If it is
                    a number, it will specify the number of spaces to indent
                    at each level. If it is a string (such as '\t' or '  '),
                    it contains the characters used to indent at each level.

        eol         specifies the EOL sequence (default is set by
                    Hjson.setEndOfLine())

        colors      boolean, output ascii color codes

        dsf         array of DSF (see Hjson.dsf)

        emitRootBraces
                    obsolete: will always emit braces

        sortProps
                    When serializing objects into hjson, order the keys based on
                    their UTF-16 code units order
      }

      This method produces Hjson text from a JavaScript value.

      Values that do not have JSON representations, such as undefined or
      functions, will not be serialized. Such values in objects will be
      dropped; in arrays they will be replaced with null.
      stringify(undefined) returns undefined.


    Hjson.endOfLine()
    Hjson.setEndOfLine(eol)

      Gets or sets the stringify EOL sequence ('\n' or '\r\n').
      When running with node.js this defaults to os.EOL.


    Hjson.rt { parse, stringify }

      This is a shortcut to roundtrip your comments when reading and updating
      a config file. It is the same as specifying the keepWsc option for the
      parse and stringify functions.


    Hjson.version

      The version of this library.


    Hjson.dsf

      Domain specific formats are extensions to the Hjson syntax (see
      hjson.github.io). These formats will be parsed and made available to
      the application in place of strings (e.g. enable math to allow
      NaN values).

      Hjson.dsf ontains standard DSFs that can be passed to parse
      and stringify.


    Hjson.dsf.math()

      Enables support for Inf/inf, -Inf/-inf, Nan/naN and -0.
      Will output as Inf, -Inf, NaN and -0.


    Hjson.dsf.hex(options)

      Parse hexadecimal numbers prefixed with 0x.
      set options.out = true to stringify _all_ integers as hex.


    Hjson.dsf.date(options)

      support ISO dates


  This is a reference implementation. You are free to copy, modify, or
  redistribute.

*/



var common = __nccwpck_require__(5573);
var version = __nccwpck_require__(8053);
var parse = __nccwpck_require__(5269);
var stringify = __nccwpck_require__(8712);
var comments = __nccwpck_require__(3038);
var dsf = __nccwpck_require__(8042);

module.exports={

  parse: parse,
  stringify: stringify,

  endOfLine: function() { return common.EOL; },
  setEndOfLine: function(eol) {
    if (eol === '\n' || eol === '\r\n') common.EOL = eol;
  },

  version: version,

  // round trip shortcut
  rt: {
    parse: function(text, options) {
      (options=options||{}).keepWsc=true;
      return parse(text, options);
    },
    stringify: function(value, options) {
      (options=options||{}).keepWsc=true;
      return stringify(value, options);
    },
  },

  comments: comments,

  dsf: dsf.std,

};


/***/ }),

/***/ 5098:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const net_1 = __importDefault(__nccwpck_require__(1631));
const tls_1 = __importDefault(__nccwpck_require__(4016));
const url_1 = __importDefault(__nccwpck_require__(8835));
const assert_1 = __importDefault(__nccwpck_require__(2357));
const debug_1 = __importDefault(__nccwpck_require__(8237));
const agent_base_1 = __nccwpck_require__(9690);
const parse_proxy_response_1 = __importDefault(__nccwpck_require__(595));
const debug = debug_1.default('https-proxy-agent:agent');
/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
 * the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * Outgoing HTTP requests are first tunneled through the proxy server using the
 * `CONNECT` HTTP request method to establish a connection to the proxy server,
 * and then the proxy server connects to the destination target and issues the
 * HTTP request from the proxy server.
 *
 * `https:` requests have their socket connection upgraded to TLS once
 * the connection to the proxy server has been established.
 *
 * @api public
 */
class HttpsProxyAgent extends agent_base_1.Agent {
    constructor(_opts) {
        let opts;
        if (typeof _opts === 'string') {
            opts = url_1.default.parse(_opts);
        }
        else {
            opts = _opts;
        }
        if (!opts) {
            throw new Error('an HTTP(S) proxy server `host` and `port` must be specified!');
        }
        debug('creating new HttpsProxyAgent instance: %o', opts);
        super(opts);
        const proxy = Object.assign({}, opts);
        // If `true`, then connect to the proxy server over TLS.
        // Defaults to `false`.
        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
        // Prefer `hostname` over `host`, and set the `port` if needed.
        proxy.host = proxy.hostname || proxy.host;
        if (typeof proxy.port === 'string') {
            proxy.port = parseInt(proxy.port, 10);
        }
        if (!proxy.port && proxy.host) {
            proxy.port = this.secureProxy ? 443 : 80;
        }
        // ALPN is supported by Node.js >= v5.
        // attempt to negotiate http/1.1 for proxy servers that support http/2
        if (this.secureProxy && !('ALPNProtocols' in proxy)) {
            proxy.ALPNProtocols = ['http 1.1'];
        }
        if (proxy.host && proxy.path) {
            // If both a `host` and `path` are specified then it's most likely
            // the result of a `url.parse()` call... we need to remove the
            // `path` portion so that `net.connect()` doesn't attempt to open
            // that as a Unix socket file.
            delete proxy.path;
            delete proxy.pathname;
        }
        this.proxy = proxy;
    }
    /**
     * Called when the node-core HTTP client library is creating a
     * new HTTP request.
     *
     * @api protected
     */
    callback(req, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { proxy, secureProxy } = this;
            // Create a socket connection to the proxy server.
            let socket;
            if (secureProxy) {
                debug('Creating `tls.Socket`: %o', proxy);
                socket = tls_1.default.connect(proxy);
            }
            else {
                debug('Creating `net.Socket`: %o', proxy);
                socket = net_1.default.connect(proxy);
            }
            const headers = Object.assign({}, proxy.headers);
            const hostname = `${opts.host}:${opts.port}`;
            let payload = `CONNECT ${hostname} HTTP/1.1\r\n`;
            // Inject the `Proxy-Authorization` header if necessary.
            if (proxy.auth) {
                headers['Proxy-Authorization'] = `Basic ${Buffer.from(proxy.auth).toString('base64')}`;
            }
            // The `Host` header should only include the port
            // number when it is not the default port.
            let { host, port, secureEndpoint } = opts;
            if (!isDefaultPort(port, secureEndpoint)) {
                host += `:${port}`;
            }
            headers.Host = host;
            headers.Connection = 'close';
            for (const name of Object.keys(headers)) {
                payload += `${name}: ${headers[name]}\r\n`;
            }
            const proxyResponsePromise = parse_proxy_response_1.default(socket);
            socket.write(`${payload}\r\n`);
            const { statusCode, buffered } = yield proxyResponsePromise;
            if (statusCode === 200) {
                req.once('socket', resume);
                if (opts.secureEndpoint) {
                    const servername = opts.servername || opts.host;
                    if (!servername) {
                        throw new Error('Could not determine "servername"');
                    }
                    // The proxy is connecting to a TLS server, so upgrade
                    // this socket connection to a TLS connection.
                    debug('Upgrading socket connection to TLS');
                    return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, 'host', 'hostname', 'path', 'port')), { socket,
                        servername }));
                }
                return socket;
            }
            // Some other status code that's not 200... need to re-play the HTTP
            // header "data" events onto the socket once the HTTP machinery is
            // attached so that the node core `http` can parse and handle the
            // error status code.
            // Close the original socket, and a new "fake" socket is returned
            // instead, so that the proxy doesn't get the HTTP request
            // written to it (which may contain `Authorization` headers or other
            // sensitive data).
            //
            // See: https://hackerone.com/reports/541502
            socket.destroy();
            const fakeSocket = new net_1.default.Socket();
            fakeSocket.readable = true;
            // Need to wait for the "socket" event to re-play the "data" events.
            req.once('socket', (s) => {
                debug('replaying proxy buffer for failed request');
                assert_1.default(s.listenerCount('data') > 0);
                // Replay the "buffered" Buffer onto the fake `socket`, since at
                // this point the HTTP module machinery has been hooked up for
                // the user.
                s.push(buffered);
                s.push(null);
            });
            return fakeSocket;
        });
    }
}
exports.default = HttpsProxyAgent;
function resume(socket) {
    socket.resume();
}
function isDefaultPort(port, secure) {
    return Boolean((!secure && port === 80) || (secure && port === 443));
}
function isHTTPS(protocol) {
    return typeof protocol === 'string' ? /^https:?$/i.test(protocol) : false;
}
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for (key in obj) {
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
}
//# sourceMappingURL=agent.js.map

/***/ }),

/***/ 7219:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const agent_1 = __importDefault(__nccwpck_require__(5098));
function createHttpsProxyAgent(opts) {
    return new agent_1.default(opts);
}
(function (createHttpsProxyAgent) {
    createHttpsProxyAgent.HttpsProxyAgent = agent_1.default;
    createHttpsProxyAgent.prototype = agent_1.default.prototype;
})(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
module.exports = createHttpsProxyAgent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 595:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const debug_1 = __importDefault(__nccwpck_require__(8237));
const debug = debug_1.default('https-proxy-agent:parse-proxy-response');
function parseProxyResponse(socket) {
    return new Promise((resolve, reject) => {
        // we need to buffer any HTTP traffic that happens with the proxy before we get
        // the CONNECT response, so that if the response is anything other than an "200"
        // response code, then we can re-play the "data" events on the socket once the
        // HTTP parser is hooked up...
        let buffersLength = 0;
        const buffers = [];
        function read() {
            const b = socket.read();
            if (b)
                ondata(b);
            else
                socket.once('readable', read);
        }
        function cleanup() {
            socket.removeListener('end', onend);
            socket.removeListener('error', onerror);
            socket.removeListener('close', onclose);
            socket.removeListener('readable', read);
        }
        function onclose(err) {
            debug('onclose had error %o', err);
        }
        function onend() {
            debug('onend');
        }
        function onerror(err) {
            cleanup();
            debug('onerror %o', err);
            reject(err);
        }
        function ondata(b) {
            buffers.push(b);
            buffersLength += b.length;
            const buffered = Buffer.concat(buffers, buffersLength);
            const endOfHeaders = buffered.indexOf('\r\n\r\n');
            if (endOfHeaders === -1) {
                // keep buffering
                debug('have not received end of HTTP headers yet...');
                read();
                return;
            }
            const firstLine = buffered.toString('ascii', 0, buffered.indexOf('\r\n'));
            const statusCode = +firstLine.split(' ')[1];
            debug('got proxy server response: %o', firstLine);
            resolve({
                statusCode,
                buffered
            });
        }
        socket.on('error', onerror);
        socket.on('close', onclose);
        socket.on('end', onend);
        read();
    });
}
exports.default = parseProxyResponse;
//# sourceMappingURL=parse-proxy-response.js.map

/***/ }),

/***/ 4409:
/***/ ((module) => {

"use strict";

module.exports = function (x) {
	if (typeof x !== 'number') {
		throw new TypeError('Expected a number');
	}

	return x === 300 ||
		x === 301 ||
		x === 302 ||
		x === 303 ||
		x === 305 ||
		x === 307 ||
		x === 308;
};


/***/ }),

/***/ 841:
/***/ ((module) => {

"use strict";


var WHITELIST = [
	'ETIMEDOUT',
	'ECONNRESET',
	'EADDRINUSE',
	'ESOCKETTIMEDOUT',
	'ECONNREFUSED',
	'EPIPE',
	'EHOSTUNREACH',
	'EAI_AGAIN'
];

var BLACKLIST = [
	'ENOTFOUND',
	'ENETUNREACH',

	// SSL errors from https://github.com/nodejs/node/blob/ed3d8b13ee9a705d89f9e0397d9e96519e7e47ac/src/node_crypto.cc#L1950
	'UNABLE_TO_GET_ISSUER_CERT',
	'UNABLE_TO_GET_CRL',
	'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
	'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
	'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
	'CERT_SIGNATURE_FAILURE',
	'CRL_SIGNATURE_FAILURE',
	'CERT_NOT_YET_VALID',
	'CERT_HAS_EXPIRED',
	'CRL_NOT_YET_VALID',
	'CRL_HAS_EXPIRED',
	'ERROR_IN_CERT_NOT_BEFORE_FIELD',
	'ERROR_IN_CERT_NOT_AFTER_FIELD',
	'ERROR_IN_CRL_LAST_UPDATE_FIELD',
	'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
	'OUT_OF_MEM',
	'DEPTH_ZERO_SELF_SIGNED_CERT',
	'SELF_SIGNED_CERT_IN_CHAIN',
	'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
	'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
	'CERT_CHAIN_TOO_LONG',
	'CERT_REVOKED',
	'INVALID_CA',
	'PATH_LENGTH_EXCEEDED',
	'INVALID_PURPOSE',
	'CERT_UNTRUSTED',
	'CERT_REJECTED'
];

module.exports = function (err) {
	if (!err || !err.code) {
		return true;
	}

	if (WHITELIST.indexOf(err.code) !== -1) {
		return true;
	}

	if (BLACKLIST.indexOf(err.code) !== -1) {
		return false;
	}

	return true;
};


/***/ }),

/***/ 1554:
/***/ ((module) => {

"use strict";


var isStream = module.exports = function (stream) {
	return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
};

isStream.writable = function (stream) {
	return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
};

isStream.readable = function (stream) {
	return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
};

isStream.duplex = function (stream) {
	return isStream.writable(stream) && isStream.readable(stream);
};

isStream.transform = function (stream) {
	return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
};


/***/ }),

/***/ 9662:
/***/ ((module) => {

"use strict";

module.exports = function (obj) {
	var ret = {};
	var keys = Object.keys(Object(obj));

	for (var i = 0; i < keys.length; i++) {
		ret[keys[i].toLowerCase()] = obj[keys[i]];
	}

	return ret;
};


/***/ }),

/***/ 900:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 7426:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 6143:
/***/ ((module) => {

"use strict";

module.exports = function (url) {
	if (typeof url !== 'string') {
		throw new TypeError('Expected a string, got ' + typeof url);
	}

	url = url.trim();

	if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
		return url;
	}

	return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
};


/***/ }),

/***/ 1867:
/***/ ((module, exports, __nccwpck_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __nccwpck_require__(4293)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 5882:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var url = __nccwpck_require__(8835);

function matchDomain(hostname, no_proxy) {
  var hostnameArray = hostname.split(".");
  // Remove any empty elements from the no_proxy
  var no_proxyArrayWithBlanks = no_proxy.split(".");
  var no_proxyArray = [];
  // Get rid of the trailing 0's so we match the broadest subnet
  for (var i = 0; i < no_proxyArrayWithBlanks.length; i++) {
    if (no_proxyArrayWithBlanks[i] === "") {
      continue;
    }
    no_proxyArray.push(no_proxyArrayWithBlanks[i]);
  }
  // Match in reverse order, all of the no_proxy should match
  // So that subdomains work
  // for example
  // [ 'something', 'internal', 'com' ] [ '', 'interal', 'com' ]
  // match
  // [ 'something', 'external', 'com' ] [ '', 'interal', 'com' ]
  // no match
  // [ 'something', 'internal', 'com' ] [ 'other', 'interal', 'com' ]
  // no match
  var matchedAll = no_proxyArray.length;
  var matches = 0;
  // Where to start matching
  var hostnameIndex = hostnameArray.length - 1;
  // Where to start matching
  var no_proxyIndex = no_proxyArray.length - 1;
  // Count all the matched numbers
  while (hostnameIndex > -1 && no_proxyIndex > -1) {
    if (hostnameArray[hostnameIndex] === no_proxyArray[no_proxyIndex]) {
      ++matches;
    }
    --hostnameIndex;
    --no_proxyIndex;
  }
  // If its the amount we needed then yes it is in the network
  if (matchedAll == matches) {
    return true;
  }
  // Ips didnt match its not in the network
  return false;
}

function matchNetwork(ip, network) {
  // This is lazy because we ignore whats after the slash
  // But hey at least we have no_proxy now right
  network = network.split("/")[0];
  // Make some arrays of numbers to match
  var ipArray = ip.split(".");
  var networkArrayWithZeros = network.split(".");
  var networkArray = [];
  // Get rid of the trailing 0's so we match the broadest subnet
  for (var i = 0; i < networkArrayWithZeros.length; i++) {
    if (networkArrayWithZeros[i] === "0") {
      break;
    }
    networkArray.push(networkArrayWithZeros[i]);
  }
  // The length of the networkArray without zeros is the number
  // of numbers that need to match, for example
  // ip: [ '192', '168', '0', '1' ] network: [ '192', '168' ]
  // match
  // ip: [ '192', '169', '0', '1' ] network: [ '192', '168' ]
  // no match
  // ip: [ '127', '0', '0', '1' ] network: [ '127' ]
  // match
  var matchedAll = networkArray.length;
  var matches = 0;
  // Count all the matched numbers
  for (var i = 0; i < ipArray.length && i < networkArray.length; i++) {
    if (ipArray[i] === networkArray[i]) {
      ++matches;
    }
  }
  // If its the amount we needed then yes it is in the network
  if (matchedAll == matches) {
    return true;
  }
  // Ips didnt match its not in the network
  return false;
}

function getNoProxy(options) {
  var no_proxy = "";
  if (typeof options !== "undefined") {
    if (typeof options["no_proxy"] !== "undefined") {
      no_proxy = options["no_proxy"];
    }
  } else if (typeof process.env["no_proxy"] !== "undefined") {
    no_proxy = process.env["no_proxy"];
  }
  return no_proxy.split(",");
}

function matchNoProxy(requestUrl, no_proxy) {
  var parsedUrl = url.parse(requestUrl);
  var hostname = parsedUrl.hostname;
  // If the hostname is null then dont proxy, we cant check
  if (hostname == null) {
    return false;
    // If the hostname is the no_proxy then its a match
  } else if (hostname === no_proxy) {
    return true;
    // If the ip matches a no_proxy subnet
  } else if (matchNetwork(hostname, no_proxy)) {
    return true;
    // If the host matches a domain / subdomain
  } else if (matchDomain(hostname, no_proxy)) {
    return true;
  }
  return false;
}

function shouldProxy(requestUrl, options) {
  // Get the no_proxy list
  var no_proxy = getNoProxy(options);
  // There is no no_proxy list so proxy everything
  if (no_proxy.length < 1 || no_proxy[0].length < 1) {
    return true;
  }
  // There is a no_proxy list so check if this should be proxied
  for (var i = 0; i < no_proxy.length; i++) {
    // If the requestUrl matches the no_proxy string return false
    // meaning should not proxy
    if (matchNoProxy(requestUrl, no_proxy[i])) {
      return false;
    }
  }
  // Url did not match no_proxy list so do proxy
  return true;
}

module.exports = shouldProxy;


/***/ }),

/***/ 9318:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(2087);
const tty = __nccwpck_require__(3867);
const hasFlag = __nccwpck_require__(1621);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 9478:
/***/ ((module) => {

"use strict";


module.exports = function (req, time) {
	if (req.timeoutTimer) {
		return req;
	}

	var delays = isNaN(time) ? time : {socket: time, connect: time};
	var host = req._headers ? (' to ' + req._headers.host) : '';

	if (delays.connect !== undefined) {
		req.timeoutTimer = setTimeout(function timeoutHandler() {
			req.abort();
			var e = new Error('Connection timed out on request' + host);
			e.code = 'ETIMEDOUT';
			req.emit('error', e);
		}, delays.connect);
	}

	// Clear the connection timeout timer once a socket is assigned to the
	// request and is connected.
	req.on('socket', function assign(socket) {
		// Socket may come from Agent pool and may be already connected.
		if (!(socket.connecting || socket._connecting)) {
			connect();
			return;
		}

		socket.once('connect', connect);
	});

	function clear() {
		if (req.timeoutTimer) {
			clearTimeout(req.timeoutTimer);
			req.timeoutTimer = null;
		}
	}

	function connect() {
		clear();

		if (delays.socket !== undefined) {
			// Abort the request if there is no activity on the socket for more
			// than `delays.socket` milliseconds.
			req.setTimeout(delays.socket, function socketTimeoutHandler() {
				req.abort();
				var e = new Error('Socket timed out on request' + host);
				e.code = 'ESOCKETTIMEDOUT';
				req.emit('error', e);
			});
		}
	}

	return req.on('error', clear);
};


/***/ }),

/***/ 9428:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const PassThrough = __nccwpck_require__(2413).PassThrough;
const zlib = __nccwpck_require__(8761);

module.exports = res => {
	// TODO: use Array#includes when targeting Node.js 6
	if (['gzip', 'deflate'].indexOf(res.headers['content-encoding']) === -1) {
		return res;
	}

	const unzip = zlib.createUnzip();
	const stream = new PassThrough();

	stream.httpVersion = res.httpVersion;
	stream.headers = res.headers;
	stream.rawHeaders = res.rawHeaders;
	stream.trailers = res.trailers;
	stream.rawTrailers = res.rawTrailers;
	stream.setTimeout = res.setTimeout.bind(res);
	stream.statusCode = res.statusCode;
	stream.statusMessage = res.statusMessage;
	stream.socket = res.socket;

	unzip.on('error', err => {
		if (err.code === 'Z_BUF_ERROR') {
			stream.end();
			return;
		}

		stream.emit('error', err);
	});

	res.pipe(unzip).pipe(stream);

	return stream;
};


/***/ }),

/***/ 3194:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

var url = __nccwpck_require__(8835);
var prependHttp = __nccwpck_require__(6143);

module.exports = function (x) {
	var withProtocol = prependHttp(x);
	var parsed = url.parse(withProtocol);

	if (withProtocol !== x) {
		parsed.protocol = null;
	}

	return parsed;
};


/***/ }),

/***/ 8549:
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.10.0
var slice = [].slice;

(function(root, factory) {
  if (('function' === typeof define) && (define.amd != null)) {
    return define([], factory);
  } else if ( true && exports !== null) {
    return module.exports = factory();
  } else {
    return root.UrlPattern = factory();
  }
})(this, function() {
  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
  escapeForRegex = function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  concatMap = function(array, f) {
    var i, length, results;
    results = [];
    i = -1;
    length = array.length;
    while (++i < length) {
      results = results.concat(f(array[i]));
    }
    return results;
  };
  stringConcatMap = function(array, f) {
    var i, length, result;
    result = '';
    i = -1;
    length = array.length;
    while (++i < length) {
      result += f(array[i]);
    }
    return result;
  };
  regexGroupCount = function(regex) {
    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
  };
  keysAndValuesToObject = function(keys, values) {
    var i, key, length, object, value;
    object = {};
    i = -1;
    length = keys.length;
    while (++i < length) {
      key = keys[i];
      value = values[i];
      if (value == null) {
        continue;
      }
      if (object[key] != null) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }
        object[key].push(value);
      } else {
        object[key] = value;
      }
    }
    return object;
  };
  P = {};
  P.Result = function(value, rest) {
    this.value = value;
    this.rest = rest;
  };
  P.Tagged = function(tag, value) {
    this.tag = tag;
    this.value = value;
  };
  P.tag = function(tag, parser) {
    return function(input) {
      var result, tagged;
      result = parser(input);
      if (result == null) {
        return;
      }
      tagged = new P.Tagged(tag, result.value);
      return new P.Result(tagged, result.rest);
    };
  };
  P.regex = function(regex) {
    return function(input) {
      var matches, result;
      matches = regex.exec(input);
      if (matches == null) {
        return;
      }
      result = matches[0];
      return new P.Result(result, input.slice(result.length));
    };
  };
  P.sequence = function() {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function(input) {
      var i, length, parser, rest, result, values;
      i = -1;
      length = parsers.length;
      values = [];
      rest = input;
      while (++i < length) {
        parser = parsers[i];
        result = parser(rest);
        if (result == null) {
          return;
        }
        values.push(result.value);
        rest = result.rest;
      }
      return new P.Result(values, rest);
    };
  };
  P.pick = function() {
    var indexes, parsers;
    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function(input) {
      var array, result;
      result = P.sequence.apply(P, parsers)(input);
      if (result == null) {
        return;
      }
      array = result.value;
      result.value = array[indexes];
      return result;
    };
  };
  P.string = function(string) {
    var length;
    length = string.length;
    return function(input) {
      if (input.slice(0, length) === string) {
        return new P.Result(string, input.slice(length));
      }
    };
  };
  P.lazy = function(fn) {
    var cached;
    cached = null;
    return function(input) {
      if (cached == null) {
        cached = fn();
      }
      return cached(input);
    };
  };
  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
    var endResult, parserResult, rest, results;
    rest = input;
    results = stringResult ? '' : [];
    while (true) {
      if (end != null) {
        endResult = end(rest);
        if (endResult != null) {
          break;
        }
      }
      parserResult = parser(rest);
      if (parserResult == null) {
        break;
      }
      if (stringResult) {
        results += parserResult.value;
      } else {
        results.push(parserResult.value);
      }
      rest = parserResult.rest;
    }
    if (atLeastOneResultRequired && results.length === 0) {
      return;
    }
    return new P.Result(results, rest);
  };
  P.many1 = function(parser) {
    return function(input) {
      return P.baseMany(parser, null, false, true, input);
    };
  };
  P.concatMany1Till = function(parser, end) {
    return function(input) {
      return P.baseMany(parser, end, true, true, input);
    };
  };
  P.firstChoice = function() {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function(input) {
      var i, length, parser, result;
      i = -1;
      length = parsers.length;
      while (++i < length) {
        parser = parsers[i];
        result = parser(input);
        if (result != null) {
          return result;
        }
      }
    };
  };
  newParser = function(options) {
    var U;
    U = {};
    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
      return U.pattern;
    }), P.string(options.optionalSegmentEndChar)));
    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
      return U.name;
    })));
    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
      return U.escapedChar;
    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
    U.token = P.lazy(function() {
      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
    });
    U.pattern = P.many1(P.lazy(function() {
      return U.token;
    }));
    return U;
  };
  defaultOptions = {
    escapeChar: '\\',
    segmentNameStartChar: ':',
    segmentValueCharset: 'a-zA-Z0-9-_~ %',
    segmentNameCharset: 'a-zA-Z0-9',
    optionalSegmentStartChar: '(',
    optionalSegmentEndChar: ')',
    wildcardChar: '*'
  };
  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function(node) {
        return baseAstNodeToRegexString(node, segmentValueCharset);
      });
    }
    switch (astNode.tag) {
      case 'wildcard':
        return '(.*?)';
      case 'named':
        return "([" + segmentValueCharset + "]+)";
      case 'static':
        return escapeForRegex(astNode.value);
      case 'optional':
        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
    }
  };
  astNodeToRegexString = function(astNode, segmentValueCharset) {
    if (segmentValueCharset == null) {
      segmentValueCharset = defaultOptions.segmentValueCharset;
    }
    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
  };
  astNodeToNames = function(astNode) {
    if (Array.isArray(astNode)) {
      return concatMap(astNode, astNodeToNames);
    }
    switch (astNode.tag) {
      case 'wildcard':
        return ['_'];
      case 'named':
        return [astNode.value];
      case 'static':
        return [];
      case 'optional':
        return astNodeToNames(astNode.value);
    }
  };
  getParam = function(params, key, nextIndexes, sideEffects) {
    var index, maxIndex, result, value;
    if (sideEffects == null) {
      sideEffects = false;
    }
    value = params[key];
    if (value == null) {
      if (sideEffects) {
        throw new Error("no values provided for key `" + key + "`");
      } else {
        return;
      }
    }
    index = nextIndexes[key] || 0;
    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
    if (index > maxIndex) {
      if (sideEffects) {
        throw new Error("too few values provided for key `" + key + "`");
      } else {
        return;
      }
    }
    result = Array.isArray(value) ? value[index] : value;
    if (sideEffects) {
      nextIndexes[key] = index + 1;
    }
    return result;
  };
  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
    var i, length;
    if (Array.isArray(astNode)) {
      i = -1;
      length = astNode.length;
      while (++i < length) {
        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
          return true;
        }
      }
      return false;
    }
    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, false) != null;
      case 'named':
        return getParam(params, astNode.value, nextIndexes, false) != null;
      case 'static':
        return false;
      case 'optional':
        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
    }
  };
  stringify = function(astNode, params, nextIndexes) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function(node) {
        return stringify(node, params, nextIndexes);
      });
    }
    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, true);
      case 'named':
        return getParam(params, astNode.value, nextIndexes, true);
      case 'static':
        return astNode.value;
      case 'optional':
        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
          return stringify(astNode.value, params, nextIndexes);
        } else {
          return '';
        }
    }
  };
  UrlPattern = function(arg1, arg2) {
    var groupCount, options, parsed, parser, withoutWhitespace;
    if (arg1 instanceof UrlPattern) {
      this.isRegex = arg1.isRegex;
      this.regex = arg1.regex;
      this.ast = arg1.ast;
      this.names = arg1.names;
      return;
    }
    this.isRegex = arg1 instanceof RegExp;
    if (!(('string' === typeof arg1) || this.isRegex)) {
      throw new TypeError('argument must be a regex or a string');
    }
    if (this.isRegex) {
      this.regex = arg1;
      if (arg2 != null) {
        if (!Array.isArray(arg2)) {
          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
        }
        groupCount = regexGroupCount(this.regex);
        if (arg2.length !== groupCount) {
          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
        }
        this.names = arg2;
      }
      return;
    }
    if (arg1 === '') {
      throw new Error('argument must not be the empty string');
    }
    withoutWhitespace = arg1.replace(/\s+/g, '');
    if (withoutWhitespace !== arg1) {
      throw new Error('argument must not contain whitespace');
    }
    options = {
      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
    };
    parser = newParser(options);
    parsed = parser.pattern(arg1);
    if (parsed == null) {
      throw new Error("couldn't parse pattern");
    }
    if (parsed.rest !== '') {
      throw new Error("could only partially parse pattern");
    }
    this.ast = parsed.value;
    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
    this.names = astNodeToNames(this.ast);
  };
  UrlPattern.prototype.match = function(url) {
    var groups, match;
    match = this.regex.exec(url);
    if (match == null) {
      return null;
    }
    groups = match.slice(1);
    if (this.names) {
      return keysAndValuesToObject(this.names, groups);
    } else {
      return groups;
    }
  };
  UrlPattern.prototype.stringify = function(params) {
    if (params == null) {
      params = {};
    }
    if (this.isRegex) {
      throw new Error("can't stringify patterns generated from a regex");
    }
    if (params !== Object(params)) {
      throw new Error("argument must be an object or undefined");
    }
    return stringify(this.ast, params, {});
  };
  UrlPattern.escapeForRegex = escapeForRegex;
  UrlPattern.concatMap = concatMap;
  UrlPattern.stringConcatMap = stringConcatMap;
  UrlPattern.regexGroupCount = regexGroupCount;
  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
  UrlPattern.P = P;
  UrlPattern.newParser = newParser;
  UrlPattern.defaultOptions = defaultOptions;
  UrlPattern.astNodeToRegexString = astNodeToRegexString;
  UrlPattern.astNodeToNames = astNodeToNames;
  UrlPattern.getParam = getParam;
  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
  UrlPattern.stringify = stringify;
  return UrlPattern;
});


/***/ }),

/***/ 8615:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"cloudflare","version":"2.8.0","description":"CloudFlare API client","author":"Terin Stock <terinjokes@gmail.com>","bugs":{"url":"https://github.com/cloudflare/node-cloudflare/issues"},"dependencies":{"autocreate":"^1.1.0","es-class":"^2.1.1","got":"^6.3.0","https-proxy-agent":"^5.0.0","object-assign":"^4.1.0","should-proxy":"^1.0.4","url-pattern":"^1.0.3"},"devDependencies":{"coveralls":"^2.13.1","eslint":"^4.15.0","eslint-config-es":"^0.8.12","eslint-config-prettier":"^2.9.0","eslint-plugin-eslint-comments":"^2.0.1","eslint-plugin-mocha":"^4.11.0","eslint-plugin-node":"^5.2.1","eslint-plugin-notice":"^0.5.6","eslint-plugin-prettier":"^2.4.0","eslint-plugin-promise":"^3.6.0","eslint-plugin-security":"^1.4.0","intelli-espower-loader":"^1.0.1","mocha":"^3.4.2","nyc":"^10.3.2","power-assert":"^1.4.4","prettier":"^1.9.2","testdouble":"^3.1.1"},"homepage":"https://github.com/cloudflare/node-cloudflare","keywords":["cloudflare","api"],"license":"MIT","main":"index.js","repository":{"type":"git","url":"git+https://github.com/cloudflare/node-cloudflare.git"},"scripts":{"lint":"eslint \'{index,{lib,test}/**/*}.js\'","test":"nyc --reporter=lcov --reporter=text-summary mocha --require intelli-espower-loader --recursive test","coverage":"cat ./coverage/lcov.info | coveralls"},"files":["index.js","lib"],"xo":{"space":true,"rules":{"unicorn/filename-case":0}},"publishConfig":{"tag":"next"}}');

/***/ }),

/***/ 9248:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"got","version":"6.7.1","description":"Simplified HTTP requests","license":"MIT","repository":"sindresorhus/got","maintainers":[{"name":"Sindre Sorhus","email":"sindresorhus@gmail.com","url":"sindresorhus.com"},{"name":"Vsevolod Strukchinsky","email":"floatdrop@gmail.com","url":"github.com/floatdrop"}],"engines":{"node":">=4"},"browser":{"unzip-response":false},"scripts":{"test":"xo && nyc ava","coveralls":"nyc report --reporter=text-lcov | coveralls"},"files":["index.js"],"keywords":["http","https","get","got","url","uri","request","util","utility","simple","curl","wget","fetch"],"dependencies":{"create-error-class":"^3.0.0","duplexer3":"^0.1.4","get-stream":"^3.0.0","is-redirect":"^1.0.0","is-retry-allowed":"^1.0.0","is-stream":"^1.0.0","lowercase-keys":"^1.0.0","safe-buffer":"^5.0.1","timed-out":"^4.0.0","unzip-response":"^2.0.1","url-parse-lax":"^1.0.0"},"devDependencies":{"ava":"^0.17.0","coveralls":"^2.11.4","form-data":"^2.1.1","get-port":"^2.0.0","into-stream":"^3.0.0","nyc":"^10.0.0","pem":"^1.4.4","pify":"^2.3.0","tempfile":"^1.1.1","xo":"*"},"xo":{"esnext":true},"ava":{"concurrency":4}}');

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 1765:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 1191:
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 3867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(4063);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map