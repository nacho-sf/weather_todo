# Documentación del desarrollo de la App WEATHER_TODO

.

## Inicialización e instalación de librerías

- Abrimos Visual y nos situamos en la terminal, en la carpeta donde queramos crear la carpeta del proyecto.

- Se instala "npx create-react-app todolist" para crear automáticamente la parte de backend del proyecto.

- Se arranca el servidor para comprobar que funciona correctamente: "npm start".

- Se crea un repositorio nuevo en github, sin seleccionar la creación de README ni otras plantillas.

- Comandos para copiar desde el repositorio local al nuevo repositorio remoto:
```
git remote add origin "repo_link"

git branch -M master

git push -u origin master
```

- Se instala la extensión de VisualCode ES7+ React/Redux/React-Native para tener atajos de teclado.

- Se instala una extensión de chrome "React Developer Tools" para visualizar el arbol de componentes.

- Se instala un generador de id's únicos: "npm i uuid".

- Se instala un generador de carpetas: "npm i --save-dev create-react-component-folder".

- Se instala "npm i react-router-dom@6" para el enrutado de la aplicación y que nos muestre los componentes.

.

.

## Diseño de la estructura de componentes

- Header

    - Nav

- Main

    - Home

    - TodoList

        - TodoItem

    - WeatherList

        - WeatherCard

- Footer

    - CurrentWeather

- NotFound

.

.

## Creación, estructuración y conexión de componentes

- Se crean los componentes con el generador instalado:

    - npx crcf src/components/Header Main Footer NotFound -j

    - npx crcf src/components/Header/Nav -j

    - npx crcf src/components/Footer/CurrentWeather -j

    - npx crcf src/components/Main/Home TodoList WeatherList -j

    - npx crcf src/components/Main/TodoList/TodoItem -j

    - npx crcf src/components/Main/WeatherList/WeatherCard -j

Se puede hacer individualmente, creando las carpetas y sus archivos correctamente anidados, e incluyendo en cada archivo *.jsx los componentes de clase con el atajo de teclado "rce".
    

.

- En App.js se limpia el código por defecto (átomo giratorio), que está dentro de la etiqueta "div".

- En App.js se importan los componentes BrowserRouter, Header, Main y Footer, y se escriben de tal manera que quedaría así:
```
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Header/>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;
```

.

.

## Enrutado de los componentes

- En Main.jsx se importan elementos de la dependencia instalada para el routing y se declaran los componentes de las rutas:
```
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import TodoList from "./TodoList";
import WeatherList from './WeatherList';
import NotFound from '../NotFound';

export class Main extends Component {
  render() {
    return (
      <main>
        <Routes>
            <Route element={<Home />} path={"/"} />
            <Route element={<TodoList />} path={"/todo"} />
            <Route element={<WeatherList />} path={"/weather"} />
            <Route element={<NotFound />} path={"/*"} />
        </Routes>
      </main>
    )
  }
}

export default Main
```

.

.

## Creación de una barra de navegación

Para hacer una barra de navegación la vamos a declarar como componente hijo (Nav) anidado en el componente padre "Header".

En "Nav.jsx" se importa la clase "Link" y luego tantos componentes "Link" como haya:
```
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/todo">TodoList</Link>
        <Link to="/weather">Weather</Link>
      </nav>;
    
  }
}
```

Ahora, en "Header.jsx", hay que conectar el componente hijo "Nav" al componente padre "Header". Se importa el componente "Nav" y se declara entre las etiquetas "Header":
```
import React, { Component } from 'react';
import Nav from './Nav/Nav'

export class Header extends Component {
  render() {
    return (
      <header>
        <Nav />
      </header>
    )
  }
}
```
Por último, en "App.js", hay que incluir el componente "Header" dentro de las etiquetas "BrowserRouter" porque ahora, con la barra de navegación, entra en juego en la funcionalidad del enrutado.

.

.

## Externalización de propiedades de los componentes

Lo normal es tener muchas propiedades en los componentes. Sin embargo, esto extiende mucho el código, así que se externalizan estas propiedades en un archivo objeto (JSON):

