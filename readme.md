### QA Proyecto: Pruebas Integrales, Sistema de Compras de Juguetes.
![](https://shop.geekqa.net/litecart/public_html/images/slides/1-rocket-cart.svg)

-------------

## Descripción
Este repositorio cuenta con las estrategias, casos de pruebas manuales y automatizadas para el sistema web "Geek Toys", donde ademas se cubre todo el proceso de pruebas de software, desde el analisis de los requisitos, hasta el reporte final de los tests.

## Herramientas Utilizadas
**Gestión de Pruebas: **TestRail
**Reportes y Seguimiento de Bugs**: Jira, TestRail
**Automatización: **Playwright con Typescript.
**Herramientas de Configuración**: TestRail CLI y su API, JUnit, NPM

## Estrategias de Pruebas
Las pruebas que se llevaron a cabo fueron **funcionales**, y de caja negra, ya que no se tiene acceso sobre el codigo del sistema, se probaron los componentes de gestión de usuario, y el flujo principal para la compra de artículos.

**Tipos de pruebas**: Pruebas de Regresión (Automatizadas), Pruebas de Aceptación, Pruebas Agiles, Pruebas de Humo, Pruebas de Exploratorias.
**Enfoque de pruebas**: Caja Negra.
**Modo de ejecución**: Pruebas Manuales, para probar las mayorias  de funcionalidades del sitio web, Pruebas Automatizadas, para realizar las pruebas de regresión.

## Diseño y Ejecución de Casos de Pruebas
**Resumen**
El diseño y ejecución de pruebas se realizo a travez del gestor de pruebas "TestRail", por otro lado las pruebas de regresión se ejecutaron a travez de una herramienta de automatización, siendo esta "Playwright", cabe decir que esta herramienta se integro con TestRail, por tanto una vez se ejecutaban los test, los resultados obtenidos se generaban automaticamente en TestRail.

**Documentación de Pruebas**
https://github.com/Samur-Code/Proceso-de-Pruebas-en-el-commerce-Geek-Toy/blob/main/Reportes%20y%20Resultados/Matrices%20de%20Trazabilidad%2C%20Cobertura%20y%20Defectos/Resumen%20de%20Casos%20de%20Pruebas%20Pasados%20y%20Fallados.pdf

**Capturas de Pruebas**

Pruebas en Testrail

![](https://github.com/Samur-Code/Proceso-de-Pruebas-en-el-commerce-Geek-Toy/blob/main/Reportes%20y%20Resultados/Reportes/Pruebas%20Resumen.PNG?raw=true)

Pruebas en Playwright

![](https://github.com/Samur-Code/Proceso-de-Pruebas-en-el-commerce-Geek-Toy/blob/main/Reportes%20y%20Resultados/Reportes/Pruebas%20Automatizadas.PNG?raw=true)

## Configuración para las Pruebas Automatizadas

Tal y como hemos indicados para ejecutar las pruebas de regresión, se hizo uso de la automatización, con playwright. 

**Requisitos previos.**
Lo primero es asegurarse de que tenemos instalados tanto nodejs, como npm, podemos verificar esto con los sigientes comandos:

     node --version
	 npm --version
	 python --version
	 pip --version 
   

Si estan instalados debería decirte las versiones de las herramientas, en caso contrario te dira, que el sistema no recococe estos comandos, si se te da este escenario puedes ir a las siguientes pagina para instalar estas herramientas:
node, npm: https://nodejs.org/es 
python, pip: https://www.python.org/

**Instalacion de Playwright**
Haremos nuestra carpeta de trabajo, donde realizaremos las pruebas automaticas, y una vez aqui, ejecutaremos el siguiente comando.

     npm init playwright@latest
   

Durante la instalación el sistema, nos preguntara si queremos usar JS, o TS, para este proyecto en concreto, utilizaremos TS, luego preguntara si queremos o agregar esto a un workflow en github, en este caso le damos a que no, ya por ultimo el sistema va a querer saber si vamos a utilizar las pruebas en otros navegadores, le damos a que sí. 

Ahora el sistema empezara con la instalación, y configuración de playwright, y nos deberia quedar una estructura como esta:

     playwright.config.ts         # Test configuration
	 package.json
	 package-lock.json            # Or yarn.lock / pnpm-lock.yaml
	 tests/
	 example.spec.ts            # Minimal example test
   

**Verificación de Instalación**
Para asegurarse de que playwright se ha instalado correctamente, ejecutaremos el siguiente comando:

    npx playwright test
	npx playwright show-report

## Integrar TestRail con Playwright
**Instalación**
Lo primero es intalar la CLI de TestRail en nuestro en nuestro proyecto usando la linea a continuación:

    $ pip instalar trcli

**Configuración de TestRail**
Una vez instalado la CLI, debemos hacer algunas modificaciones en el gestor,  primero habilitar la API, luego debemos de dirigirnos a campos personalizados, una vez ahí crearemos uno de tipo texto, y lo nombraremos como Automation_id.

**Resultados de Playwright integrados con TestRail**
El siguiente paso es enviar los resultados al gestor de pruebas, con los comandos a continuación:

    $ trcli -y \
	-h https://INSERT-INSTANCE-NAME.testrail.io \
	--project "My Project" \
	--username INSERT-EMAIL \
	--password INSERT-PASSWORD \
	parse_junit \
	--title "Playwright Automated Test Run" \
	-f "./test-results/junit-report.xml"

Cabe destacar que estas no son mis credenciales en caso de querer usar estos casos en un su propio proyecto debera usar su instancia de TestRail, con sus credenciales correspodientes.
