import React, { Component } from 'react'
import PhoneCard from '../../components/phone-card/phoneCard'
import './phonesContainer.scss'
import propTypes from 'prop-types'

// TODO Mock api
const phones = [
  {id: 0,name: "iPhone 7"},
  {id: 1,name: "iPhone 8"},
  {id: 2,name: "iPhone 7"},
  {id: 3,name: "iPhone 8"},
  {id: 4,name: "iPhone 7"},
  {id: 5,name: "iPhone 8"},
  {id: 6,name: "iPhone 7"},
  {id: 7,name: "iPhone 8"},
  {id: 8,name: "iPhone 7"},
  {id: 9,name: "iPhone 8"}
]
class PhonesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { selectPhone } = this.props
    return (
      <div className="phone-container">
        { phones.map(el => 
          <PhoneCard name={el.name} key={`phone-${el.id}`} click={ selectPhone }/>
        ) }
      </div>

    )
  }
}

PhonesContainer.propTypes = {
  selectPhone: propTypes.func
}

export default PhonesContainer