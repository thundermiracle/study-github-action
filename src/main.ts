import * as core from '@actions/core';
import * as github from '@actions/github';
import { Repository } from '@octokit/graphql-schema';

async function run(): Promise<void> {
  try {
    const context = github.context;
    if (context.eventName !== 'pull_request') {
      core.info('This action only runs on pull_request events');
      return;
    }

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

    const graphqlPr = await octokit.graphql<Repository>(
      `
      query($owner: String!, $repo: String!, $pullNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $pullNumber) {
            id
            title
            author {
              login
            }
            reviewRequests(last: 10) {
              nodes {
                requestedReviewer {
                  ... on User {
                    login
                  }
                  ... on Team {
                    name
                  }
                }
              }
            }
          }
          pullRequests(first: 2, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              title
              createdAt
              author {
                login
              }
              reviewRequests(last: 10) {
                nodes {
                  requestedReviewer {
                    ... on User {
                      login
                    }
                    ... on Team {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pullNumber: context.payload.pull_request!.number,
      },
    );

    core.debug(JSON.stringify(graphqlPr, null, 2));

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
