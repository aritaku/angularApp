import { CloudAppSamplePage } from './app.po';

describe('cloud-app-sample App', () => {
  let page: CloudAppSamplePage;

  beforeEach(() => {
    page = new CloudAppSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
