import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Form,
  Button,
} from 'react-bootstrap';
import { searchHistoryAtom } from '@/pages/store';
import { useAtom } from 'jotai';

function NavScrollExample() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    let queryString = `title=true&q=${encodeURIComponent(search)}`;
    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?title=true&q=${encodeURIComponent(search)}`);
    setIsExpanded(false);
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
      >
        <br />
        <br />
        <Container>
          <Navbar.Brand href="/">Marcus Brown</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => {
                    setIsExpanded(false);
                  }}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/search'}
                  onClick={() => {
                    setIsExpanded(false);
                  }}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Nav className="navbar-nav">
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
              &nbsp;
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/favourites'}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/history'}
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default NavScrollExample;
