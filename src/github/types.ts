/**
 * Domain types for github-snapshot.
 *
 * These are the shapes our code works with — flatter and friendlier than the
 * raw GraphQL responses. The mapping from GraphQL → these types lives in
 * queries.ts.
 */

/** A single value for a project's custom field, flattened to a primitive. */
export type FieldValue = string | number | null;

/** A row in a project — usually an Issue, sometimes a PR or DraftIssue. */
export interface ProjectItem {
  /** GitHub's internal node ID (useful for stable references). */
  id: string;
  /** Discriminator for what kind of content this row represents. */
  contentType: "Issue" | "PullRequest" | "DraftIssue";

  // Built-in issue/PR metadata. All optional because draft issues lack most.
  number: number | null;
  title: string;
  url: string | null;
  state: string | null; // OPEN, CLOSED, MERGED
  repository: string | null; // "owner/repo"
  assignees: string[];
  labels: string[];
  milestone: string | null;
  issueType: string | null; // beta: bug, feature, task, etc.
  parentIssue: string | null; // beta: parent issue URL if any

  createdAt: string; // ISO 8601
  updatedAt: string;
  closedAt: string | null;

  /** All custom project fields, flattened to primitives. */
  fields: Record<string, FieldValue>;
}

/** A project plus its items. */
export interface ProjectSnapshot {
  id: string;
  title: string;
  number: number;
  url: string;
  /** Names of all custom fields that appear on this project, in order. */
  fieldNames: string[];
  items: ProjectItem[];
}

/** A single issue with everything needed to render it as a PDF. */
export interface IssueSnapshot {
  owner: string;
  repo: string;
  number: number;
  title: string;
  url: string;
  state: string;
  author: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;

  assignees: string[];
  labels: string[];
  milestone: string | null;
  issueType: string | null;
  parentIssue: string | null;

  bodyMarkdown: string;
  comments: IssueComment[];

  /** Issue-level custom fields (the IssueFields beta), flattened to primitives. */
  fields: Record<string, FieldValue>;
}

export interface IssueComment {
  author: string | null;
  createdAt: string;
  bodyMarkdown: string;
}
