import React from 'react'

export default function PhoneEditor (props) {
  const { phoneInfo, phoneAttributeGenerator } = props
  return (
    <>
      <div className="description__top description__top--editor">
        <img className="description__image" src={  phoneInfo.imageFileName ? `http://localhost:3001/uploads/${phoneInfo.imageFileName}` : null} alt=""/>
      </div>
      <div className="description__bottom description__bottom--editor">
        <div className="description__attributes">
          { Object.keys(phoneInfo).map(phoneAttribute => phoneAttributeGenerator(phoneAttribute, phoneInfo[phoneAttribute])) }
        </div>
        <div className="description__field">
          <label className="description__paragraph" htmlFor="phone_description">Description: </label>
          <textarea id="phone_description" defaultValue={phoneInfo.description} rows="4"></textarea>
        </div>
      </div>
    </>
  )
}