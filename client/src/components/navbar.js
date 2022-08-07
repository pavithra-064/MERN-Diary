import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
const navbar = () => {
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("uid", { path: "/" });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="md" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="/entries">Dear-Diary</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="text-center">
              <Nav.Link href="/newentry">New Entry</Nav.Link>
              <Nav.Link href="/entries">View Entries</Nav.Link>
              <Nav.Link href="/" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar collapseOnSelect bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home">Dear-Diary</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-end">
              <Nav.Link href="/newentry" className="float-right">
                New Entry
              </Nav.Link>
              <Nav.Link href="/entries">All Entries</Nav.Link>
              <Nav.Link href="#link">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      {/* </div>
      <div class="container-fluid overflow-hidden d-block d-lg-none d-md-block d-sm-block">
        <Navbar collapseOnSelect bg="light" expand="md">
          <Container>
            <Navbar.Brand href="#home">Dear-Diary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div class="row vh-100 overflow-auto">
                <div class="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
                  <div class="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                    <a
                      href="/"
                      class="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none"
                    >
                      <span class="fs-5">
                        B<span class="d-none d-sm-inline">rand</span>
                      </span>
                    </a>
                    <ul
                      class="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                      id="menu"
                    >
                      <li class="nav-item">
                        <a href="#" class="nav-link px-sm-0 px-2">
                          <i class="fs-5 bi-house"></i>
                          <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" class="nav-link px-sm-0 px-2">
                          <i class="fs-5 bi-grid"></i>
                          <span class="ms-1 d-none d-sm-inline">Products</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="nav-link px-sm-0 px-2">
                          <i class="fs-5 bi-people"></i>
                          <span class="ms-1 d-none d-sm-inline">
                            Customers
                          </span>{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div> */}
    </div>
  );
};

export default navbar;
