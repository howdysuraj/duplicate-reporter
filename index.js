const core = require('@actions/core');
const exec = require("@actions/github");
import {jscpd} from 'jscpd';


const clones = jscpd(process.argv);

async function run() {
    try {
      core.info("Hello From Duplicate Logger",clones)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();