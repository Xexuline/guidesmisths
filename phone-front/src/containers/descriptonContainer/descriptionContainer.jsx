import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './descriptionContainer.scss'
import { PhoneService } from '../../services/phone'
import { setLoading } from '../../store/ui/actions'
import noPhponeimg from '../../assets/img/svg/noPhone.svg'
import emptyImage from '../../assets/img/svg/empty.svg'
import ExtraActions from '../../components/extra-actions/extra-actions'

class DescriptionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      phoneInfo: {
        id: '',
        name: '',
        manufacturer: '',
        description: '',
        color: '',
        price: '',
        imageFileName: emptyImage,
        screen: '',
        processor: '',
        ram: ''
      }
    }
  }

  phoneAttributeGenerator(description, content) {
    if (!content || ['imageFileName', 'description', 'id'].includes(description) ) {
      return null
    }

    return (
    <div key={ description } className="description__attributes--box">
      <span className="description__attributes--description">{ description }</span>
      <span className="description__attributes--content">{ content }</span>
    </div>)
  }

  getPhoneInfo(id) {
    PhoneService.getInfo(id).then(({data: info}) => {
      const { description,
        _id,
        imageFileName,
        color,
        price,
        screen,
        processor,
        ram } = info
      this.setState({ phoneInfo: {
        id: _id,
        description,
        imageFileName: imageFileName || '',
        color,
        price,
        screen,
        processor,
        ram }})
      this.props.setLoading(false)
    })
  }

  async removePhone() {
    await PhoneService.remove(this.state.phoneInfo.id)
    this.props.history.push('/')
  }

  componentDidMount(){
    if(this.props.match) {
      console.log(this.props)
      this.props.setLoading(true)
      const { id } = this.props.match.params
      this.getPhoneInfo(id)      
    }
  }

  render() {
    const { phoneInfo } = this.state
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
            { Object.keys(this.state.phoneInfo).map(phoneAttribute => this.phoneAttributeGenerator(phoneAttribute, phoneInfo[phoneAttribute])) }
          </div>
          { 
            !phoneInfo.description ? null :
            <div>
              <p><span className="description__paragraph">Description:</span> <span>{ phoneInfo.description }</span></p>
            </div>
          }
        </div>
        <ExtraActions id={ phoneInfo.id } onDelete={ this.removePhone.bind(this) } />
      </article>
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