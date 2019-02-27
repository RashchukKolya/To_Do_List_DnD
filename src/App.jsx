import React, { Component } from 'react';
import uuidv4 from 'uuid/v4'
// import trash from './trash.png';
import Item from './Item'
// import Modal from './Modal/Modal'
import './App.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext} from 'react-dnd'
const update = require('immutability-helper');

class App extends Component {

  state = {
    text: '',
    password: '',
    tasks: [],
    // showModal: false,
  }

  handlerChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState({
      [name]: value,
    })
  }

  createObj = (e) => {
    e.preventDefault();
    let item = {
      id: uuidv4(),
      text: this.state.text,
      complete: false,
    }
    this.setState(prevState => ({
      tasks: [item,...prevState.tasks],
      text: '',
    }))
  }

  toggleComplite = (e) => {
    let id = e.target.id;

    this.setState({
      tasks: this.state.tasks.map(el => el.id ===id ? {...el, complete: !el.complete}: el)
    });
  }

  deleteLi = (e) => {
    let id = e.target.dataset.id;
    this.setState({
      tasks: this.state.tasks.filter(el => el.id !==id),
    })
  }


  // Drag n Drop 

  moveCard = (dragIndex, hoverIndex) => {
    const dragCard = this.state.tasks[dragIndex];

    this.setState(
      update(this.state, {
        tasks: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  // toggleModal = () => {
  //   this.setState(prev => ({
  //     showModal: !prev.showModal
  //   }))
  // }

  // passwordChange = (evt) => {
  //   let value = evt.target.value;
  //   this.setState({
  //     password: value,
  //   })
  // }
  render() {
    const {tasks} = this.state;
    return (
      
      <div className='App'>
      {/* {showModal ? <Modal/> : null} те ж саме що й наступний запис */}
      {/* {showModal && <Modal toggleModal={this.toggleModal}/>}  */}
        <form action="" className='form' onSubmit={this.createObj}>
          <input type="text" className='text' value={this.state.text} onChange={this.handlerChange} name='text'/>
          {/* <input type="password" className="text" placeholder="Password" value={this.state.password} onChange={this.handlerChange} name='password'/> */}
          <input type="submit" value='Add' className='add'/>
        </form>
        <ul className="list">
        {tasks.map((el, index) =>
        // <li className={el.complete ? 'list__item done': 'list__item'} onClickCapture={this.toggleComplite} key={el.id} id={el.id}>{el.text}<img src={trash} alt="delete-icon" className='delete' data-id={el.id} onClick={this.deleteLi}/></li>
        // console.log(el)
        <Item moveCard={this.moveCard} index={index} key={el.id} toggleComplite={this.toggleComplite} deleteLi={this.deleteLi} el={el}/>
        )}
        </ul>
        {/* <button onClick={this.toggleModal}>Show Modal</button> */}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);