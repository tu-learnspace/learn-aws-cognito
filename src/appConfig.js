export class AppConfiguration {
  constructor() {
    this.defaultLanguage = 'en';
  }
}

const singleton = new AppConfiguration();
export default singleton;
