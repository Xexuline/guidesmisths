
import React from 'react'
import { Link } from 'react-router-dom'
import './extra-actions.scss'

function ExtraActions(props) {
  const id = props.id
  const onDelete = props.onDelete
  const onSave = props.onSave
  return (
   <nav className="extra">
     <ul className="extra__wrapper">
        { !id ? null : 
          <li className="extra__item">
            <Link className="extra__button" to={`/update/${id}`}>Edit</Link>
          </li>}
        {!onDelete? null : 
          <li className="extra__item">
            <button className="extra__button" onClick={ onDelete }>Delete</button>
          </li>}
        {!onSave ? null : 
          <li className="extra__item">
            <button className="extra__button" onClick={ onSave }>Save</button>
          </li>}
     </ul>
   </nav>
  )
}

export default ExtraActions