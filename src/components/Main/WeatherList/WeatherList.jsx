import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid"
import WeatherCard from './WeatherCard'

class WeatherList extends Component {
    constructor(props) {
        super(props);

        this.state = { weatherList: this.props.defaultList }
        
        console.log('CONSTRUCTOR')
    }
    
    async componentDidMount(){
        
        const resp = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=40.4167047&lon=-3.7035825&appid=5b7c3c118156d3cf093cbde48c30eb8b');
        const data = await resp.json();
        this.setState({
            weatherList: data.list
        })
        console.log('componentDidMount');
    }


    render() {
        console.log('RENDER')
        return (
            <div>
                <h3>Lista del tiempo</h3>
                {
                  this.state.weatherList.map(weathercard => 
                    <WeatherCard data={weathercard} key={uuidv4()}/>
                  )
                }
            </div>        
        );
    }
}

WeatherList.defaultProps = {
    defaultList: []
}

export default WeatherList;