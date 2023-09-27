const core = require('@actions/core');
const exec = require("@actions/github");
import {detectClones} from 'jscpd';


// const clones = jscpd(process.argv);
const clones = await detectClones({
    path: [
      __dirname +'/'
    ],
    silent: true
  });
  console.log(clones,__dirname);
async function run() {
    try {
      core.info("Hello From Duplicate Logger",clones, __dirname)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();