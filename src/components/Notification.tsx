import styled from "styled-components"

interface NotificationProps {
   show: boolean
   exists: boolean
}

const Container = styled.div<Pick<NotificationProps, "show">>`
   ${props => props.show ? `right: 2%` : `right: -400px`};
   ${props => props.theme.title === 'light' && `box-shadow: 0 3px 10px rgba(${props.theme.shadow},.5);`}

   position: fixed;
   z-index: 99;
   top: 10%;
   width: 300px;
   font-size: 0.8rem;
   flex: 1;
   border-radius: 5px;
   padding: 12px;
   transition: right 1s;
`

const Header = styled.div`
   padding: 6px 12px;
   background: inherit;
   font-weight: bold;
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