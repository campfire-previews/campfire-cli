/* eslint-disable perfectionist/sort-objects */
import log from './log.js';

/* eslint-disable no-await-in-loop */

// Same at `setTimeout`, but `setTimeout` is only available in browsers
const sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

// Display loading circle until 
const waitForState = async ({
  startMsg,
  successMsg,
  desiredState,
  describeFn,
  describeArgs,
  resCallback,
}) => {
  const spinner = log.spin(startMsg);
  let resourceState = '';

  while (resourceState !== desiredState) {
    sleep(500);

    const response = await describeFn(describeArgs);
    resourceState = resCallback(response);
  }

  spinner.succeed(log.success(successMsg));
};

// const waitForDeletion = (describeFn, resourceId) => {

// };

export default waitForState;