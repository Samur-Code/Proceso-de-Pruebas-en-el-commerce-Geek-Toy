import { test, expect, Browser } from '@playwright/test';
import { chromium } from '@playwright/test';
import { BasePage } from './basePage.ts';


export class seleccionDeProductos extends BasePage {

    async seleccionarItem(item1: string, nHijo?: number, detallesPagina?: string) {
        const itemOne = await this.page.locator(item1);

        if (nHijo && detallesPagina) {
            await itemOne.nth(nHijo).click();
            await this.page.goto(detallesPagina);
        } else {
            await itemOne.click();
        }

    }

    async llenarCantidad(cantidad: string, etiqueta: string){
        await this.page.locator(etiqueta).fill(cantidad);
    }

    async verficarAgregado(carrito: string, number: string){
        const badge = this.page.locator(carrito);
        await expect(badge).toHaveText(number);
    }
}