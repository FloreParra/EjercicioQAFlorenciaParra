// @ts-check
import { test, expect } from '@playwright/test';
import { variable }  from '../variables/variables';

// Test para buscar el heading de la pagina para saber si la página cargó. En este caso se arma una función asincrona que no dirige a la pagina del Login y luego busca el elemento H1 por rol y se asegura que este visible.
test('heading', async ({ page }) => {
  await page.goto(variable.logInPage);

  // Expect a title "to contain" a substring.
 await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});

//Test donde se completa el formulario de logIn con usuario y constraseña correcta
test('happy path', async ({ page }) => {
  await page.goto(variable.logInPage);

// Se busca el locator por el label y se completa con un email válido
await page.getByLabel('Email address').fill(variable.usuarioValido);

// Se busca el locator por label y se completa con una contraseña válida
await page.getByLabel('Password').fill(variable.contraseñaValida);

// Se hace clic en botón para enviar Email Adress y Password buscando el localizador segun su rol
await page.getByRole('button', { name: /Continue/i }).click();

// Se verifica mediante un expect que el resultado de la acción haya sido el redireccionamiento a la pagina principal de la aplicación
 try{
 await expect(page).toHaveURL('https://paginaPrincipal.com');

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("No pudo logearse correctamente o la URL no es la misma", error);
 throw error;
 } 

});


//Test donde se completa el formulario de logIn con usuario válido, pero la contraseña es inválida para ese usuario
test('contraseña erronea', async ({ page }) => {
  await page.goto(variable.logInPage);

// Se busca el locator por el label y se completa con un email válido
await page.getByLabel('Email address').fill(variable.usuarioValido);

// Se busca el locator por label y se completa con una contraseña erronea
await page.getByLabel('Password').fill('125');

// Se hace clic en botón para enviar Email Adress y Password
await page.getByRole('button', { name: /Continue/i }).click();

// Se verifica el resultado de error mediante un expect que evalua un campo (div) con un mensaje de error
 try{
  await page.locator('div').filter({hasText: 'Usuario o contraseña inválida'});

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al ingresar contraseña invalida", error);
 throw error;
 } 

});

//Test donde se completa el formulario de logIn con usuario no válido y contraseña correcta
test('usuario erroneo', async ({ page }) => {
  await page.goto(variable.logInPage);

// Se busca el locator por el label y se completa con un email erroneo
await page.getByLabel('Email address').fill('usuari@test.com');

// Se busca el locator por label y se completa con una contraseña válida
await page.getByLabel('Password').fill(variable.contraseñaValida);

// Se hace clic en botón para enviar Email Adress y Password
await page.getByRole('button', { name: /Continue/i }).click();

// Se verifica el resultado de error mediante un expect que evalua un campo (div) con un mensaje de error
 try{
  await page.locator('div').filter({hasText: 'Usuario o contraseña inválida'});

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al ingresar usuario invalido", error);
 throw error;
 } 

});



//Test donde se completa el formulario de logIn con usuario y contraseña vacios
test('usuario y contraseña vacios', async ({ page }) => {
  await page.goto(variable.logInPage);

// Se hace clic en botón para enviar Email Adress y Password sin completar
await page.getByRole('button', { name: /action/i }).click();

// Se verifica el resultado de error mediante un expect que evalua un campo (div) con un mensaje de error
 try{
  await page.locator('div').filter({hasText: 'Usuario o contraseña inválida'});

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al enviar campos vacíos", error);
 throw error;
 } 

});



//Test donde se completa el formulario de logIn con caracteres especiales en el usuario
test('caracter especial', async ({ page }) => {
  await page.goto(variable.logInPage);

// Se busca el locator por el label y se completa con un email con caracteres especiales
await page.getByLabel('Email address').fill('usuarioñ@test.com');

// Se busca el locator por label y se completa con una contraseña válida
await page.getByLabel('Password').fill(variable.contraseñaValida);

// Se hace clic en botón para enviar Email Adress y Password
await page.getByRole('button', { name: /Continue/i }).click();

// Se verifica el resultado de error mediante un expect que evalua un campo (div) con un mensaje de error
 try{
  await page.locator('div').filter({hasText: 'Usuario o contraseña inválida'});

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al ingresar un email con Ñ", error);
 throw error;
 } 

});

// Test para testear link de forgot password
test('forgot password', async ({page}) => {
  await page.goto(variable.logInPage);

  // Se busca el link por  su rol y luego se filtra por el texto
  await page.getByRole("link").filter({ hasText: 'Forgot password?'}).click();

   try{
  await page.goto(variable.passwordResetPage);

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al intentar resetear la contraseña", error);
 throw error;
 } 
})

// Test para testear link de sign up
test('forgot password', async ({page}) => {
  await page.goto(variable.logInPage);

  // Se busca el link por  su rol y luego se filtra por el texto
  await page.getByRole("link").filter({ hasText: 'Sign up?'}).click();

   try{
  await page.goto(variable.signUpPage);

 // En caso de que el test falle se agrega un logueo por consola
 } catch(error) {
 console.error("Error al intentar redirigir a la pagina de sign up", error);
 throw error;
 } 
})