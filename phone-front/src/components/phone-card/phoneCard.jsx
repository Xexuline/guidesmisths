import React, { Component } from 'react'
import './phoneCard.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
class PhoneCard extends Component {

  render() {
    const { name, _id } = this.props
    return (
      <Link className="phone_card__wrapper" to={`/${ _id }`}>
        <span>{ name }</span>
        <span className="icon icon-circle-left" aria-hidden="true"></span>
      </Link>
    )
  }
}

PhoneCard.propTypes = {
  name: propTypes.string,
  click: propTypes.func
}

export default PhoneCard