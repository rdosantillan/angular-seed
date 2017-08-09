import { WtmClientAppPage } from './app.po';

describe('wtm-client-app App', () => {
  let page: WtmClientAppPage;

  beforeEach(() => {
    page = new WtmClientAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
