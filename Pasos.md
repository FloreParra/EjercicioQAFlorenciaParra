# Paso a paso de la solución

1. Se inicializa Node en el proyecto.  
2. Se corre el comando "npm init playwright@latest" para agregar Playwirght al proyecto en su última versión disponible.  
3. Dentro de la carpeta Tests se incluye un file .spec.js (ya que se eligió javaScript como lenguaje) donde iran los tests.  
4. El primer test a ejecutar es encontrar el Heading de la pagina, como para asegurarnos que estamos en la pagina correcta y que esta cargó.  
5. El segundo test es un happy path en donde se ingresa a la página, se ingresa usuario y contraseña correctos y luego se hace clic en login. Una vez realizada la acción, se verifica que el programa haya redirigido al usuario a la pagina principal. Tambien se agrega una estructura Try Catch para loguear el error por consola  
6. El tercer test es una prueba de error al  proporcionar un usuario valido y una contraseña erronea y hacer clic en login, se espera mensaje de validación.  
7. El cuarto test es una prueba de error cuando se ingresa un usuario incorrecto, password correcta y se hace clic en login, se espera mensaje de validación.  
8. El quinto test es una prueba de error cuando los campos de usuario y contraseña se envían vacíos. Se espera mensaje de error. 
9. El sexto test prueba el error al enviar caracteres especiales en el campo de usuario.  
10. El septimo test prueba el link delpassword reset. Se ingresa a la página del login y se hace click en el link de "Forgot password". Como resultado se espera que se redirija al usuario a una URL para que cambie su contraseña.  
11. El octavo test abarca el link de sign up. Tiene la misma lógica que el test anterior, pero la URL que espera es la de sign up

## Forma de armar los test
### Testing del form
Para todos los casos donde se prueba usuario y contraseña, se armauna función asíncrona test con un nombre explicativo para cada una y que recibe "page" como parámetro.  
Como primer paso en cada uno de los test se accede a la página del LogIn. Aqui tenemos una posibilidad de mejora, ya que se podrían incluir todos los test dentro de otra funcion y declarar un "beforeEach" para que antes de empezar cada test se redirija a la URL correspondiente en lugar de repetir el comando en cada test individualmente.  
A continuación se localizan los inputs del formulario mediante el uso de sus labels con el uso del comando "getByLabel" en la misma línea se ingresan los valores deseador por mediodel comando ".fill".  
Luego se presiona el botón para enviar los campos.  
Para finalizar, se utiliza una estructura Try/Catch. Donde en la parte del try se ingresa el resultado esperado despues de realizada la acción. Esto es el redireccionamiento a la pagina principal en caso de success o un mensaje de error frente a datos incorrectos. Y en la parte del catch se establece el mensaje por consola del error.  
### Testing de links
En cuanto a los links, la lógica que se aplicó fue primero buscar el localizador por el rol de link y luego filtrarlos según su texto. Una vez hayados, se hace click y se espera que el usuario sea redirigido a otra URL para validar el test.
## Variables
Se crea una carpeta llamada "Variables" dentro del cual hayun archivo .js que contiene una constantecon un objeto que contiene las URLs, usuario valido y contraseña correcta.  
Esta constante luego se importa en el archivo de tests para utilizar sus valores.  
Des esta manera se minimizan posibles errores causados por typos y se busca mantener un proyecto escalable. Ya que en caso de que alguna de estas variables cambie, solo hace falta cambiar su valor en la constante "variables" y no test por test.