- En la carpeta "TodoList" se crea el archivo "todoitems.json" con datos para los items de la aplicación:

```
[
    {
        "title":"Tarea 1 ejemplo",         
        "date":"Fecha 1 de ejemplo",
        "time":"Hora 1 de ejemplo",
        "description":"Descripción 1 de ejemplo", 
        "category":"Categoría 1 de ejemplo", 
        "site":"Ubicación 1 de ejemplo",
        "image":"https://fixner.com/wp-content/uploads/2020/04/Cabecera-Gestion-de-trabajos.jpg"
    },
    {
        "title":"Tarea 2 ejemplo",         
        "date":"Fecha 2 de ejemplo", 
        "time":"Hora 2 de ejemplo",
        "description":"Descripción 2 de ejemplo", 
        "category":"Categoría 2 de ejemplo", 
        "site":"Ubicación 2 de ejemplo",
        "image":"https://fixner.com/wp-content/uploads/2020/04/Cabecera-Gestion-de-trabajos.jpg"
    }
]
```

.

- Se importa en TodoList.jsx para tener acceso al mismo: `import data from './todoitems.json'`

- El acceso se va a realizar en el "state" de TodoList.jsx:
```
constructor(props) {
  super(props)
    
  this.state = {
    items:data
  }
}
```
La teoría de JS permite que en "state" solo estuviera escrito "data", porque si le pasas a un objeto una variable que ya existe, este toma como clave el nombre de la variable.

Esto es una precarga en state que proviene de un fichero *.json. Así mismo, los datos podrían provenir de algún otro componente por "props", o de un fetch a una API externa, escribiendo ahí mismo un script que hiciera una petición.

.

.

## Función para borrar los items

### Descarga del state del array items:

La precarga en "state" ya se ha hecho, declarando en el objeto items el array de items. Para la descarga, hay que crear una función que haga esto. La lógica consiste en declarar dicho array, en state, con valor vacío (items:[]).

Para cambiar valores en "state", se utiliza la declaración "this.setState". Para leer valores basta con "this.state". Entonces, la función se declara de la siguiente manera:

`deleteItems = () => this.setState({items:[]});`

Esta función se asocia con un evento "onClick" a un botón situado en render, que cuando se pulsa, ejecutará la lógica de la función "deleteItems" y borrará todos los items renderizados en pantalla:

`<button onClick={this.deleteItems}>Borrar items</button>`

Atención a la declaración de la función. Esta está sin paréntesis porque si los llevara, se ejecutaría en el momento en que se iniciara la renderización y no esperaría a ningún evento asociado.

A continuación, se refactoriza el botón "Borrar items" para que desaparezca de pantalla una vez estén los items borrados. Para ello, se le aplica al botón un condicional ternario:

`{this.state.items.length? <button onClick={this.deleteItems}>Borrar items</button> :""}`

Esta declaración inidca que si existe longitud en el array items, pinta el botón, si no, pinta vacío.

.

.

## Función para recargar los items

### Recarga del state del array items:

Para volver a cargar el array de "state", volviendo al estado inicial del array, hay que crear una función que lo haga. La lógica consiste en volver a declarar dicho array, en state, con el valor del array de objetos "data" (items:data):

`resetItems = () => this.setState({items:data});`

Esta función se asocia con un evento "onClick" a un botón situado en render, que cuando se pulsa, ejecutará la lógica de la función "resetItems" y volverá al estado inicial del array de objetos, renderizándolo en pantalla:

`<button onClick={this.resetItems}>Recargar items</button>`

.

.

## Función para pintar los componentes TodoItem

En lugar de escribir dentro del renderizado cada uno de los componentes "TodoItem":
```
<TodoItem data = {items[0]}/>
<TodoItem data = {items[1]}/>
<TodoItem data = {items[2]}/>
...
```
Se importa el componente "Item.jsx"

Se declara una función (fuera de render) que pinte cada uno de los componentes con sus respectivas propiedades.

`paintItems = () => this.state.items.map(item => <Item data={item} />)`

- La función se declara fuera de render, porque esta función es un método al nivel de render: `paintItems = () =>`

