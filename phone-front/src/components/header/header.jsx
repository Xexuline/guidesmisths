import React, { Component } from 'react'
import './header.scss'

class HeaderComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <header>
        <h1>Phone catalog</h1>
      </header>
    )
  }
}

export default HeaderComponent