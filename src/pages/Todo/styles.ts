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
    font-size: 1.75rem;
    border-bottom: 1px solid ${props => props.theme.text};
    text-align: center;
    padding-bottom: 1rem;
    transition: color .3s, border-color .3s;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    @media (min-width: 992px) {
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