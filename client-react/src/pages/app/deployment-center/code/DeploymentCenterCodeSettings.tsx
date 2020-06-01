import React from 'react';
import { DeploymentCenterFieldProps, AppTypes } from '../DeploymentCenter.types';
import DeploymentCenterCodeSource from './DeploymentCenterCodeSource';
import DeploymentCenterGitHubDataLoader from '../github-provider/DeploymentCenterGitHubDataLoader';
import { ScmTypes } from '../../../../models/site/config';

const DeploymentCenterCodeSettings: React.FC<DeploymentCenterFieldProps> = props => {
  const { formProps } = props;
  const isGitHubSource = formProps && formProps.values.scmType === ScmTypes.GitHub;
  return (
    <>
      <DeploymentCenterCodeSource />
      {isGitHubSource && <DeploymentCenterGitHubDataLoader formProps={formProps} appType={AppTypes.Code} />}
    </>
  );
};

export default DeploymentCenterCodeSettings;
