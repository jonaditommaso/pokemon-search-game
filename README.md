POKEDEX:

La aplicación funciona de la manera menos invasiva posible. Teniendo en cuenta el contexto que se me propuso, un héroe llega a una ciudad y puede consultar a todos los Pokemon disponibles, siempre y cuando el usuario (o héroe) esté logueado.
El background del index es una imagen del héroe llegando a la nueva ciudad. Lo imagino dentro del contexto mismo, como si representara el juego mismo, el héroe en movimiento.

Para una mejor performance en la navegación de la aplicación, utilicé React Router. Sin embargo, si intenta acceder a algún path propio de la app (como /all, o /search) directamente desde la URL, sin iniciar sesión, aparecerá un alert instantáneamente que le dirá que debe iniciar sesión. Al clickear en 'Ok', se redirigirá automáticamente a /login para proceder.

Para acceder de forma convencional, dirigirse al botón en la esquina superior izquierda que dice 'Sign In'.
El login cuenta con una validación de usuario y contraseña sólo desde el frontend. Claro que para otros fines y eventualmente se debería agregar una validación desde el backend, y que esta misma hecha desde el frontend sea una complementación de la anterior.

Cualquier usuario es válido si tiene 4 caracteres o más, sin importar el tipo de carácter que se agregue (letra, número u otro).
La contraseña es 'testeo123'.
Si algún requisito no se cumple, se mostrará el feedback correspondiente para corregir el error (un campo vacío, un número de caracteres de usuario menor a 4 o una contraseña incorrecta).

Cuando ingrese por primera vez, notará que en la esquina superior derecha aparecerá la leyenda 'Catch them' con el nombre de usuario ingresado y el menú desplegable llamado POKEDEX para buscar los Pokemon. Notará que este menú tarda unos instantes en aparecer, ya que el componente Navbar cuenta con un setTimeout de 1 segundo, sólo exclusivamente para simular un login real.
El botón de Sign In entonces cambia de estilo y ahora dice Sign Out. Si clickea allí se desloguea y el sidebar desaparecerá.

Poder acceder a un path específico o no, y poder ver el sidebar con el username o no, se logra con la implementación de Redux en la aplicación. La app cuenta con un solo reducer que sólo espera dos action (signIn y signOut).

La primera opción del menú POKEDEX es 'Search Pokemon'. Si clickea allí, aparecerá un input de búsqueda, donde podrá realizar la misma tanto por nombre como por número de Pokemon. Se realiza una búsqueda automáticamente a partir de los 500 ms después de realizar la entrada. Si no existe un Pokemon que coincida con la entrada realizada, aparecerá una leyenda indicándoselo. Como observación, la request se realiza siempre luego de esos 500 ms. Eventualmente, como ideal, o mejor opción, sería tener un archivo con los nombres de todos los Pokemon existentes, y poder relacionarlos con la búsqueda misma. Es decir, si en mi hipotético archivo 'pokemons.js' existe el pokemon que estoy intentando buscar en el input, realizar la búsqueda, sino, desestimarla, para lograr una mejor performance y eficiencia.
Además verá un botón 'Return to play', que regresa a la página principal, en la que por supuesto, sólo se muestra la imagen de background que suplanta el supuesto gameplay, todavía persistiendo la opción de seleccionar la POKEDEX y cerrar sesión.
En la ficha aparece una imagen del Pokemon, su tipo con su color correspondiente, y una descripción que puede reproducirse en audio al apretar el botón 'Listen' ya que implementé SpeechSynthesis en el proyecto.

En la opción de 'See all Pokemons' encontrará los Pokemons ordenados de a veinte, con su nombre, número, tipo y una habilidad que escogí arbitrariamente sólo con el fin de mostrar algún dato y no abultar la ficha. Verá además un botón de Prev y Next para acceder a los siguientes o anteriores Pokemon, (en el caso de la primer pagina, por supuesto el botón Prev no tiene funcionalidad); verá también el mismo botón 'Return to play', para regresar a la página principal, y un dropdown 'Filter by type' con todos los tipos de Pokemon disponibles. Escoja una opción y mostrará en ese mismo componente los Pokemons filtrados, quizás tarde unos segundos ya que no los renderiza de a veinte sino que busca entre todos los Pokemon y muestra a todos los que coincidan con el filtro realizado. Como observación, la API devuelve objetos diferentes por la request por 'type' en comparación a por 'pokemon'. Por ello, el componente ShowAllPokemons cuenta con dos useEffect, y la función loadPokemons tiene una variable 'url' que puede tomar dos valores, depende cómo deba acceder a la data del response, y se utiliza el mismo seteo con setPokemonData para actualizar la lista de pokemons. De esta manera se logra un código más limpio y reutilizable.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
