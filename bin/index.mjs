#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ncp from 'ncp';
import commandLineArgs from 'command-line-args';

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true }
]

const options = commandLineArgs(optionDefinitions);

const dest = options.src?`${options.src}`:'new-tal-app';

console.log(options)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let ncpConfig = {
    clobber: false
}
console.time('Built TAL App')
ncp(path.resolve(__dirname, '../dist'), dest,ncpConfig,er=>{
    if(er) return console.log(er, "Please Try Again");
    console.timeEnd('Built TAL App')
    console.log(`Now just cd into ${dest} and run 'npm i'`)
});
