import { ArmObj, ArmArray } from '../../../models/arm-obj';
import { PublishingCredentials, PublishingUser, PublishingProfile } from '../../../models/site/publish';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { ScmTypes } from '../../../models/site/config';
import moment from 'moment';
import { Uri } from 'monaco-editor';
import { GitHubUser } from '../../../models/github';

export enum ContainerOptions {
  docker = 'docker',
  compose = 'compose',
  kubernetes = 'kube',
}

export enum ContainerRegistrySources {
  acr = 'acr',
  docker = 'docker',
  privateRegistry = 'privateRegistry',
}

export enum ContainerDockerAccessTypes {
  public = 'public',
  private = 'private',
}

export enum DeploymentStatus {
  Pending,
  Building,
  Deploying,
  Failed,
  Success,
}

export type DeploymentCenterContainerProps = DeploymentCenterContainerLogsProps & DeploymentCenterFtpsProps;

export type DeploymentCenterCodeProps = DeploymentCenterCodeLogsProps & DeploymentCenterFtpsProps;

export type DeploymentCenterYupValidationSchemaType = Yup.ObjectSchema<Yup.Shape<object, DeploymentCenterFormData>>;

export type DeploymentCenterFormData = DeploymentCenterCommonFormData & DeploymentCenterContainerFormData;

export interface DeploymentCenterCommonFormData {
  publishingUsername: string;
  publishingPassword: string;
  publishingConfirmPassword: string;
  scmType: ScmTypes;
}

export interface DeploymentCenterContainerFormData {
  option: ContainerOptions;
  registrySource: ContainerRegistrySources;
  dockerAccessType: ContainerDockerAccessTypes;
  serverUrl: string;
  image: string;
  tag: string;
  username: string;
  password: string;
  command: string;
  cicd: boolean;
}

export interface DeploymentCenterFieldProps {
  formProps?: FormikProps<DeploymentCenterFormData>;
}

export interface DeploymentCenterContainerLogsProps {
  isLoading: boolean;
  logs?: string;
}

export interface DeploymentCenterCodeLogsProps {
  isLoading: boolean;
  deployments?: ArmArray<DeploymentProperties>;
  deploymentsError?: string;
  goToSettings?: () => void;
}

export interface DeploymentCenterCommitLogsProps {
  commitId?: string;
}

export interface DeploymentCenterFtpsProps extends DeploymentCenterFieldProps {
  isLoading: boolean;
  resetApplicationPassword: () => void;
  publishingCredentials?: ArmObj<PublishingCredentials>;
  publishingUser?: ArmObj<PublishingUser>;
  publishingProfile?: PublishingProfile;
}

export interface DeploymentCenterFormProps {
  isLoading: boolean;
  refresh: () => void;
  showPublishProfilePanel: () => void;
  formData?: DeploymentCenterFormData;
  formValidationSchema?: DeploymentCenterYupValidationSchemaType;
}

export type DeploymentCenterContainerFormProps = DeploymentCenterContainerProps & DeploymentCenterFormProps;

export type DeploymentCenterCodeFormProps = DeploymentCenterCodeProps & DeploymentCenterFormProps;

export interface DeploymentCenterCommandBarProps {
  isLoading: boolean;
  saveFunction: () => void;
  discardFunction: () => void;
  showPublishProfilePanel: () => void;
  refresh: () => void;
}

export interface DeploymentCenterPublishProfilePanelProps {
  isPanelOpen: boolean;
  dismissPanel: () => void;
  resetApplicationPassword: () => void;
}

export interface DeploymentCenterPublishProfileCommandBarProps {
  resetApplicationPassword: () => void;
}

export interface DeploymentCenterGitHubProviderProps extends DeploymentCenterFieldProps {
  authorizeGitHubAccount: () => void;
  gitHubAccountStatusMessage?: string;
  gitHubUser?: GitHubUser;
}

// TODO (t-kakan): Verify all properties are guaranteed
export interface DeploymentProperties {
  id: string;
  status: DeploymentStatus;
  status_text: string;
  author_email: string;
  author: string;
  deployer: string;
  message: string;
  progress: string;
  received_time: string;
  start_time: string;
  complete: boolean;
  active: string;
  is_temp: boolean;
  is_readonly: boolean;
  url: Uri;
  log_url: Uri;
  site_name: string;
  end_time?: string;
  last_success_end_time?: string;
}

export interface DeploymentLogsItem {
  log_time: string;
  id: string;
  message: string;
  details_url: string;
}

export interface DateTimeObj {
  rawTime: moment.Moment;
}

export interface CodeDeploymentsRow {
  index: number;
  rawTime: moment.Moment;
  displayTime: string;
  commit: JSX.Element;
  checkinMessage: string;
  status: string;
}
