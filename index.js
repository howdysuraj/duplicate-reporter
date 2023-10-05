const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
let octokit;

async function generateBadges(report) {
  let badgeContent = `### Code Duplication Stats in app-v2`;
  for (const [key, value] of Object.entries(report.formats)) {
    badgeContent += `\n ![${key}](https://img.shields.io/badge/${key}-${value.total.percentage}%25-lightgrey)`;
  }
  return badgeContent;
}

async function run() {
  console.log("ref",process.env.GITHUB_REF)
  try {
    octokit = new github.getOctokit(core.getInput("token"));
    const filepath = core.getInput("path");
    const data = fs.readFileSync(
      `${process.env.GITHUB_WORKSPACE}/${filepath}`,
      "utf8"
    );
    const json = JSON.parse(data);
    const badgesString = await generateBadges(json.statistics);
    appendBadgeToReadMe(badgesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function appendBadgeToReadMe(badge) {
  const res = await octokit.request(
    `GET /repos/fylein/fyle-app/contents/README.md`,
    { ref: core.getInput("branch") }
  );
  const { path, sha, content, encoding } = res.data;
  const rawContent = Buffer.from(content, encoding).toString();
  const startIndex = rawContent.indexOf("### Code Duplication Stats in app-v2");
  const updatedContent = `${
    startIndex === -1 ? rawContent : rawContent.slice(0, startIndex)
  }\n${badge}`;
  commitNewReadme(path, sha, encoding, updatedContent);
}

async function commitNewReadme(path, sha, encoding, updatedContent) {
  try {
    await octokit.request(`PUT /repos/fylein/fyle-app/contents/README.md`, {
      message: "Added Code Duplicate Report",
      content: Buffer.from(updatedContent, "utf-8").toString(encoding),
      path,
      sha,
      branch: core.getInput("branch"),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
