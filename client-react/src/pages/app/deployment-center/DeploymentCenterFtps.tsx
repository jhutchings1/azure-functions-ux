import React, { useContext, useState } from 'react';
import { Field } from 'formik';
import { DeploymentCenterFtpsProps } from './DeploymentCenter.types';
import { MessageBarType, ActionButton } from 'office-ui-fabric-react';
import { useTranslation } from 'react-i18next';
import { deploymentCenterContent, additionalTextFieldControl } from './DeploymentCenter.styles';
import TextFieldNoFormik from '../../../components/form-controls/TextFieldNoFormik';
import TextField from '../../../components/form-controls/TextField';
import CustomBanner from '../../../components/CustomBanner/CustomBanner';
import { DeploymentCenterContext } from './DeploymentCenterContext';
import CustomFocusTrapCallout from '../../../components/CustomCallout/CustomFocusTrapCallout';

const DeploymentCenterFtps: React.FC<DeploymentCenterFtpsProps> = props => {
  const { t } = useTranslation();
  const { publishingProfile, publishingUser, resetApplicationPassword, formProps } = props;

  const [isResetCalloutHidden, setIsResetCalloutHidden] = useState<boolean>(true);

  const ftpsEndpoint = publishingProfile && publishingProfile.publishUrl.toLocaleLowerCase().replace('ftp:/', 'ftps:/');
  const webProviderUsername = publishingUser && publishingUser.properties.publishingUserName;
  const deploymentCenterContext = useContext(DeploymentCenterContext);

  const siteDescriptor = deploymentCenterContext && deploymentCenterContext.siteDescriptor;
  const sampleAppNameDomain =
    siteDescriptor && siteDescriptor.slot
      ? `${siteDescriptor.site}-${siteDescriptor.slot}`
      : siteDescriptor && siteDescriptor.site
      ? siteDescriptor.site
      : '';

  const sampleWebProviderDomainUsername = webProviderUsername
    ? `${sampleAppNameDomain}\\${webProviderUsername}`
    : `${sampleAppNameDomain}\\${t('deploymentCenterFtpsUserScopeSampleUsername')}`;

  const toggleResetCalloutVisibility = () => {
    setIsResetCalloutHidden(!isResetCalloutHidden);
  };

  const resetApplicationPasswordFromCallout = () => {
    resetApplicationPassword();
    setIsResetCalloutHidden(true);
  };

  return (
    <div className={deploymentCenterContent}>
      {deploymentCenterContext && !deploymentCenterContext.hasWritePermission && (
        <CustomBanner message={t('deploymentCenterFtpsWritePermissionRequired')} type={MessageBarType.blocked} />
      )}

      <p>{t('deploymentCenterFtpsDescription')}</p>
      <TextFieldNoFormik
        id="deployment-center-ftps-endpoint"
        label={t('deploymentCenterFtpsEndpointLabel')}
        widthOverride="100%"
        value={ftpsEndpoint}
        copyButton={true}
        disabled={true}
      />

      <h3>{t('deploymentCenterFtpsApplicationScopeTitle')}</h3>
      <p>{t('deploymentCenterFtpsApplicationScopeDescription')}</p>

      <TextFieldNoFormik
        id="deployment-center-ftps-application-username"
        label={t('deploymentCenterFtpsUsernameLabel')}
        widthOverride="100%"
        value={publishingProfile && publishingProfile.userName}
        copyButton={true}
        disabled={true}
      />

      <TextFieldNoFormik
        id="deployment-center-ftps-application-password"
        label={t('deploymentCenterFtpsPasswordLabel')}
        widthOverride="100%"
        value={publishingProfile && publishingProfile.userPWD}
        copyButton={true}
        disabled={true}
        hideShowButton={{}}
        additionalControls={[
          <ActionButton
            id="deployment-center-ftps-application-password-reset"
            key="deployment-center-ftps-application-password-reset"
            className={additionalTextFieldControl}
            ariaLabel={t('resetPublishProfileAriaLabel')}
            onClick={toggleResetCalloutVisibility}
            iconProps={{ iconName: 'refresh' }}>
            {t('reset')}
          </ActionButton>,
        ]}
      />

      <CustomFocusTrapCallout
        target="#deployment-center-ftps-application-password-reset"
        onDismissFunction={toggleResetCalloutVisibility}
        setInitialFocus={true}
        hidden={isResetCalloutHidden}
        title={t('resetPublishProfileConfirmationTitle')}
        description={t('resetPublishProfileConfirmationDescription')}
        primaryButtonTitle={t('reset')}
        primaryButtonFunction={resetApplicationPasswordFromCallout}
        defaultButtonTitle={t('cancel')}
        defaultButtonFunction={toggleResetCalloutVisibility}
      />

      <h3>{t('deploymentCenterFtpsUserScopeTitle')}</h3>
      <p>{t('deploymentCenterFtpsUserScopeDescription').format(sampleWebProviderDomainUsername)}</p>

      <Field
        id="deployment-center-ftps-provider-username"
        name="publishingUsername"
        component={TextField}
        widthOverride="100%"
        label={t('deploymentCenterFtpsUsernameLabel')}
      />

      <Field
        id="deployment-center-ftps-provider-password"
        name="publishingPassword"
        component={TextField}
        widthOverride="100%"
        label={t('deploymentCenterFtpsPasswordLabel')}
        hideShowButton={{ emptyDefaultValue: !formProps || !formProps.values.publishingPassword }}
      />

      <Field
        id="deployment-center-ftps-provider-confirm-password"
        name="publishingConfirmPassword"
        component={TextField}
        widthOverride="100%"
        label={t('deploymentCenterFtpsConfirmPasswordLabel')}
        hideShowButton={{ emptyDefaultValue: !formProps || !formProps.values.publishingConfirmPassword }}
      />
    </div>
  );
};

export default DeploymentCenterFtps;
