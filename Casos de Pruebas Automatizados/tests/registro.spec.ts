import { chromium, test, expect, defineConfig, Page } from '@playwright/test';
import { RegistroPage } from './pomClasses/registroPage.ts';

test.describe('GT-02 - Pruebas de la sección de registro', async () => {
    let miRegistro: RegistroPage;

    test.beforeEach(async ({ page }) => {
        miRegistro = new RegistroPage(page);
        await miRegistro.crearContextoyDireccionar("https://shop.geekqa.net/litecart/public_html/create_account", false);
    });

    test('AUT_RCA01_01 - Todos los campos deben estar llenos correctamente (Happy Path) ', async ({ page }) => {
        await miRegistro.registro("Samuel Arian", "Gómez López", "PruebaUno123#", "Puerto Plata", "Dirección", "57000", "Batey", "test2143658798@correo.com", "829-881-8087", "PruebaUno123#");

        //resultado esperado:
        //Mostrar Alerta indicando la creación del usuario.
        await miRegistro.Registrar();
        await miRegistro.banner(".alert.alert-success", "Your customer account has been created.");
        await miRegistro.tomarCaptura('AUT_RCA01_01', 'registro');
    });


    test('AUT_RCA01_02 - Intentar registrar con todos los campos vacíos  ', async ({ }) => {
        await miRegistro.registro("", "", "", "", "", "", "", "", "", "");
        await miRegistro.Registrar();

        //Resultado esperado:
        //Impedir al usuario la creación de la cuenta.
        await miRegistro.tomarCaptura('AUT_RCA01_02', 'registro');
        await miRegistro.requerirCampo('input[name="firstname"]');
    });

    test('AUT_RECA06_03 - Campo de Contraseña Deseada vacío ', async ({ }) => {
        await miRegistro.registro("Samuel Arian", "Gomez Lopez", "", "Puerto Plata", "Dirección", "57000", "Batey", "CienDeRDDD@correo.com", "829-881-8087", "PruebaUno123#");
        await miRegistro.Registrar();

        //Resultado esperado:
        //Solicitar al usuario llenar el campo de contraseña.
        await miRegistro.tomarCaptura('AUT_RECA06_03', 'registro');
        await miRegistro.requerirCampo('data-toggle="password-strength');
    });

    test('AUT_RCA01_04 - Confirmación de Contraseña, no coincide con Contraseña Deseada  ', async ({ }) => {
        await miRegistro.registro("Samuel Arian", "Gomez Lopez", "PruebaUno123#", "Puerto Plata", "Dirección", "57000", "Batey", "CienDeRDDD@correo.com", "829-881-8087", "PruebaUno123");
        //Resultado esperado:
        //Indicar al usuario que las contraseñas no coinciden.
        await miRegistro.Registrar();
        await miRegistro.banner(".alert.alert-danger", " The passwords did not match");
        await miRegistro.tomarCaptura('AUT_RCA01_04', 'registro');
    });

    test.afterAll(async () => {
        console.log("Cerrando todas las paginas");
        //await miRegistro.cerrarNav();
    });

});