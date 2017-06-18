import { CovoiturageAppPage } from './app.po';

describe('covoiturage-app App', () => {
  let page: CovoiturageAppPage;

  beforeEach(() => {
    page = new CovoiturageAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
