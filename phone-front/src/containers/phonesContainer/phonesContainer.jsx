import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PhoneCard from '../../components/phone-card/phoneCard'
import BackToTop from '../../components/back-to-top/back-to-top'
import './phonesContainer.scss'
import { PhoneService } from '../../services/phone'
import { setLoading } from '../../store/ui/actions'

// TODO Mock api
class PhonesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showBackToTop: false,
      phoneList: []
    }

    this.checkScroll = this.checkScroll.bind(this)
    this.getPhonesList = this.getPhonesList.bind(this)
  }

  checkScroll() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    const headerHeight = document.querySelector('.header').clientHeight

    if (scrollTop >= headerHeight) {
      !this.state.showBackToTop && this.setState({ showBackToTop: true })
    } else {
      this.state.showBackToTop && this.setState({ showBackToTop: false })
    }
  }

  getPhonesList() {
    this.props.setLoading(true)
    PhoneService
      .getList()
      .then(({data: phoneList}) => {
        this.setState({ phoneList })
        this.props.setLoading(false)
      })
  }

  componentDidMount() {
    this.getPhonesList()
    window.addEventListener('scroll', this.checkScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll)
  }

  render() {
    const { phoneList } = this.state

    return (
      <article className="phone-container__wrapper">
        <h2> Phone List</h2>
        <div className="phone-container">
          { phoneList.map(el => 
            <PhoneCard key={`phone-${el._id}`} { ...el }/>
          ) }
        </div>
        <BackToTop visible={ this.state.showBackToTop }/>
      </article>

    )
  }
}

const mapDispatchToProps = {
  setLoading
}

PhonesContainer.propTypes = {
  setLoading: PropTypes.func
}

export default connect(null, mapDispatchToProps)(PhonesContainer)