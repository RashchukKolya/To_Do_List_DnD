import React from 'react';
import './Modal.css'

const Modal = ({toggleModal}) => {
  return (
    <div className="owerlay">
      <div className="modal">
        <span className="close" onClick={toggleModal}>X</span>
      </div>
    </div>
  );
};

export default Modal;