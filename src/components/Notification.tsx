import styled from "styled-components"

interface NotificationProps {
  exists: boolean
  show: boolean
}

const Container = styled.div<Pick<NotificationProps, "show">>`
  ${props => props.show ? `right: 2%` : `right: -400px`};

  border-radius: 5px;
  font-size: 0.8rem;
  flex: 1;
  padding: 12px;
  position: fixed;
  top: 10%;
  transition: right 1s;
  width: 300px;
  z-index: 99;
`

const Header = styled.div`
  background: inherit;
  font-weight: bold;
  padding: 6px 12px;
`

const Body = styled.div`
  padding: inherit;
`

const Notification: React.FC<NotificationProps> = ({ show, exists }) => {
  return (
    <Container show={show} className={`alert notification-${exists ? 'danger' : 'success'}`}>
      <Header className={`notification-header-${exists ? 'danger' : 'success'}`}>
        {exists ? "Oopss..." : "Oba!"}
      </Header>
      <Body>
        {exists
          ? "Essa atividade já está cadastrada!"
          : "Sua atividade foi cadastrada com sucesso!"}
      </Body>
    </Container>
  )
}

export default Notification