/* eslint-disable unicorn/filename-case */
/* eslint-disable perfectionist/sort-objects */
/* eslint-disable perfectionist/sort-imports */
import inquirer from 'inquirer';
import log from '../util/log.js';

const confirmDestroy = async () => {
  log.warn('This will delete all PreviewApp code and infrastructure.');
  log.warn('It is essential to close all open pull requests before proceeding.');
  const response = await inquirer.prompt([{
    name: 'closedAllPrs',
    message: 'Have you closed all PRs in PreviewApp repositories?',
    type: 'list',
    choices: [{ name: 'No' }, { name: 'Yes' }],
  },
  {
    name: 'iAmSure',
    message: 'Are you sure that you want to remove PreviewApp?',
    type: 'list',
    choices: [{ name: 'No' }, { name: 'Yes, destroy PreviewApp' }],
  }]);
  return response;
};

export default confirmDestroy;