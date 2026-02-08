import { test, expect, Browser } from '@playwright/test';
import { chromium } from '@playwright/test';
import { BasePage } from './basePage';

export class RegistroPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async registro(username: string, lastname: string, password: string, address: string, address2: string, postalCode: string, city: string, email: string, phone: string, confirmPassword: string) {
        //await this.page.locator('.nav-item.account.dropdown').locator('a[data-toggle="dropdown"]').click({ delay: 100 });
        await this.page.fill('input[name="firstname"]', username);
        await this.page.fill('input[name="lastname"]', lastname);
        await this.page.fill('input[name="address1"]', address);
        await this.page.fill('input[name="address2"]', address2);
        await this.page.fill('input[name="postcode"]', postalCode);
        await this.page.fill('input[name="city"]', city);
        await this.page.locator('input[name="email"]').nth(2).fill(email);
        await this.page.fill('input[name="phone"]', phone);
        await this.page.fill('input[autocomplete="new-password"]', password);
        await this.page.fill('input[name="confirmed_password"]', confirmPassword);
        await this.page.click("input[name='terms_agreed']");
    }

    async requerirCampo(nombreCampo: string) {
        const campo = this.page.locator(nombreCampo);
        await expect(campo).toHaveAttribute('required');

        // Valida que el mensaje de validación del navegador no esté vacío
        const validationMessage = await campo.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(validationMessage).not.toBe('');
    }

    async Registrar() {
        await this.page.waitForTimeout(15000);
        await this.page.click("button[name='create_account']");
    }

}