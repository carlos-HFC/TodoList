import React, { InputHTMLAttributes } from 'react'

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> { }

const RadioButton: React.FC<RadioProps> = ({ children, ...props }) => {
   return (
      <div className="form-check-inline" title={props.title}>
         <input type="radio" className="form-check-input" {...props} />
         <label htmlFor={props.id} className="form-check-label">{children}</label>
      </div>
   )
}

export default RadioButton
