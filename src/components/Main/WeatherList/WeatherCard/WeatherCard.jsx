import React, { Component } from "react";

class WeatherCard extends Component {
  
  render() {
    const {dt_txt} = this.props.data;
    const {temp} = this.props.data.main;
    const [{description}] = this.props.data.weather;

    return <article>
      <p>{dt_txt}</p>
      <p>{temp}</p>
      <p>{description}</p>
  </article>
  }
}

export default WeatherCard;
