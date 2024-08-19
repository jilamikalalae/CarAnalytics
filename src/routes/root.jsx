import { NavLink, Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Root = () => {
  // return (
  //     <nav>
  //         <ul>
  //             <li><Link to="/">Home</Link></li>
  //             <li><Link to="/about">About</Link></li>
  //             <li><Link to="/projects">Projects</Link></li>
  //             <li><Link to="/contact">Contact</Link></li>
  //         </ul>
  //     </nav>
  // );
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='dashboard'>Car Analytics</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='dashboard'>Dashboard</Nav.Link>
            <Nav.Link href='highlight'>Highlight</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <Outlet/>
      </div>
    </>
  );
}

export default Root;