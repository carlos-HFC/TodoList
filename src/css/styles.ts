import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   body {
      font-family: "Oxygen", sans-serif;
      overflow-y: scroll;
      background: ${props => props.theme.background};
      color: ${props => props.theme.text}
   }

   svg {
      margin-bottom: .25rem
   }

   header {
      background: ${props => props.theme.primary};
      height: 70px;
      color: #fff;
      padding: 0 30px;
      display: flex;
      font-weight: bold;
      font-size: 1.4rem;

      div {
         display: inherit;
         align-items: center;
         justify-content: space-between;
         
      }
      
      svg {
         margin-left: 25px;
      }
   }

   .my-list {
      display: block;
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;

      .checked {
         text-decoration: line-through;
         font-style: italic;
         background: ${props => props.theme.checked};
         color: #aaa;
         border-color: ${props => props.theme.borderChecked};
         transition: 0.3s;
      }

      @media screen and (min-width: 768px) {
         width: 75%;
      }

      li {
         padding: 10px 15px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         box-shadow: 0 2px 2px 1px rgba(${props => props.theme.shadow}, .2);
         margin-bottom: 2%;
         border-radius: 5px;
         transition: 0.3s;
         border: 2px solid #e1e5e7;

         &:last-child {
            margin-bottom: 0;
         }

         span, label {
            flex: 1;
            flex-wrap: wrap;
            margin-right: 5px;
            margin-bottom: 0;
         }
      }
   }

   [class|="notification-header"] {
      padding: 6px 12px;
      background: inherit;
   }

   .notification {
      position: fixed;
      z-index: 99;
      top: 10%;
      right: -400px;
      width: 300px;
      font-size: 0.8rem;
      flex: 1;
      border-radius: 5px;
      padding: 12px;
      transition: right 1s;

      &-body {
         padding: inherit
      }
   }

   ${props => {
      if (props.theme.title === 'light') {
         return css`
            .notification {
               box-shadow: 0 3px 10px rgba(${props.theme.shadow},.5);
            }
         
         `
      }
   }}

   @media screen and (max-width: 767px) {
      .my-query {
         &__btn {
            width: 100%;
         }
      }
   }

   input[type="radio"] {
      position: relative;
      width: 1rem;
      height: 1rem;
      border: 1px solid #bdbdbd;
      border-radius: 50%;
      appearance: none;
      outline: none;
      transition: background-color 0.3s;

      &:checked {
         border-color: #999;
         background: #999;
      }
   }

   input[type="checkbox"] {
      position: relative;
      width: 1.2rem;
      height: 1.2rem;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      appearance: none;
      outline: none;
      transition: background-color 0.3s;

      &:checked {
         border-color: #999;
         background: #999;
      }
   }
`