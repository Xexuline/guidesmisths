import React from 'react'

export default function PhoneViever (props) {
  const { phoneInfo, phoneAttributeGenerator } = props
  return (
    <>
      <div className="description__top">
        <img className="description__image" src={  phoneInfo.imageFileName ? `http://localhost:3001/uploads/${phoneInfo.imageFileName}` : null} alt=""/>
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
          { Object.keys(phoneInfo).map(phoneAttribute => phoneAttributeGenerator(phoneAttribute, phoneInfo[phoneAttribute])) }
        </div>
        { 
          !phoneInfo.description ? null :
          <div>
            <p><span className="description__paragraph">Description:</span> <span>{ phoneInfo.description }</span></p>
          </div>
        }
      </div>
    </>
  )
}