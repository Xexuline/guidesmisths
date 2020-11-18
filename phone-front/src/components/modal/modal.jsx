import React, { Component } from 'react'
import { connect } from 'react-redux'
import './modal.scss'

class ModalComponent extends Component {

  lockBody(loading){
    const body = document.querySelector('body')
    body.classList[loading ? 'add' : 'remove']('modal-open')
  }

  componentDidUpdate(prevProp) {
    if(prevProp.loading !== this.props.loading) {
      this.lockBody(this.props.loading)
    }
  }

  render() {
    return this.props.loading ? (
      <div className="modal">
        <div className="modal-content">
          { this.props.children }
        </div>
      </div>
    ) :
    (null)
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ui.loader
  }
}

export default connect(mapStateToProps)(ModalComponent)