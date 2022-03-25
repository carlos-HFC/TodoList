import { transparentize } from "polished";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

import { COLORS } from "../../css/themes/variables";

interface HeaderProps {
  handleTheme(): void;
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.header};
  height: 4rem;
  transition: background-color .3s;
  
  div {
    display: inherit;
    justify-content: space-between;
    align-items: inherit;
    
    h1 {
      color: ${COLORS.white};
      display: inherit;
      align-items: inherit;
      gap: 1rem;
      font-size: 1.25rem;
      
      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
`;

const Switch = styled.div`
  display: flex;
  align-items: center;

  span {
    border-radius: 1rem;
    background: ${props => props.theme.name === 'light' ? COLORS.white : COLORS.black};
    border: 1px solid ${props => props.theme.name === 'light' ? transparentize(.6, COLORS.gray300) : COLORS.black};
    cursor: pointer;
    transition: border-color 0.2s, background-color .2s;
    will-change: background-color, border-color;
    display: flex;
    align-items: center;
    width: 50px;
    height: 1.25rem;
    position: relative;
    box-shadow: 0 2px 4px rgba(0,0,0,.3);
  
    &::before {
      border-radius: 50%;
      background: ${COLORS.gray200};
      border: 1px solid ${transparentize(.6, COLORS.gray300)};
      bottom: -.25rem;
      content: "";
      height: 1.5rem;
      left: -.25rem;
      position: absolute;
      transition: transform 0.2s;
      width: 1.5rem;
      box-shadow: 0 0 0 1px ${props => props.theme.shadow};
      will-change: transform;
      ${props => props.theme.name === 'dark' && `transform: translateX(2rem)`}
    }
  }
`;

export function Header({ handleTheme }: HeaderProps) {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h1>
            TODO LIST
            <FaCheck />
          </h1>
        </div>
        <div>
          <Switch onClick={handleTheme} accessKey="s">
            <span />
          </Switch>
        </div>
      </div>
    </Wrapper>
  );
}
