const { GitHub, context } = require('@actions/github');

async function run() {
  const { GITHUB_TOKEN } = process.env;
  const octokit = new GitHub(GITHUB_TOKEN);

  const prNumber = context.payload.pull_request.number;
  const { owner, repo } = context.repo;

  try {
    await octokit.pulls.createReviewRequest({
      owner,
      repo,
      pull_number: prNumber,
      reviewers: [owner],
    });

    await octokit.pulls.merge({
      owner,
      repo,
      pull_number: prNumber,
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
