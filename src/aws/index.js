/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-objects */
import {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand,
  DeleteStackCommand,
} from '@aws-sdk/client-cloudformation';

import {
  ECSClient,
  CreateClusterCommand,
  DeleteClusterCommand,
} from '@aws-sdk/client-ecs';

import executeProcess from './executeProcess.js';

const clients = {
  cloudFormation: null,
  ecs: null,
};

const initializeCfClient = async region => new CloudFormationClient({
  region,
});

const createStack = ({ StackName, TemplateBody }) => executeProcess({
  startMsg: 'Initializing CloudFormation Stack creation',
  successMsg: 'CloudFormation Stack initialized',
  client: clients.cloudFormation,
  command: new CreateStackCommand({
    Capabilities: ['CAPABILITY_NAMED_IAM', 'CAPABILITY_IAM'],
    StackName,
    TemplateBody,
  }),
});

const getStackOutputs = async ({ StackName }) => executeProcess({
  startMsg: 'Retrieving AWS resource information',
  successMsg: 'AWS resource information retrieved',
  client: clients.cloudFormation,
  command: new DescribeStacksCommand({
    StackName,
  }),
  noSpinner: true,
});

const deleteStack = async ({ StackName }) => executeProcess({
  startMsg: 'Initiating Team5 Cloudformation stack deletion',
  successMsg: 'Stack deletion initiated - it will take a few minutes to delete all AWS resources',
  client: clients.cloudFormation,
  command: new DeleteStackCommand({
    StackName,
  }),
});

const initializeEcsClient = async region => new ECSClient({
  region,
});

const createCluster = async ({ clusterName }) => executeProcess({
  startMsg: `Creating cluster ${clusterName}`,
  successMsg: `${clusterName} cluster successfully created`,
  client: clients.ecs,
  command: new CreateClusterCommand({
    clusterName,
  }),
});

const deleteCluster = async ({ cluster }) => executeProcess({
  startMsg: `Deleting cluster ${cluster}`,
  successMsg: `${cluster} cluster deleted`,
  client: clients.ecs,
  command: new DeleteClusterCommand({
    cluster,
  }),
});

export default {
  clients,
  initializeCfClient,
  initializeEcsClient,
  createStack,
  getStackOutputs,
  deleteStack,
  createCluster,
  deleteCluster,
};