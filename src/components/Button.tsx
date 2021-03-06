import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background: "danger" | "elixir" | "primary" | "secondary" | "success" | "typescript" | "warning"
}

const Button: React.FC<ButtonProps> = ({ children, background, ...props }) => {
  let classes = `btn btn-${background}`

  if (props.className) classes += ` ${props.className}`

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}

export default Button
