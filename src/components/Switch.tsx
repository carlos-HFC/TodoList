import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Container = styled.label`
   position: relative;
   display: inline-block;
   width: 50px;
   height: 15px;
`

const SliderRound = styled.span`
   background: #fff;
   position: absolute;
   cursor: pointer;
   top: 0;
   bottom: 0;
   right: 0;
   left: 0;
   transition: .2s;
   border-radius: 30px;
   
   &::before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 0;
      bottom: -3px;
      background: #aaa;
      transition: .2s;
      border-radius: 50%;
   }
`

const Check = styled.input`
   opacity: 0;
   width: 0;
   height: 0;

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