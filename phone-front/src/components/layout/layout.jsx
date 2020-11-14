import React, { Component } from 'react'
import './layout.scss'
import propTypes from 'prop-types'

class LayoutComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <article className="layout">
        <header className="layout__header">
          {this.props.header}
        </header>
        <div className="layout__left">
          {this.props.left}
        </div>
        <div className="layout__right">
          {this.props.right}
        </div>
        <footer className="layout__footer">
          { this.props.footer }
        </footer>
      </article>
    )
  }
}

LayoutComponent.propTypes = {
  header: propTypes.node,
  left: propTypes.node,
  right: propTypes.node,
  footer: propTypes.node
}

export default LayoutComponent