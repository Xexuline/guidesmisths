import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './header.scss'

function HeaderComponent() {
  const history = useHistory()
  const location = useLocation()
  function goBack() {
    history.goBack();
  }

  function create() {
    history.push('/new')
  }

  return (
    <header className="header">
      <button className="icon icon-arrow header__button" onClick={ goBack }></button>
      <h1>Phone catalog</h1>
      { location.pathname === '/' ? <button className="icon icon-plus header__button" onClick={ create }></button> : <span className="header__button"></span>}
    </header>
  )
}

export default HeaderComponent