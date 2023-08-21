const { GitHub, context } = require('@actions/github');

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = new GitHub(token);

  const prNumber = context.payload.pull_request.number;

  try {
    await octokit.pulls.createReviewRequest({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
      reviewers: [`${context.repo.owner}`],
    });

    await octokit.pulls.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
