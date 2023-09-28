const core = require('@actions/core');
const fs = require('fs');

async function generateBadges(report){
   const badges = report.formats.map( type => {
    return ` ![${type}](https://img.shields.io/badge/${type}-${type.total.percentage}%25-${color}) `
   })
   return badges.join(' \n');
}

async function run() {
    try {
      const filepath = core.getInput("path");
      const data = fs.readFileSync(`${process.env.GITHUB_WORKSPACE}/${filepath}`, 'utf8');
      const json = JSON.parse(data);
      core.info(json.statistics)
      const badgesString = await generateBadges(json.statistics)
      core.info(badgesString)
    } catch (error) {
        core.setFailed(error.message);
    }
}


run();