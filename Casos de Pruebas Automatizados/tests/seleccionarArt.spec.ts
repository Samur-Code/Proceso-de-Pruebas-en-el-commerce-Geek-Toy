import { chromium, test, expect, defineConfig, Page } from '@playwright/test';
import { seleccionDeProductos } from './pomClasses/seleccionProductos.ts';

test.describe('GT-05 - Selección, y agregado de productos al carrito ', async () => {
    let miSeleccion: seleccionDeProductos;

    test.beforeEach(async ({ page }) => {
        miSeleccion = new seleccionDeProductos(page);
        await miSeleccion.crearContextoyDireccionar("https://shop.geekqa.net/litecart/public_html/", false);
    });

    test('AUT_DTCA01_01 - Seleccionar un producto de la pagina de inicio ', async ({ page }) => {
        await miSeleccion.seleccionarItem('img[alt="Purple Duck"]', 0, "https://shop.geekqa.net/litecart/public_html/rubber-ducks-c-1/purple-duck-p-5");
    });

    test('AUT_DTCA04_01 - Agregar una cantidad > stock ', async ({ page }) => {
        await miSeleccion.direccionarGoto("https://shop.geekqa.net/litecart/public_html/rubber-ducks-c-1/purple-duck-p-5");
        await miSeleccion.llenarCantidad("31", 'input[name="quantity"]');
        await miSeleccion.seleccionarItem('.btn.btn-success');
        await miSeleccion.verficarAgregado(".badge.quantity", "31");
        await miSeleccion.tomarCaptura("AUT_DTCA04_01", "seleccionDeProductos");

        // resultado esperado:
        // sistema debe de evitar agregar cantidad mayor a 30

        // resultado obtenido:
        // El sistema agrega la cantidad invalida mayor a 31
        await miSeleccion.banner(".alert.alert-danger", "No puedes agregar un valor mayor a stock");
    });

    test('AUT_DTCA01_02 - Agregar valor, donde cantidad < stock && cantidad > 0 ', async ({ page }) => {
        await miSeleccion.direccionarGoto("https://shop.geekqa.net/litecart/public_html/rubber-ducks-c-1/purple-duck-p-5");

        //debe agregarse al carrito
        await miSeleccion.seleccionarItem('.btn.btn-success');
        await miSeleccion.verficarAgregado(".badge.quantity", "15");
        await miSeleccion.tomarCaptura("AUT_DTCA03_01", "seleccionDeProductos");

        // resultado esperado:
        // sistema debe agregar producto a carrito, con la cantidad digitada

        // resultado obtenido:
        // El sistema agrega producto a carrito, con la cantidad digitada

    });

    test.afterAll(async () => {
        console.log("Cerrando todas las paginas");
    });

});