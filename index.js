const core = require('@actions/core');
const exec = require("@actions/github");
import {jscpd} from 'jscpd';


// const clones = jscpd(process.argv);
const clones = await detectClones({
    path: [
      __dirname + '/../fixtures'
    ],
    silent: true
  });
  console.log(clones);
async function run() {
    try {
      core.info("Hello From Duplicate Logger",clones)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();