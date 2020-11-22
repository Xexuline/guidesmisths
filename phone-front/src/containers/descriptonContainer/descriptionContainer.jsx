import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './descriptionContainer.scss'
import { setLoading } from '../../store/ui/actions'
import { ThunkActions } from '../../store/phones/actions'
import { getPhoneInfo } from '../../store/phones/getters'
import ExtraActions from '../../components/extra-actions/extra-actions'
import PhoneViever from '../../components/phoneViewer/phoneViewer'
import PhoneEditor from '../../components/phoneEditor/phoneEditor'

class DescriptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEdditing: false
    }

  }

  getPhoneId() {
    return this.props.match.params.id
  }

  async removePhone() {
    const id = this.getPhoneId()
    await this.props.removePhone(id)
    this.props.history.push('/')
  }

  async updatePhone(e) {
    e.preventDefault()

    const updatedData = Object.keys(this.props.phoneInfo).reduce((prev, curr) => {
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
    await this.props.updatePhone(updatedData)
    this.props.history.push(`/${this.props.phoneInfo.id}`)

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
    if(this.props.match) {
      this.setState({ isEdditing: this.props.match.path === '/update/:id' }, () => {
        this.changeExtraPosition()
      })
      const id = this.getPhoneId()
      this.props.getPhoneInfo(id)      
    }
    window.addEventListener('resize', this.changeExtraPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeExtraPosition)
  }

  componentDidUpdate(prevProp) {
    if (prevProp.match.path !== this.props.match.path) {
      this.setState({ isEdditing: this.props.match.path === '/update/:id' }, () => {
        this.changeExtraPosition()
      })
    }
  }

  render() {
    const { phoneInfo } = this.props
    const { isEdditing } = this.state

    return (
      <>
        { isEdditing
          ? <form className="description__wrapper">
              <PhoneEditor phoneInfo={ phoneInfo } />
              <ExtraActions onSave={ this.updatePhone.bind(this) }/>
            </form>
          : <article className="description__wrapper"> 
              <PhoneViever phoneInfo={ phoneInfo } />
              <ExtraActions id={ phoneInfo.id } onDelete={ this.removePhone.bind(this) }/>
            </article>
        }
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoading: dispatch(setLoading),
  getPhoneInfo: bindActionCreators(ThunkActions.getPhoneInfo, dispatch),
  removePhone: bindActionCreators(ThunkActions.removePhone, dispatch),
  updatePhone: bindActionCreators(ThunkActions.updatePhone, dispatch)
})

const mapStateToProps = (state) => ({
  phoneInfo: getPhoneInfo(state)
})

DescriptionContainer.propTyoes = {
  match: PropTypes.object,
  setLoading: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionContainer)