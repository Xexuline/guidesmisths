import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../descriptonContainer/descriptionContainer.scss'
import { setLoading } from '../../store/ui/actions'
import { getPhoneInfo } from '../../store/phones/getters'
import ExtraActions from '../../components/extra-actions/extra-actions'
import PhoneEditor from '../../components/phoneEditor/phoneEditor'
import { ThunkActions } from '../../store/phones/actions'

class CreationContainer extends Component {

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

  async createPhone(e) {
    e.preventDefault()

    const phoneData = Object.keys(this.props.phoneInfo).reduce((prev, curr) => {
      const field = document.querySelector(`#field_${curr}`)
      if(['price', 'ram'].includes(curr)) {
        field.value = Number.parseInt(field.value) || 0
      }

      if( curr === 'imageFileName') {
        return {
          ...prev,
          [curr]: field.files[0]
        }
      }

      return {
        ...prev,
        [curr]: field?.value || this.props.phoneInfo[curr]
      }
    }, {})
    const { id } = await this.props.createPhone(phoneData)
    this.props.history.push(`/${id}`)

  }

  changeExtraPosition() {
    const pageWidth = document.querySelector('body').clientWidth
    const extra = document.querySelector('nav.extra')

    if (pageWidth > 768) {
      const {offsetLeft, clientWidth } = document.querySelector('.description__bottom')

      extra.style.left = `${offsetLeft}px`
      extra.style.maxWidth = `${clientWidth}px`
    } else {
      extra.style.left = ''
      extra.style.maxWidth = ''
    }
  }

  componentDidMount(){
    this.changeExtraPosition()
    window.addEventListener('resize', this.changeExtraPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeExtraPosition)
  }

  componentDidUpdate(prevProp) {
    
  }

  render() {
    const { phoneInfo } = this.state

    return (
      <form className="description__wrapper">
        <PhoneEditor phoneInfo={ phoneInfo } />
        <ExtraActions onSave={ this.createPhone.bind(this) }/>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoading: dispatch(setLoading),
  createPhone: bindActionCreators(ThunkActions.createPhone, dispatch),
})

const mapStateToProps = (state) => ({
  phoneInfo: getPhoneInfo(state)
})

CreationContainer.propTyoes = {
  match: PropTypes.object,
  setLoading: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CreationContainer)