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

## Externalización de propiedades de los componentes

Lo normal es tener muchas propiedades en los componentes. Sin embargo, esto extiende mucho el código, así que se externalizan estas propiedades en un archivo objeto (JSON):

- En la carpeta "TodoList" se crea el archivo "todoitems.json" con datos para los items de la aplicación:

```
[
    {
        "title":"Tarea 1 ejemplo", 
        "description":"Descripción 1 de ejemplo", 
        "date":"Fecha 1 de ejemplo", 
        "category":"Categoría 1 de ejemplo", 
        "site":"Ubicación 1 de ejemplo",
        "image":"https://fixner.com/wp-content/uploads/2020/04/Cabecera-Gestion-de-trabajos.jpg"
    },
    {
        "title":"Tarea 2 ejemplo", 
        "description":"Descripción 2 de ejemplo", 
        "date":"Fecha 2 de ejemplo", 
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

## Precarga y descarga del state del array items

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

## Función para pintar los componentes TodoItem

En lugar de escribir dentro del renderizado cada uno de los componentes "TodoItem":
```
<TodoItem data = {items[0]}/>
<TodoItem data = {items[1]}/>
<TodoItem data = {items[2]}/>
...
```

Se declara una función (fuera de render) que pinte cada uno de los componentes con sus respectivas propiedades.

`paintItems = () => this.state.items.map(item) => <Item data={item} />`

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
        {this.paintProducts()}
    </section>
  )
}
```
Colocando el nombre de la función junto a los paréntesis "paintItem()" se ejecuta directamente. En la aplicaciones de ejecución asociados a eventos (botones, etc...) se bebe colocar el nombre de la función sin los paréntesis, porque si no, no esperará para la ejecución.

.

## ID único para cada componente TodoItem

A cada uno de los componentes se le debe añadir un identificador, de esta manera:

`paintItems = () => this.state.items.map(item, i) => <Item data={item} key={i} />`

A esta función, le estamos pidiendo el index "i", y lo estamos aplicando como ID. Sin embargo, es más recomendable que este ID sea único, así que se usará una librería de identificadores autogenerados, aplicándose así:
```
import { v4 as uuidv4 } from 'uuid';

paintProducts = () => this.state.products.map((product, i) => <ProductItem data={product} key={uuidv4()} />);
```

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

## Paso de propiedades de componente padre a hijo

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

- Mirar la lógica de Nacho 3 para vaciar los imputs

- Usar React Leaflet para mapas

- Usar librería MUI

.

.

VÍDEO Parte I MIN. 50:50 --> Creación de la función addItem()