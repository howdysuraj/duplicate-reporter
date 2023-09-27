const core = require('@actions/core');
const exec = require("@actions/github");
import {detectClones} from 'jscpd';

const path = require('path')
// const clones = jscpd(process.argv);
// const clones = await detectClones({
//     path: [
//       __dirname +'/'
//     ],
//     silent: true
//   });
//   console.log(clones,__dirname);

//   report/jscpd-report.json
async function run() {
    try {
      let filename = path.join(process.cwd(), 'report', 'jscpd-report.json');
      const coverage = require(filename);
      console.log("coverage",coverage)
      core.info("Hello From Duplicate Logger", __dirname)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();