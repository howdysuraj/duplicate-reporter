const core = require('@actions/core');
const exec = require("@actions/exec");

async function run() {
    try {
      core.info("Hello From Duplicate Logger")
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();