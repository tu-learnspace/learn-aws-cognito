import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tabs,
  TabItem,
  Loader,
  Button,
  TextField,
  PasswordField,
  Flex,
  Heading,
  useTheme,
} from '@aws-amplify/ui-react';
import '@fontsource/inter/variable.css';
import '@aws-amplify/ui-react/styles.css';

import useHooks from './hooks';
import './styles/styles.css';

const LoginPage = () => {
  const { t } = useTranslation();
  const { tokens } = useTheme();
  const {
    states: {
      isBackdropOpen,
      isConfirmCodePopUpOpen,
      hasEmailError,
      emailErrorMessage,
      hasUsernameError,
      usernameErrorMessage,
      hasPasswordError,
      passwordErrorMessage,
    },
    handlers: {
      handleSignIn,
      handleSignUp,
      onEmailInputChange,
      onPasswordInputChange,
      onConfirmPasswordInputChange,
      onConfirmCodeInputChange,
      onUsernameInputChange,
      handleCloseButtonClick,
      handleConfirmButtonClick,
      handleResendButtonClick,
      handleForgotPassword,
      handleGoogleSignIn,
      handleHostedUISignIn,
    }
  } = useHooks();

  return (
    <>
      {
        isBackdropOpen && (
          <div className='Backdrop'>
            <Loader width="3rem" height="3rem" />
          </div>
        )
      }
      {
        isConfirmCodePopUpOpen && (
          <div className='Backdrop'>
            <div className='ConfirmationCode'>
              <Flex direction="column" gap={tokens.space.medium}>
                <Button className='CloseButton' onClick={handleCloseButtonClick}>x</Button>
                <Heading level={4}>Check Your Email for a Verification Code</Heading>
                <TextField
                  label="Confirmation Code"
                  name="confirmation-code"
                  onChange={onConfirmCodeInputChange}
                />
                <Button onClick={handleConfirmButtonClick}>Confirm</Button>
                <Button onClick={handleResendButtonClick}>Resend</Button>
              </Flex>
            </div>
          </div>
        )
      }
      <div className='LoginPage'>
        <div className='Login'>
          <Tabs
            spacing="equal"
            justifyContent="flex-start">
            <TabItem title="Sign In">
              <Button>{t('signInAmazon')}</Button>
              <Button>{t('signInApple')}</Button>
              <Button>{t('signInFacebook')}</Button>
              <Button onClick={handleGoogleSignIn}>{t('signInGoogle')}</Button>
              <Button onClick={handleHostedUISignIn}>{t('signInHostedUI')}</Button>
              - or -
              <div className='TextField'>
                <TextField
                  placeholder="Username"
                  isRequired
                  hasError={hasUsernameError}
                  onChange={onUsernameInputChange}
                  errorMessage={usernameErrorMessage}
                />
                <PasswordField
                  autoComplete= "new-password"
                  name="password"
                  placeholder="Password"
                  isRequired
                  onChange={onPasswordInputChange}
                />
              </div>
              <Button loadingText="Signing You In..." onClick={handleSignIn} ariaLabel="">{t('signIn')}</Button>
              <Button variation="link" onClick={handleForgotPassword}>Forget password</Button>
            </TabItem>
            <TabItem title="Create account">
              <Button>{t('signUpAmazon')}</Button>
              <Button>{t('signUpApple')}</Button>
              <Button>{t('signUpFacebook')}</Button>
              <Button>{t('signUpGoogle')}</Button>
              - or -
              <div className='TextField'>
                <TextField
                  placeholder="Username"
                  isRequired
                  hasError={hasUsernameError}
                  onChange={onUsernameInputChange}
                  errorMessage={usernameErrorMessage}
                />
                <TextField
                  placeholder="Email"
                  isRequired
                  hasError={hasEmailError}
                  onChange={onEmailInputChange}
                  errorMessage={emailErrorMessage}
                />
                <PasswordField
                  name="password"
                  placeholder="Password"
                  isRequired
                  hasError={hasPasswordError}
                  errorMessage={passwordErrorMessage}
                  onChange={onPasswordInputChange}
                />
                <PasswordField
                  name="confirm-password"
                  placeholder="Confirm Password"
                  isRequired
                  hasError={hasPasswordError}
                  onChange={onConfirmPasswordInputChange}
                />
              </div>
              <Button loadingText="Signing You Up..." onClick={handleSignUp} ariaLabel="">{t('signUp')}</Button>
            </TabItem>
            <TabItem title="Confirm">
              <Flex direction="column" gap={tokens.space.medium}>
                <Heading level={4}>Verify account with Code</Heading>
                <TextField
                  label="Username"
                  name="username"
                  isRequired
                  hasError={hasUsernameError}
                  onChange={onUsernameInputChange}
                  errorMessage={usernameErrorMessage}
                />
                <TextField
                  label="Confirmation Code"
                  name="confirmation-code"
                  onChange={onConfirmCodeInputChange}
                />
                <Button onClick={handleConfirmButtonClick}>Confirm</Button>
                <Button onClick={handleResendButtonClick}>Resend</Button>
              </Flex>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
