import React from 'react'
import './back-to-top.scss'

function BackToTop(props) {

  function scrollToTop() {
    window.scroll({ behavior: 'smooth', top: 0 })
  }

  const backToTopClassnames = ['icon icon-arrow back-to-top', props.visible ? 'back-to-top__visible' : null ].join(' ')
  return (
    <button className={ backToTopClassnames } onClick={ scrollToTop }></button>
  )
}

export default BackToTop