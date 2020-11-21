import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import PhoneCard from '../../components/phone-card/phoneCard'
import BackToTop from '../../components/back-to-top/back-to-top'
import './phonesContainer.scss'
import { setLoading } from '../../store/ui/actions'
import { ThunkActions } from '../../store/phones/actions'
import { getPhonesList } from '../../store/phones/getters'

class PhonesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showBackToTop: false,
    }

    this.checkScroll = this.checkScroll.bind(this)
    // this.getPhonesList = this.getPhonesList.bind(this)
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

  componentDidMount() {
    this.props.getPhonesList()
    window.addEventListener('scroll', this.checkScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll)
  }

  render() {
    const { phoneList } = this.props

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

const mapDispatchToProps = (dispatch) => ({
  setLoading: dispatch(setLoading),
  getPhonesList: bindActionCreators(ThunkActions.getPhones, dispatch)
})

const mapStateToProps = (state) => ({
  phoneList: getPhonesList(state)
})

PhonesContainer.propTypes = {
  setLoading: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer)