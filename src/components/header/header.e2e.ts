import { newE2EPage } from '@stencil/core/testing';

describe('c-header', () => {
  let page;
  const root = 'c-header >>>';
  const siteName = 'Application';

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('is rendered', async () => {
    await page.setContent(`
      <c-header site-name="${siteName}"></c-header>`);

    const symbol = await page.find(`${root} .navbar-symbol`);
    expect(symbol).not.toBeNull();

    const navbar = await page.find(`${root} .navbar-default`);
    expect(navbar).not.toBeNull();

    const brand = await navbar.find('.navbar-brand');
    expect(brand).not.toBeNull();
    
    const title = await navbar.find('.navbar-title');
    expect(title.textContent).toContain(siteName);
  });

  it('should generate top links', async () => {
    await page.setContent(`
      <c-header>
        <a href="/" slot="items">global</a>
      </c-header>`);
    
    const template = await page.find(`${root} slot[name=items]`);
    expect(template).toBeTruthy();

    const example = await page.find(`c-header a[slot=items]`);
    expect(example).toBeTruthy();
  });

  it('should render a navigation', async () => {
    await page.setContent(`
      <c-header>
        <c-navigation slot="navigation">
          <a href="/home">home</a>
        <c-navigation>
      </c-header>`);
    
    const template = await page.find(`${root} slot[name=navigation]`);
    expect(template).toBeTruthy();

    const example = await page.find(`c-header c-navigation[slot=navigation]`);
    expect(example).toBeTruthy();
  });
});
