const core = require("@actions/core");
const fs = require("fs");
const github = require("@actions/github");
let octokit;


async function generateBadges(report) {
  let string = `### Code Duplication Stats in app-v2`;
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
    const badgesString = await generateBadges(json.statistics);
    appendBadgeToReadMe(badgesString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function appendBadgeToReadMe(badge) {
  // const res = await octokit.request(`GET /repos/fylein/fyle-app/README.md`);

  const res = await octokit.request("GET /repos/fylein/fyle-app/readme", {
    owner: "OWNER",
    repo: "REPO",
    branch: "duplicate-logger",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const { path, sha, content, encoding } = res.data;
  console.log("ssshshs", sha);
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
      message: "Update README",
      content: Buffer.from(updatedContent, "utf-8").toString(encoding),
      path,
      sha,
      owner: "fylein",
      repo: "fyle-app",
      branch: "duplicate-logger",
    });
  } catch (err) {
    console.log(err);
  }
}

run();
