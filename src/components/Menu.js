import {useContext, useState} from "react";
import {
    Button,
    Container,
    DropdownButton,
    Form,
    FormControl,
    Image,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas
} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {UserContext} from "../App";

function Menu(props) {
    const currentUser = useContext(UserContext);

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const isAdmin = (currentUser?.role.name === "admin");

    const handleClose = () => setShowCanvas(false);
    const handleShow = () => setShowCanvas(true);
    const showDropdown = () => setShowProfileDropdown(!showProfileDropdown);
    const hideDropdown = () => setShowProfileDropdown(false);

    return (
        <Navbar className="mb-5" bg="light" expand={false}>
            <Container fluid>
                <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar"/>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    show={showCanvas}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={NavLink} to="/" onClick={handleClose}>Home</Nav.Link>
                            {isAdmin && <Nav.Link as={NavLink} to="/table" onClick={handleClose}>List of employees</Nav.Link>}
                            <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Brand className={"ms-5 ps-5 d-none d-sm-block"} href="#">
                    <Image className={"pb-1 me-2 "} src={"payment.png"}></Image>
                    SalaryApp
                </Navbar.Brand>
                <Navbar.Text>
                    <DropdownButton
                        disabled id="dropdown-button-drop-start"
                        drop="start" title="Profile" variant="success"
                        show={showProfileDropdown}
                        onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                        {currentUser ? (
                                <>
                                    <Container className="mt-3 mx-3">
                                        Signed in as:
                                        <Link to="/profile">{currentUser.emailAddress}</Link>
                                    </Container>
                                    <Container className="m-3 mx-3">
                                        <Button as={NavLink}
                                                to="/" onClick={props.logOut}>
                                            Log out
                                        </Button>
                                    </Container>
                                </>
                            )
                            : (<>
                                <Container className="mt-2">
                                    <Link to="/login">
                                        <Button variant="success" className={"w-100"}>LogIn</Button>
                                    </Link>
                                </Container>
                                <Container className="mt-2">
                                    <Link to="/signup">
                                        <Button variant="secondary" className={"w-100"}>SignUp</Button>
                                    </Link>
                                </Container>

                            </>)}
                    </DropdownButton>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Menu;