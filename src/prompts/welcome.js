/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-objects */
// eslint-disable-next-line unicorn/filename-case
import inquirer from 'inquirer';
import log from '../util/log.js';

const welcome = async () => {
  // log.printLogo()
  log.header('Welcome to PreviewApp-CLI!');

  log.text('\nTo help you get set up, please make sure you have your AWS credentials configured with the CLI.\n');

  const response = await inquirer.prompt([
  {
    name: 'awsRegion',
    message: 'What AWS region do you want PreviewApp to operate in?',
    type: 'input',
    default: 'us-east-1',
  }]);
  return response;
};

export default welcome;