import styled from "styled-components";

export const Main = styled.main`
  padding: 3rem 0;

  .container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  h1 {
    color: ${props => props.theme.text};
    border-bottom: 1px solid ${props => props.theme.text};
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

export const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;