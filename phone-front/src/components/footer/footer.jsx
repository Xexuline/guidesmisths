import React, { Component } from 'react'
import './footer.scss'

class FooterComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  render() {
    return (
      <span>footer</span>
    )
  }
}

export default FooterComponent