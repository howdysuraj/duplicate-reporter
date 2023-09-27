const core = require('@actions/core');
const exec = require("@actions/github");

const jscpd = require('jscpd')

const clones = jscpd(process.argv);

async function run() {
    try {
      core.info("Hello From Duplicate Logger",clones)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();