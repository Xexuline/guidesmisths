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

  function goHome() {
    history.push('/')
  }

  return (
    <header className="header">
      <button className="icon icon-arrow header__button" onClick={ goBack }></button>
      <h1>Phone catalog</h1>
      { location.pathname === '/'
        ? <button className="icon icon-plus header__button" onClick={ create }></button>
        : <button className="icon icon-home header__button" onClick={ goHome }></button>
      }
    </header>
  )
}

export default HeaderComponent