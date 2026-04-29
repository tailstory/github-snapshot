import { graphql } from "@octokit/graphql";

import type { graphql as GraphQL } from "@octokit/graphql/types";

/**
 * Build an Octokit GraphQL client authenticated with the provided token.
 *
 * The client is request-scoped: build it once per incoming request and pass
 * it down. Don't cache it at module scope — that would mean every request
 * shares the same auth, which works in single-tenant deployments but is the
 * kind of footgun worth avoiding from the start.
 */
export function makeClient(token: string): GraphQL {
  return graphql.defaults({
    headers: {
      authorization: `bearer ${token}`,
      "user-agent": "github-snapshot",
      // Opt into preview schemas. Comma-separated if more get added later.
      "graphql-features": "issue_fields,issue_dependencies",
    },
  });
}
