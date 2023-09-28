const core = require("@actions/core");
const fs = require("fs");
const github = require("@actions/github")
let octokit;



async function generateBadges(report) {
  let string = ``;
  for (const [key, value] of Object.entries(report.formats)) {
    console.log(`${key}: ${value}`);
    string += `\n ![${key}](https://img.shields.io/badge/${key}-${value.total.percentage}%25-lightgrey)`;
  }
  return string;
}

async function run() {
  try {
    octokit = new github.getOctokit(core.getInput("token"));
    const filepath = core.getInput("path");
    const data = fs.readFileSync(
      `${process.env.GITHUB_WORKSPACE}/${filepath}`,
      "utf8"
    );
    const json = JSON.parse(data);
    core.info(json.statistics);
    const badgesString = await generateBadges(json.statistics);
    core.info(badgesString);
    appendBadgeToReadMe()
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function appendBadgeToReadMe(){
    const res = await octokit.request(`GET /repos/fylein/fyle-app/README.md`);
    const { path, sha, content, encoding } = res.data;
    const rawContent = Buffer.from(content, encoding).toString();
    const startIndex = rawContent.indexOf("## Other Projects");
    core.info(res)
}

run();
