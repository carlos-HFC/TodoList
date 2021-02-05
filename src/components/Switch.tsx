import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Container = styled.label`
  display: inline-block;
  height: 15px;
  position: relative;
  width: 50px;
`

const SliderRound = styled.span`
  background: #fff;
  border-radius: 30px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .2s;
  
  &::before {
    background: #aaa;
    border-radius: 50%;
    bottom: -3px;
    content: "";
    height: 22px;
    left: 0;
    position: absolute;
    transition: .2s;
    width: 22px;
  }
`

const Check = styled.input`
  height: 0;
  opacity: 0;
  width: 0;

  &:checked + ${SliderRound} {
    background: #000;

    &::before {
      transform: translateX(30px)
    }
  }

  &:focus + ${SliderRound} {
    box-shadow: 0 0 1px #000
  }
`

interface SwitchProps {
  handleTheme: (theme: string) => void
}

const Switch: React.FC<SwitchProps> = ({ handleTheme }) => {
  const { title } = useContext(ThemeContext)

  return (
    <Container title={`Modo ${title}`}>
      {title === 'light'
        ? <Check type="checkbox" onClick={() => handleTheme('light')} />
        : <Check type="checkbox" onClick={() => handleTheme('dark')} defaultChecked />
      }
      <SliderRound />
    </Container>
  )
}

export default Switch