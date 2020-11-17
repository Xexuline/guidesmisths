import React, { Component } from 'react'
import './phoneCard.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
class PhoneCard extends Component {

  render() {
    const { name, _id, manufacturer, price, imageFileName } = this.props
    return (
      <Link className="phone-card__wrapper" to={`/${ _id }`}>
        <div className="phone-card__image">
          <img src={ imageFileName } alt=""/>
        </div>
        <div className="phone-card__info">
          <div className="phone-card__info--top">
            <div className="phone-card__info--header">
              <span className="phone-card__info--name">{ name }</span>
              <span className="icon icon-plus"></span>
            </div>
          <span className="phone-card__info--manufacturer">{ manufacturer }</span>
          </div>
          <div className="phone-card__info--bottom">
            <span className="phone-card__info--amount">{ price }€</span>
          </div>
        </div>
      </Link>
    )
  }
}

PhoneCard.propTypes = {
  name: propTypes.string,
  click: propTypes.func
}

export default PhoneCard