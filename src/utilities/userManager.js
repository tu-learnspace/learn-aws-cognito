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

export async function loadUserFromStorage() {
  return await getCurrentUser();
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

// export const onForgotPassword = async () => {
//   var username = prompt('Enter your username');
//   Auth.forgotPassword(username).then(result => {
//     var confirmationCode = prompt('Enter confirmation code sent to your email')
//     var newPassword = prompt('Enter your new password');
//     Auth.forgotPasswordSubmit(username, confirmationCode, newPassword).then(confirationResult => {
//       displayObject(confirationResult)
//     })
//     .catch(err => displayObject(err))
//   })
//   .catch(err => displayObject(err))
// }

// async function displayUserDetails() {
//   Auth.userAttributes(await getCurrentUser()).then(result => {
//     Swal.fire({
//       title: 'User Attributes',
//       html: `
//       <ul class="list-group">
//        ${result.map(z => `<li class="list-group-item"><b>${z.getName()}:</b> ${z.getValue()}</li>`).join('')}
//      </ul>
//        `
//     })
//   })
//   .catch(err => displayObject(err))
// }

// async function updateUserAttributes(attributeName) {
//   var value = prompt('Enter attribute Value');
//   var attributes = {}
//   attributes[attributeName] = value;
//   Auth.updateUserAttributes(await getCurrentUser(), attributes).then(result => {
//     displayObject(result)
//   })
//   .catch(err => displayObject(err))
// }

export const onSignOut = async () => {
  await Auth.signOut();
}



