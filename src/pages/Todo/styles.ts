import { lighten } from "polished";
import styled from "styled-components";

import { COLORS } from "../../css/themes/variables";

export const Main = styled.main`
  padding: 3rem 0;

  .container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  h1 {
    color: ${props => props.theme.text};
    border-bottom: 1px solid ${props => lighten(.5, props.theme.text)};
    text-align: center;
    padding-bottom: 1rem;
    transition: color .3s, border-color .3s;
    font-size: 1.5rem;
    
    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`;

export const Filter = styled.section<{ open: boolean; }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
      width: 80%;
    }

    h2 {
      color: ${props => props.theme.text};
      font-size: 1.25rem;
    }

    button {
      border-radius: .25rem;
      padding: .5rem;
    }
  }

  .filter {
    max-height: 0;
    overflow: hidden;
    transition: max-height .5s;
    width: 100%;
    ${props => props.open && `
      max-height: 500px;
      transition: max-height 1.5s;
    `};
    
    @media (min-width: 768px) {
      width: 80%;
    }

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 1rem 0;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      input[type="text"] {
        box-shadow: inset 0 0 0 0.15rem ${lighten(.7, COLORS.black)};
      }

      fieldset {
        display: flex;
        justify-content: center;
        gap: 1rem;
        border: 0;
        flex-direction: column;
        width: 100%;

        span {
          color: ${props => props.theme.text};
        }

        .filter_types{
          display: flex;
          gap: 1rem;
          flex-direction: column;

          @media (min-width: 768px) {
            flex-direction: row;
          }

          &-check {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            align-items: center;
            width: auto;

            input[type="radio"] {
              appearance: none;
              border: 1px solid ${COLORS.gray400};
              outline: none;
              position: relative;
              transition: background-color .2s, border-color .2s;
              border-radius: 50%;
              height: 1rem;
              width: 1rem;
              min-width: 1rem;
              max-width: 1rem;
              min-height: 1rem;
              max-height: 1rem;
              user-select: none;

              &:checked {
                background: ${COLORS.gray600};
                border-color: ${COLORS.gray600};
              }
            }

            label {
              color: ${props => props.theme.text};
            }
          }
        }
      }

      .filter_btns {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 0.5rem;

        @media (min-width: 768px) {
          flex-direction: row;
          width: auto;
        }
        
        button {
          width: 100%;
          
          @media (min-width: 768px) {
            width: auto;
          }
        }
      }
    }
  }
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid ${props => props.theme.list.border};
    border-radius: 0.5rem;
    width: 100%;
    padding: .675rem 1rem;
    box-shadow: 0 1px 2px 1px ${props => props.theme.shadow};
    background: ${props => props.theme.background};
    transition: box-shadow .3s, border-color .3s, background-color .3s;
    position: relative;
    gap: 1rem;
    flex-direction: row;

    @media (min-width: 992px) {
      width: 80%;
    }

    input {
      height: 100%;
      appearance: none;
      line-height: 1.5;
      border-radius: .25rem;
      border: 0;
      padding: .25rem 1rem;
      font-size: 1rem;
      color: ${props => props.theme.text};
      background: transparent;
      box-shadow: 0 0 0 .15rem ${lighten(.7, COLORS.black)};
      outline: none;
      width: 100%;

      @media (min-width: 768px) {
        width: 80%;
      }
    }

    button {
      padding: 0.5rem;
      font-size: .8rem;
      border-radius: .25rem
    }
  }
`;