export const queryPullRequestsInfo = `#graphql
  query (
    $owner: String!
    $repo: String!
    $pullNumber: Int!
  ) {
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
      pullRequests(
        first: 2
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
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
  }
`;
