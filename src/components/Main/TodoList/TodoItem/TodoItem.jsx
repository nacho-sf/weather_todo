import React, { Component } from "react";

class TodoItem extends Component {
  render() {

    const {title,category,date,time,description,site,image} = this.props.data;
    let url_img = image || "https://fixner.com/wp-content/uploads/2020/04/Cabecera-Gestion-de-trabajos.jpg";

    return <div>
      <p>{title}</p>
      <p>{category}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{description}</p>
      <p>{site}</p>
      <img src={url_img} alt={title} /><br />
      <button onClick={this.props.delete}>Borrar</button>
    </div>;
  }
}

export default TodoItem;