- "this.state" para acceder a las propiedades precargadas en "state": `this.state`

- Se aplica el método MAP al array "items" para su iteración: `items.map(item)`

- Se le pasa el elemento iterable "item", para que en cada iteración retorne `=>` el componente con sus propiedades correspondientes a cada posición del array: `<Item data={item}`

- Se invoca a la función "paintItems" en "render":
```
render() {

  return (
    <section>
      <h1>Items de Tareas: </h1>
        {this.paintItems()}
    </section>
  )
}
```
Colocando el nombre de la función junto a los paréntesis "paintItem()" se ejecuta directamente. En la aplicaciones de ejecución asociados a eventos (botones, etc...) se bebe colocar el nombre de la función sin los paréntesis, porque si no, no esperará para la ejecución.

.

.

## ID único para cada componente TodoItem

A cada uno de los componentes se le debe añadir un identificador, de esta manera:

`paintItems = () => this.state.items.map((item, i) => <Item data={item} key={i} />)`

A esta función, le estamos pidiendo el index "i", y lo estamos aplicando como ID. Sin embargo, es más recomendable que este ID sea único, así que se usará una librería de identificadores autogenerados, aplicándose así:
```
import { v4 as uuidv4 } from 'uuid';

paintItems = () => this.state.items.map((item, i) => <Item data={item} key={uuidv4()} />);
```

.

.

## Creación de formulario para agregar items

En "List.jsx", se escribe en render el siguiente formulario:

```
<form onSubmit={this.addItem}>
          
  <input type="text" id="title" name="title" placeholder="Título..." />

  <input type="text" id="category" name="category" placeholder="Categoría..." />
          
  <input type="date" id="date" name="date" />

  <input type="time" id="time" name="time" />

  <textarea type="textarea" id="description" name="description" placeholder="Descripción..." />
          
  <input type="text" id="site" name="site" placeholder="Ubicación..." />
          
  <input type="url" id="image" name="image" placeholder="URL imagen..." />
          
  <input type="submit" value="Agregar item" />

</form>
```

.

Estos inputs son para que pinte los valores que se introducen en cada uno de los items, por lo que habrá que crear las etiquetas en render de "Input.jsx":

```
render() {
  const {title,category,date,time,description,site,image} = this.props.data;
  let url_img = image || "https://fixner.com/wp-content/uploads/2020/04/Cabecera-Gestion-de-trabajos.jpg";

  return (
    <article>        
      <p>{title}</p>
      <p>{category}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{description}</p>
      <p>{site}</p>
      <img src={url_img} alt={title} /><br />
      <button onClick={this.props.delete}>Borrar</button>
    </article>
  )
}
```

.

.

## Función para agregar items

- Se declaran en la función las variables donde se recogen los valores de en los inputs correspondientes.

- Se declara el nuevo item (newItem), siendo las claves las variables declaradas de las propiedades, y los valores las propiedades recogidas de los inputs en el formulario.

- Al array items se le establece un nuevo objeto, modificando el estado (setState).

- Para añadir el nuevo item se a utilizar Spread operator. Este código forma un array con lo que ya había(esparce el array en elementos), y anexiona el nuevo elemento.

```
addItem = (event) => {
  event.preventDefault();

  const title = event.target.title.value;
  const category = event.target.category.value;
  const date = event.target.date.value;
  const time = event.target.time.value;
  const description = event.target.description.value;
  const site = event.target.site.value;
  const image = event.target.image.value;

  const newItem = {title,category,date,time,description,site,image};

  this.setState({items:[newItem,...this.state.items]})
  }
```

.

A continuación, se declara en el mismo formulario el evento "onSubmit" asociado a la función "addItem"


.

.

## Función para borrar un item individualmente

El botón habrá que declararlo en el componente "Item.jsx". Sin embargo, la lógica de borrar item habrá que crearla en el componente padre "List.jsx", ya que es donde se encuentra guardado el array de items (en state de List.jsx). Entonces habrá que declarar la función "deleteItem" (en singular) en "List.jsx" y transmitirla por "props" al componente "Item.jsx" para que la pueda usar. Esta transmisión de datos por "props" se hará en la función "paintItems".

