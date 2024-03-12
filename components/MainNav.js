import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';

function NavScrollExample() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${encodeURIComponent(search)}`);
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container fluid>
          <Navbar.Brand href="/">Marcus Brown</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                name="search"
                value={search}
                onChange={changeHandler}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
    </>
  );
}

export default NavScrollExample;
