import { getItem } from 'utilities/storageManager';

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

export async function getUser() {
  try {
    return await fakeGetUser();
  } catch (e) {
    console.error(`User not found: ${e}`);
  }
}

export function loadUserFromLocalStorage() {
  return getItem('user');
}
