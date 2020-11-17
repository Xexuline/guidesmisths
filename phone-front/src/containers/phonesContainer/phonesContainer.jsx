import React, { Component } from 'react'
import PhoneCard from '../../components/phone-card/phoneCard'
import './phonesContainer.scss'
import propTypes from 'prop-types'

// TODO Mock api
class PhonesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
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