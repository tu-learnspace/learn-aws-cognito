export class AppConfiguration {
  constructor() {
    this.defaultLanguage = 'en';
    this.userPoolId = process.env.REACT_APP_POOL_ID;
    this.clientId = process.env.REACT_APP_CLIENT_ID;
    this.appName = process.env.REACT_APP_APP_NAME;
  }
}

const appConfiguration = new AppConfiguration();
export default appConfiguration;
