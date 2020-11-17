import React, { Component } from 'react'
import PhoneCard from '../../components/phone-card/phoneCard'
import './phonesContainer.scss'
import propTypes from 'prop-types'

// TODO Mock api
class PhonesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showBackToTop: false
    }

    this.checkScroll = this.checkScroll.bind(this)
  }

  checkScroll(e) {
    // const firstElement = document.querySelector('.phone-card__wrapper')
    
    // console.log(firstElement)
    // console.log('offsetTop', firstElement.offsetTop, 'scrollTop', firstElement.scrollTop, 'clientTop', firstElement.clientTop)
    // console.log(e)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll)
  }

  render() {
    const { phones } = this.props
    return (
      <div className="phone-container">
        { phones.map(el => 
          <PhoneCard key={`phone-${el._id}`} { ...el }/>
        ) }
      </div>

    )
  }
}

PhonesContainer.propTypes = {
  phones: propTypes.array
}

export default PhonesContainer