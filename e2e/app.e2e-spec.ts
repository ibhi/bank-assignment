import { RabobankPage } from './app.po';

describe('rabobank App', function() {
  let page: RabobankPage;

  beforeEach(() => {
    page = new RabobankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
