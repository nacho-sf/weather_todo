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
