import { chromium, test, expect, defineConfig, Page } from '@playwright/test';
import { loginPage } from './pomClasses/loginPage.ts';

let pagina;
let miLogin: loginPage;

test.describe('GT-01 - Pruebas de la secció de Login', () => {
    test.beforeEach(async ({ page }) => {
        miLogin = new loginPage(page);
        await miLogin.crearContextoyDireccionar("https://shop.geekqa.net/litecart/public_html/", false);
    });

    test('AUT_LCA02_02 - Iniciar Sesión, solo con contraseña, y dejar el email vacío ', async ({ }) => {
        await miLogin.login("", "PruebaUno123#");
        await miLogin.tomarCaptura('AUT_LCA02_02', 'login');
        await miLogin.banner(".alert.alert-danger", "You must provide both your email address and password");
    });

    test('AUT_LCA02_03 - Campos de Email, y Contraseña Vacíos ', async ({ }) => {
        await miLogin.login("", "");
        await miLogin.tomarCaptura('AUT_LCA02_03', 'login');
        await miLogin.banner(".alert.alert-danger", " You must provide both your email address and password");
    });

    test('AUT_LCA02_01 - Iniciar Sesión, solo con el email, dejar contraseña vacío ', async ({ }) => {
        await miLogin.login("correo@email.test.com", "");
        await miLogin.banner(".alert.alert-danger", " You must provide both your email address and password");
        await miLogin.tomarCaptura('AUT_LCA02_01', 'login');
    });

    test('AUT_LCA04_01 - Iniciar Sesión con los datos validos (Happy Path)  ', async ({ page }) => {
        await miLogin.login("correo@email.test.com", "PruebaUno123#");
        await miLogin.banner(".alert.alert-success", "You are now logged in as Marcos Rosario.");
        await miLogin.tomarCaptura('AUT_LCA04_01', 'login');
    });

});