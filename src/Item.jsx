import React, { Component } from 'react';
import trash from './trash.png';
import { findDOMNode } from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import './App.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.el.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if(dragIndex === hoverIndex){
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
    if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY){
      return;
    }

    if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY){
      return;
    }

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
}

class Item extends Component {
  render() {
    const {el,toggleComplite, deleteLi, isDragging, connectDragSource, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <li style={{opacity}} className={el.complete ? 'list__item done': 'list__item'} onClickCapture={toggleComplite} id={el.id} key={el.id}>{el.text}<img src={trash} alt="delete-icon" className='delete' data-id={el.id} onClick={deleteLi}/></li>
        )
      )
    );
  }
}

export default flow(
  DragSource("card", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("card", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Item);
