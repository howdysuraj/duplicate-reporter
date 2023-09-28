const core = require('@actions/core');
const fs = require('fs');

async function run() {
    try {
      const filepath = core.getInput("path");
      const data = fs.readFileSync(`${process.env.GITHUB_WORKSPACE}/${filepath}`, 'utf8');
      const json = JSON.parse(data);
      core.info(json.statistics.detectionDate)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();