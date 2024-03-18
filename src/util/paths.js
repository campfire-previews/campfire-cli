/* eslint-disable unicorn/import-style */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable perfectionist/sort-objects */
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Ends up at root level of previewApp-cli
const __dirname = dirname(fileURLToPath(import.meta.url));
const previewAppRootPath = path.join(__dirname, '/../..');

const previewAppBuildWorkflowTemplatePath = path.join(previewAppRootPath, '/templates/github/workflows/build-review-app.yml');
const userBuildWorkflowPath = path.join(process.cwd(), '/.github/workflows/build-review-app.yml');

const previewAppTeardownWorkflowPath = path.join(previewAppRootPath, '/templates/github/workflows/teardown-review-app.yml');
const userTeardownWorkflowPath = path.join(process.cwd(), '/.github/workflows/teardown-review-app.yml');

const previewAppUpdateWorkflowPath = path.join(previewAppRootPath, '/templates/github/workflows/update-review-app.yml');
const userUpdateWorkflowPath = path.join(process.cwd(), '/.github/workflows/update-review-app.yml');

const githubFolderPath = path.join(process.cwd(), '/.github');
const workflowFolderPath = path.join(process.cwd(), '/.github/workflows');

const actionFolderPaths = [
  path.join(process.cwd(), '/.github/actions'),
  path.join(process.cwd(), '/.github/actions/build-server'),
  path.join(process.cwd(), '/.github/actions/cleanup-ecs'),
  path.join(process.cwd(), '/.github/actions/clear-efs'),
  path.join(process.cwd(), '/.github/actions/launch-review-app'),
  path.join(process.cwd(), '/.github/actions/seed-db'),
];

const previewAppActionTemplatePaths = [
  path.join(previewAppRootPath, '/templates/github/actions/build-server/action.yml'),
  path.join(previewAppRootPath, '/templates/github/actions/cleanup-ecs/action.yml'),
  path.join(previewAppRootPath, '/templates/github/actions/clear-efs/action.yml'),
  path.join(previewAppRootPath, '/templates/github/actions/launch-review-app/action.yml'),
  path.join(previewAppRootPath, '/templates/github/actions/seed-db/action.yml'),
];
const userActionPaths = actionFolderPaths.slice(1).map(path => `${path}/action.yml`);

const cloudFormationTemplatePath = path.join(previewAppRootPath, 'templates/cloudformation/previewApp.yml');

export default {
  previewAppRootPath,
  previewAppBuildWorkflowTemplatePath,
  cloudFormationTemplatePath,
  userBuildWorkflowPath,
  previewAppTeardownWorkflowPath,
  userTeardownWorkflowPath,
  previewAppUpdateWorkflowPath,
  userUpdateWorkflowPath,
  githubFolderPath,
  workflowFolderPath,
  actionFolderPaths,
  previewAppActionTemplatePaths,
  userActionPaths,
};