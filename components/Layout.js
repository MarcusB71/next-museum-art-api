import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
const Layout = ({ children }) => {
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
};

export default Layout;
