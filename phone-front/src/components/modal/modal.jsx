import React, { Component } from 'react'
import './modal.scss'

class ModalComponent extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default ModalComponent