import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: "Oxygen", sans-serif;
    overflow-y: scroll;
  }

  svg {
    margin-bottom: .25rem
  }

  header {
    background: ${props => props.theme.primary};
    color: #fff;
    display: flex;
    font-size: 1.4rem;
    font-weight: bold;
    height: 70px;
    padding: 0 30px;

    div {
      align-items: center;
      display: inherit;
      justify-content: space-between;
    }
    
    svg {
      margin-left: 25px;
    }
  }

  .my-list {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

    .checked {
      background: ${props => props.theme.checked};
      border-color: ${props => props.theme.borderChecked};
      color: #aaa;
      font-style: italic;
      text-decoration: line-through;
      transition: 0.3s;
    }

    @media screen and (min-width: 768px) {
      width: 75%;
    }

    li {
      align-items: center;
      border: 2px solid #e1e5e7;
      border-radius: 5px;
      box-shadow: 0 2px 2px 1px rgba(${props => props.theme.shadow}, .2);
      display: flex;
      justify-content: space-between;
      margin-bottom: 2%;
      padding: 10px 15px;
      transition: 0.3s;

      &:last-child {
        margin-bottom: 0;
      }

      span, label {
        flex: 1;
        flex-wrap: wrap;
        margin-bottom: 0;
        margin-right: 5px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .my-query {
      &__btn {
        width: 100%;
      }
    }
  }

  label.btn-typescript {
    margin-bottom: 0;
  }
  
  .importButtons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    @media screen and (max-width: 767px) {
      justify-content: space-between;
    }
  }

  input[type="checkbox"], input[type="radio"] {
    appearance: none;
    border: 1px solid #bfbfbf;
    outline: none;
    position: relative;
    transition: background-color .3s;

    &:checked {
      background: #999;
      border-color: #999;
    }
  }

  input[type="radio"] {
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
  }

  input[type="checkbox"] {
    border-radius: 4px;
    height: 1.2rem;
    width: 1.2rem;
  }
`