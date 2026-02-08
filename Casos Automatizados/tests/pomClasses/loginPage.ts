import { test, expect, Browser } from '@playwright/test';
import { chromium } from '@playwright/test';
import { BasePage } from './basePage.ts';


export class loginPage extends BasePage {

    async login(username: string, password: string) {
        await this.page.locator('.nav-item.account.dropdown').locator('a[data-toggle="dropdown"]').click({ delay: 100 });
        await this.page.fill('input[name="email"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click("button[name='login']");
    }

}