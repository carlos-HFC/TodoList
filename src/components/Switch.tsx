import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Container = styled.label`
   position: relative;
   display: inline-block;
   width: 50px;
   height: 15px;

   input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider-round {
         background: #000;

         &::before {
            transform: translateX(30px);
         }
      }

      &:focus + .slider-round {
         box-shadow: 0 0 1px #000
      }
   }

   .slider-round {
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
   }
`

interface Props {
   handleTheme(theme: string): void
}

export default function Switch({ handleTheme }: Props) {
   const { title } = useContext(ThemeContext)

   return (
      <Container>
         {title === 'light'
            ? <input type="checkbox" onClick={() => handleTheme('light')} />
            : <input type="checkbox" onClick={() => handleTheme('dark')} defaultChecked />
         }
         <span className="slider-round" />
      </Container>
   )
}
