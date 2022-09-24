import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid"

import WeatherCard from './WeatherCard'

const API_KEY = process.env.REACT_APP_API_KEY;

class WeatherList extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            weatherList:this.props.defaultList
        };
        console.log('CONSTRUCTOR')
    };
    
    
    async componentDidMount(){
        this.getDataWeather("Madrid");
        console.log('componentDidMount');
    }
    
    async getDataWeather(city){
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`);
        const data = await resp.json();
        this.setState({
            weatherList:data.list
        })
    }

    getCityWeather = (event) => {
        event.preventDefault();
        const city = event.target.city.value;
        this.setState({ city });
        this.getDataWeather(city);
        event.target.reset();
    }

    render() {
        console.log('RENDER')
        return (
            <section>
                <h3>Ciudad: {this.state.city}</h3>
                <form onSubmit={this.getCityWeather}>
                    <input type="text" id="city" name="city" />
                    <input type="submit"  value="Enviar"/>
                </form>

                <div>
                <h3>Pronóstico por horas</h3>
                    {this.state.weatherList.map(weathercard => 
                    <WeatherCard data={weathercard} key={uuidv4()}/>)}
                </div>
            </section>   
            
            
        )
        
    }

}

WeatherList.defaultProps = {
    defaultList: []
}

export default WeatherList;