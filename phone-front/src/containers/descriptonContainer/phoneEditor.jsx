import React from 'react'

export default function PhoneEditor (props) {
  const { phoneInfo, phoneAttributeGenerator } = props

  function changeImage({target}) {
    document.querySelector('img.description__image').src = URL.createObjectURL(target.files[0])
  }

  return (
    <>
      <div className="description__top description__top--editor">
        <img className="description__image" src={  phoneInfo.imageFileName ? `http://localhost:3001/uploads/${phoneInfo.imageFileName}` : null} alt=""/>
        <div>
          <input type="file" id="field_imageFileName" accept="image/x-png,image/gif,image/jpeg" onChange={ changeImage }></input>
        </div>
      </div>
      <div className="description__bottom description__bottom--editor">
        <div className="description__attributes">
          { Object.keys(phoneInfo).map(phoneAttribute => phoneAttributeGenerator(phoneAttribute, phoneInfo[phoneAttribute])) }
        </div>
        <div className="description__field">
          <label className="description__paragraph" htmlFor="field_description">Description: </label>
          <textarea id="field_description" defaultValue={phoneInfo.description} rows="4"></textarea>
        </div>
      </div>
    </>
  )
}