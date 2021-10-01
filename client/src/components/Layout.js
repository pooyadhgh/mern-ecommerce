import { Container } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const Layout = props => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>{props.children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