En la función "paintItems" (List.jsx) se le pasa la propiedad `delete={()=>this.deleteItem(i)}` (en este caso una función). A la función de la propiedad anterior se le ha pasado un índice (i), para identificar el elemento que tiene que borrar. Entonces, "paintItems" queda así:

`paintItems = () => this.state.items.map((item, i) => <Item data={item} key={uuidv4()} delete={()=>this.deleteItem(i)}/>)`

Una vez el componente padre "List.jsx" ha transmitido la propiedad "delete", en el componente hijo "Item.jsx" hay que recepcionarla por "props" en el evento "onClick" de un botón, de tal forma que cuando se pulse (en el componente hijo) invocará a la función situada en el componente padre:

`<button onClick={this.props.delete}>Borrar</button>`

En la función "deleteItem", queremos que borre el elemento indicado y que devuelva el array restante para poder cargarlo en el "state". Entonces, se va a utilizar el método FILTER. En este se declara la condición de filtrado y devuelve el array filtrado:

```
deleteItem = (i) => {
  const remainingItems = this.state.items.filter((item,j) => i!==j);
  this.setState({items:remainingItems});
}
```

El índice "i" es el elemento que borra y el íncice "j" es el elemento que está iterando. Entonces, se le está diciendo que retorne todos los elementos iterados, los cuales no sean los seleccionados (i!==j), o sea, todos menos el que se ha marcado en el botón de borrar. Este array filtrado se guarda en la variable "remainingItems" y se le pasa a "state" en la siguiente línea de código de la función.


.

.

## Destructuración para simplificar rutas de objetos

La sección donde haya HTML hay que intentar dejarla limpia. Si hubiera que acceder a un objeto complejo la ruta podría quedar demasiado larga:
```
render() {
  return (
    <article>
      <h3>{this.props.data.info}</h3>
      <p>Price: {this.props.data.price}€</p>
    </article>
  )
}
```

Para esto, se puede aplicar destructuración:
```
render() {
  const {info,price,image} = this.props.data;

  return (
    <article>
      <h3>{info}</h3>
      <p>Price: {price}€</p>
    </article>
  )
}
```

.

.

## Paso de propiedades de componente padre a hijo

.

### PROPS:

- Declaración en padre: `<Componente property1={value1} />`

- Acceso en hijo: `<etiqueta> {this.props.property1} === value1 </etiqueta>`

.

Ejemplo:

En componente padre `List.jsx`:
```
<div>
  <Item prop1={"value1"} prop2={value1} />    //---> value1 === String, value2 == number...
  <Item prop1={"value2"} prop2={value2} />    // ...
  <Item prop1={"value2"} prop2={value2} />    // ...
  ...
</div>
```

En componente hijo `Item.jsx`:
```
<div>
  <h3>Prop1: {this.props.prop1}</h3>   //---> <h3>Prop1: "value 1, 2..."</h3>
  <p>Prop2: {this.props.prop2}</p>   //---> <p>Prop2: "value 1, 2..."</p>
</div>
```

.

### STATE:

Se crea un constructor, con el atajo de teclado "rconst". Este viene con el atributo de clase "this.state" que se usa como una memoria para guardar datos.

- Declaración en hijo: `this.state = {prop1:"value1"}`

- Acceso en hijo: `<etiqueta> {this.state.prop1} </etiqueta>`

.

Ejemplo:

```
export class ProductItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      name: this.props.data.name  //--> Acceso al objeto data por props
    }
  }

  render() {
    return (
      <article>
        <h2>{this.state.name}</h2>  //--> Acceso al dato por state
      </article>
    )
  }
}
```

.

Lógica para borrar los inputs tras enviar el formulario
```
handleSubmit(e){
    e.preventDefault();
    e.target.reset();
}
// If using class component
<form onSubmit={this.handleSubmit.bind(this)}>
  ...
</form>

// If using function component
<form onSubmit={handleSubmit}>
  ...
</form>
```

- Usar React Leaflet para mapas

- Usar librería MUI

.

.
