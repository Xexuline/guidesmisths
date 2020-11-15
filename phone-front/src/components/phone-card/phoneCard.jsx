import React, { Component } from 'react'
import './phoneCard.scss'
import propTypes from 'prop-types'

class PhoneCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { name, click } = this.props
    return (
      <div className="phone_card__wrapper" onClick={click}>
        <span>{ name }</span>
        <span className="icon icon-circle-left" aria-hidden="true"></span>
      </div>
    )
  }
}

PhoneCard.propTypes = {
  name: propTypes.string,
  click: propTypes.func
}

export default PhoneCard