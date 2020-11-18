import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './descriptionContainer.scss'
import { PhoneService } from '../../services/phone'
import { setLoading } from '../../store/ui/actions'

class DescriptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      phoneInfo: {
        name: '',
        manufacturer: '',
        description: '',
        color: '',
        price: '',
        imageFileName: '',
        screen: '',
        processor: '',
        ram: ''
      }
    }
  }

  componentDidMount(){
    if(this.props.match) {
      this.props.setLoading(true)
      const { id } = this.props.match.params
      PhoneService.getInfo(id).then(({data: info}) => {
        this.setState({ phoneInfo: info })
        this.props.setLoading(false)
      })
    }
  }

  render() {
    return (
      <>
        <div>description container</div>
    <div>{ Object.keys(this.state.phoneInfo).map(el => <div key={el}>{ el } - { this.state.phoneInfo[el] }</div>)}</div>
      </>
    )
  }
}

const mapDispatchToProps = {
  setLoading
}

DescriptionContainer.propTyoes = {
  match: PropTypes.object,
  setLoading: PropTypes.func
}

export default connect(null, mapDispatchToProps)(DescriptionContainer)