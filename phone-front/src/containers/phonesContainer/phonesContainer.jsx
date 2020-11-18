import React, { Component } from 'react'
import PhoneCard from '../../components/phone-card/phoneCard'
import BackToTop from '../../components/back-to-top/back-to-top'
import './phonesContainer.scss'
import { PhoneService } from '../../services/phone'

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
      !this.state.showBackToTop && this.setState({ showBackToTop: true }, () => { console.log('cambiado,', true)})
    } else {
      this.state.showBackToTop && this.setState({ showBackToTop: false }, () => { console.log('cambiado,', false)})
    }
  }

  getPhonesList() {
    PhoneService
      .getList()
      .then(({data: phoneList}) => {
        this.setState({ 
          phoneList
        })
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

PhonesContainer.propTypes = {}

export default PhonesContainer