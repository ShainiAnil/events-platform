import React from 'react'
import { ucFirst } from '../../utils/util'
export const Select = ({label, roles, handleChange,errorFields}) => {
  return (
    <div className="input-section dropdown-section">
          <label htmlFor={label}>
          {ucFirst(label)} <span className="danger">*</span>
          </label>
          <select name={label} id={label} onChange={handleChange}>
            <option value="">Select</option>
            {
                roles.map(role =>(<option value={role.toLowerCase()} key={role}>{role}</option>))
            }
            
          </select>
          {errorFields[label]&& <p className="danger">{ucFirst(label)} is required</p>}
        </div>
  )
}

