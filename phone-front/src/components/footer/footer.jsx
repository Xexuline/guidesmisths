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
      <div className="footer"><span>Made with <span className="icon icon-heart"></span> by <a href="lindekin"><span className="icon icon-linkedin"></span></a><a href="github"><span className="icon icon-github"></span></a></span></div>
    )
  }
}

export default FooterComponent