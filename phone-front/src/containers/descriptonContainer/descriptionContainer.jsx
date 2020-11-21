import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './descriptionContainer.scss'
import { setLoading } from '../../store/ui/actions'
import { ThunkActions } from '../../store/phones/actions'
import { getPhoneInfo } from '../../store/phones/getters'
import ExtraActions from '../../components/extra-actions/extra-actions'
import PhoneViever from './phoneViewer'
import PhoneEditor from './phoneEditor'

class DescriptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEdditing: false
    }

  }

  phoneAttributeGenerator(description, content) {
    if (!content || ['imageFileName', 'description', 'id', 'name', 'manufacturer'].includes(description) ) {
      return null
    }

    if(this.state.isEdditing) {
      return (
        <div key={ description } className="description__field">
          <label htmlFor={`field_${description}`}>{ description }:</label>
          <input type="text" defaultValue={content}></input>
        </div>
      )
    }

    return (
    <div key={ description } className="description__attributes--box">
      <span className="description__attributes--description">{ description }</span>
      <span className="description__attributes--content">{ content }</span>
    </div>)
  }

  getPhoneId() {
    return this.props.match.params.id
  }

  async removePhone() {
    const id = this.getPhoneId()
    await this.props.removePhone(id)
    this.props.history.push('/')
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
      this.setState({ isEdditing: this.props.match.path === '/update/:id' }, () => {this.changeExtraPosition()})
    }
  }

  render() {
    const { phoneInfo } = this.props
    const { isEdditing } = this.state

    return (
      <>
        { isEdditing
          ? <form className="description__wrapper">
              <PhoneEditor phoneInfo={ phoneInfo } phoneAttributeGenerator={ this.phoneAttributeGenerator.bind(this) }/>
              <ExtraActions onSave={ () => {} }/>
            </form>
          : <article className="description__wrapper"> 
              <PhoneViever phoneInfo={ phoneInfo } phoneAttributeGenerator={ this.phoneAttributeGenerator.bind(this) }/>
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
  removePhone: bindActionCreators(ThunkActions.removePhone, dispatch)
})

const mapStateToProps = (state) => ({
  phoneInfo: getPhoneInfo(state)
})

DescriptionContainer.propTyoes = {
  match: PropTypes.object,
  setLoading: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionContainer)