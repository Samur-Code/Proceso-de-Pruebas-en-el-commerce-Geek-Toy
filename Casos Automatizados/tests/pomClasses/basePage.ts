import { expect, Page, Browser, chromium } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected browser: Browser;

  protected searchTextArea = ".cdx-text-input__input";
  protected searchButton = '#vector-page-tools-dropdown-checkbox';

  constructor(page: Page) {
    this.page = page;
  }

  async visitarSitioWeb(web: string) {
    await this.page.goto(web);
  }

  async search(text: string) {
    await this.page.fill(this.searchTextArea, text);
    await this.page.click(this.searchButton);
  }

  async verifyResultados(text: string) {
    const result = this.page.locator('body');
    await expect(result).toContainText(text);
  }

  async banner(locator: string, contenidoTexto: string) {
    const successBanner = this.page.locator(locator);
    await expect(successBanner).toBeVisible();
    await expect(successBanner).toContainText(contenidoTexto);
  }

  async crearContextoyDireccionar(direccion: string, cabeza: boolean) {
    this.browser = await chromium.launch({ headless: cabeza });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(direccion);
  }

  async direccionarGoto(direccion: string) {
    await this.page.goto(direccion);
  }

  async cerrarNav() {
    await this.browser.close();
  }

  async tomarCaptura(nombre: string, carpeta: string) {
    await this.page.screenshot({ path: `./screenshots/${carpeta}/${nombre}.png`, fullPage: true });
  }

}