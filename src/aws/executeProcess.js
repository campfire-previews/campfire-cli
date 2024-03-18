/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable n/no-process-exit */
/* eslint-disable perfectionist/sort-objects */
import log from '../util/log.js';

const executeProcess = async ({
  startMsg,
  successMsg,
  client,
  command,
  noSpinner,
}) => {
  let spinner;
  let awsSuccess;

  if (!noSpinner) {
    spinner = log.spin(log.secondary(startMsg));
  }

  try {
    const response = await client.send(command);
    awsSuccess = response;
  } catch (error) {
    if (noSpinner) {
      log.error(error);
    } else {
      spinner.fail(log.error(`${error.name}: ${error.message}`));
    }

    process.exit(1);
  }

  if (!noSpinner) {
    spinner.succeed(log.success(successMsg));
  }

  return awsSuccess;
};

export default executeProcess;