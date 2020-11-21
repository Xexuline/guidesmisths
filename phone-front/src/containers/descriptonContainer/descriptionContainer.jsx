import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './descriptionContainer.scss'
import { setLoading } from '../../store/ui/actions'
import { ThunkActions } from '../../store/phones/actions'
import { getPhoneInfo } from '../../store/phones/getters'
import noPhponeimg from '../../assets/img/svg/noPhone.svg'
import ExtraActions from '../../components/extra-actions/extra-actions'

class DescriptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  phoneAttributeGenerator(description, content) {
    if (!content || ['imageFileName', 'description', 'id', 'name', 'manufacturer'].includes(description) ) {
      return null
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

      // debugger
      extra.style.left = `${offsetLeft}px`
      extra.style.maxWidth = `${clientWidth}px`
    } else {
      extra.style.left = ''
      extra.style.maxWidth = ''
    }
  }


  componentDidMount(){
    if(this.props.match) {
      const id = this.getPhoneId()
      this.props.getPhoneInfo(id)      
    }
    window.addEventListener('resize', this.changeExtraPosition)
    this.changeExtraPosition()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeExtraPosition)
  }

  render() {
    const { phoneInfo } = this.props

    return (
      <article className="description__wrapper">
        <div className="description__top">
          <img className="description__image" src={  phoneInfo.imageFileName ? `http://localhost:3001/uploads/${phoneInfo.imageFileName}` : noPhponeimg } alt=""/>
          <div className="description__header">
            <h2>{ phoneInfo.name }</h2>
            <h3>{ phoneInfo.manufacturer }</h3>
          </div>
        </div>
        <div className="description__bottom">
          <div className="description__header">
            <h2>{ phoneInfo.name }</h2>
            <h3>{ phoneInfo.manufacturer }</h3>
          </div>
          <div className="description__attributes">
            { Object.keys(phoneInfo).map(phoneAttribute => this.phoneAttributeGenerator(phoneAttribute, phoneInfo[phoneAttribute])) }
          </div>
          { 
            !phoneInfo.description ? null :
            <div>
              <p><span className="description__paragraph">Description:</span> <span>{ phoneInfo.description }</span></p>
            </div>
          }
        </div>
        <ExtraActions id={ phoneInfo.id } onDelete={ this.removePhone.bind(this) }/>
      </article>
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