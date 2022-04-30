import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const context = github.context;

    const token = core.getInput('token');
    const ms: string = core.getInput('milliseconds');
    const name: string = core.getInput('name');

    core.debug(`[${name}] Waiting ${ms} milliseconds ...`);

    const octokit = github.getOctokit(token);

    const currentPr = await octokit.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request!.number,
    });

    core.debug(currentPr.data.user?.login || '<no user>');

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
