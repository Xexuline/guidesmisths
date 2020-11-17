import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import './header.scss'

function HeaderComponent() {

  // constructor(props) {
  //   super(props)

  //   this.goBack = this.goBack.bind(this)
  // }
  const history = useHistory()
  function goBack() {
    history.goBack();
  }

  function create() {
    history.push('/new')
  }

  // render() {
  return (
    <header className="header">
      <button className="icon icon-arrow header__button" onClick={ goBack }></button>
      <h1>Phone catalog</h1>
      <button className="icon icon-plus header__button" onClick={ create }></button>
    </header>
  )
  // }
}
HeaderComponent.propTypes = {
  
}

export default HeaderComponent