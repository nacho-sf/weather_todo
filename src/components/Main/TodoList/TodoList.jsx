import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import data from './todoitems.json';
import Item from './TodoItem';

class TodoList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      
      items:data
      
    };
  };

  deleteItems = () => this.setState({items:[]});

  resetItems = () => this.setState({items:data});

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

    event.target.reset();
    }

  paintItems = () => this.state.items.map((item, i) => <Item data={item} key={uuidv4()} delete={()=>this.deleteItem(i)}/>);

  deleteItem = (i) => {
    const remainingItems = this.state.items.filter((item,j) => i!==j);
    this.setState({items:remainingItems});
  }

  render() {

    return <div>

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

      {this.state.items.length? <button onClick={this.deleteItems}>Borrar items</button> :""}

      <button onClick={this.resetItems}>Recargar items</button>

      {this.paintItems()}

    </div>
  };
};

export default TodoList;
