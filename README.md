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

## PROPS: Paso de propiedades de componente padre a hijo

En componente padre `List`:
```
<div>
  <Item prop1={"value1"} prop2={value1} />    //---> value1 == String, value2 == number...
  <Item prop1={"value2"} prop2={value2} />    // ...
  ...
</div>
```

En componente hijo `Item`:
```
<div>
  <p>Prop1: {this.props.prop1}</p>   //---> <p>Prop1: "value 1, 2..."</p>
  <p>Prop2: {this.props.prop2}</p>   //---> <p>Prop2: "value 1, 2..."</p>
  ...
</div>
```



- Mirar la lógica de Nacho 3 para vaciar los imputs

- Usar React Leaflet para mapas

- Usar librería MUI

- Para crear la estructura inicial de los componentes se usa el atajo de teclado "rce"

- IMportación de Header Main y Footer a App