import { Auth } from 'aws-amplify'
import appConfig from 'appConfig';


Auth.configure({
  // (optional) - Amazon Cognito User Pool ID
  userPoolId: appConfig.userPoolId,
  // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
  // read more: https://github.com/aws-amplify/amplify-js/issues/3455
  userPoolWebClientId: appConfig.clientId,
  // (optional) - Hosted UI configuration
  // oauth: {
  //   region: 'us-east-1',
  //   domain: 'globomanticscongnito.auth.us-east-1.amazoncognito.com',
  //   scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  //   redirectSignIn: 'https://127.0.0.1:8080',
  //   redirectSignOut: 'https://127.0.0.1:8080',
  //   responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  // }
});

export async function getCurrentUser() {
  return await Auth.currentAuthenticatedUser();
}

export const onLogin = async ({ username, password }) => {
  const user_name = username + '@';
  const result = await Auth.signIn(user_name, password);

  if (result.challengeName === 'SOFTWARE_TOKEN_MFA') {
    const verificationCode = prompt('Enter your TOTP token');
    const confirmSignInResult = await Auth.confirmSignIn(result, verificationCode, 'SOFTWARE_TOKEN_MFA');
    console.log('[userManager][onLogin] confirmSignInResult: ', confirmSignInResult);
  }

  return await getCurrentUser();
}

export const onSignUp = async ({ emailValue, passwordValue }) => {
  const username = emailValue + '@';
  return await Auth.signUp({
    username,
    password: passwordValue,
    attributes: {
      email: emailValue
    }
  });
}

export const onResendConfirmationCode = async (currentUserName) => {
  const username = currentUserName + '@';
  return await Auth.resendSignUp(username);
}

export const onUserConfirmation = async ({ currentUserName, confirmationCode }) => {
  const username = currentUserName + '@';
  return await Auth.confirmSignUp(username, confirmationCode);
}

export const onUpdatePassword = async ({ oldPassword, newPassword }) => {
  const result = await Auth.changePassword(await getCurrentUser(), oldPassword, newPassword);
  console.log('[userManager][onUpdatePassword] result: ', result);
}

export const onForgotPassword = async () => {
  const username = prompt('Enter your username');
  await Auth.forgotPassword(username);
  const confirmationCode = prompt('Enter confirmation code sent to your email')
  const newPassword = prompt('Enter your new password');
  return await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);
}

export const getUserDetails = async () => {
  return await Auth.userAttributes(await getCurrentUser());
}

export const updateUserAttributes = async (attributeName) => {
  const value = prompt('Enter attribute Value');
  const attributes = {}
  attributes[attributeName] = value;
  await Auth.updateUserAttributes(await getCurrentUser(), attributes);
}

export const onSignOut = async () => {
  // access token will be valid for its lifetime (1 hour) even after logged out
  await Auth.signOut({
    global: true
  });
}

export const checkMFAStatus = async () => {
  return await Auth.getPreferredMFA(await getCurrentUser());
}

export const setUpOTP = async () => {
  const user = await getCurrentUser();
  const code = await Auth.setupTOTP(user);

  const qrData = `otpauth://totp/Lam Xinh Dep (${user.getUsername()})?secret=${code}`;
  const url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURI(qrData) + '&amp;size=300x300';

  return {
    code,
    url
  };
}

export const verifyToken = async (type) => {
  const user = await getCurrentUser();
  const verificationCode = prompt(`Enter ${type} token, from your authenticator app`);
  await Auth.verifyTotpToken(user, verificationCode);
  return await Auth.setPreferredMFA(user, type);
}
