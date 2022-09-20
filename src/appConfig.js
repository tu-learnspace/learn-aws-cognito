export class AppConfiguration {
  constructor() {
    this.defaultLanguage = 'en';
    this.userPoolId = process.env.REACT_APP_POOL_ID;
    this.clientId = process.env.REACT_APP_CLIENT_ID;
  }
}

const singleton = new AppConfiguration();
export default singleton;
