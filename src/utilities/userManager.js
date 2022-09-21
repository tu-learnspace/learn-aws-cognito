import { Auth, /*Hub*/ } from 'aws-amplify'
//import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';

import appConfig from 'appConfig';
import { getItem } from 'utilities/storageManager';

let currentUserName = null;

Auth.configure({
  userPoolId: appConfig.userPoolId,
  userPoolWebClientId: appConfig.clientId,
  // oauth: {
  //   region: 'us-east-1',
  //   domain: 'globomanticscongnito.auth.us-east-1.amazoncognito.com',
  //   scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
  //   redirectSignIn: 'https://127.0.0.1:8080',
  //   redirectSignOut: 'https://127.0.0.1:8080',
  //   responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  // }
});

export const onSignUp = async ({ emailValue, passwordValue }) => {
  currentUserName = emailValue;

  // return await Auth.signUp({
  //   username: emailValue,
  //   password: passwordValue,
  //   attributes: {
  //     email: emailValue
  //   }
  // });
}

export function onResendConfirmationCode() {
  Auth.resendSignUp(currentUserName).then((result) => {
    return {
      success: {
        message: 'Confirmation code resend' // Swal.fire('Confirmation code resend')
      }
    };
  }).catch(err => {
    return { error: err };
  })
}

export function onUserConfirmation({ confirmationCode }) {
  Auth.confirmSignUp(currentUserName, confirmationCode).then(result => {
    //displayObject(result)
    //toggleModal('login', true)
  }).catch(err => {
    return { error: err };
  })
}

// fake test
async function fakeGetUser () {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        name: 'HUY TU',
        email: 'huytunguyen@email.com'
      });
    }, 2000);
  });
}

export const getUser = async () => {
  try {
    return await fakeGetUser();
  } catch (e) {
    console.error(`User not found: ${e}`);
  }
}

export const loadUserFromLocalStorage = () => {
  return getItem('user');
}



// async function getCurrentUser(){
//   try {
//     var currentUser = (await Auth.currentAuthenticatedUser());
//     console.log('getCurrentUser', currentUser);
//     setUserState(currentUser)
//     return currentUser;
//   }
//   catch (err) {
//     console.log('Error loading user', err);
//     setUserState(null)
//   }
// }
//
// function onLogin({ userData }) {
//   Auth.signIn(userData.username, userData.password).then(async (result) => {
//
//     if (result.challengeName == 'SOFTWARE_TOKEN_MFA') {
//
//       const verificationCode = prompt('Enter your TOTP token');
//
//       Auth.confirmSignIn(result, verificationCode, 'SOFTWARE_TOKEN_MFA').then(confirmSigninResult => {
//         getCurrentUser()
//       })
//       .catch(err => {
//         displayObject(err);
//       });
//     }
//     else {
//       getCurrentUser();
//     }
//
//   }).catch(err => {
//     if (err.code == "UserNotConfirmedException") {
//       currentUserName = userData.username;
//       toggleModal('confirm', true);
//     }
//     else {
//       displayObject(err);
//     }
//   })
// }
//
//
//






