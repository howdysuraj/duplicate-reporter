const core = require('@actions/core');
const exec = require("@actions/github");
import {detectClones} from 'jscpd';
const fs = require('fs');
const path = require('path')

async function run() {
    try {
      const filepath = core.getInput("path");
      const data = fs.readFileSync(`${process.env.GITHUB_WORKSPACE}/${filepath}`, 'utf8');
      const json = JSON.parse(data);
      core.info(json)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();