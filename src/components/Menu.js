import {useContext, useState} from "react";
import {Button, Container, DropdownButton, Image, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
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
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={NavLink} to="/" onClick={handleClose}>Home</Nav.Link>
                            {currentUser ? (
                                <>
                                    <Nav.Link as={NavLink} to="/benefits" onClick={handleClose}>
                                        My benefits
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/vacations" onClick={handleClose}>
                                        My vacations
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/calculator" onClick={handleClose}>
                                        Salary net calculator
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/payslip" onClick={handleClose}>
                                        Generate payslip file
                                    </Nav.Link>
                                </>) : (
                                <>
                                    <Nav.Link
                                        as={NavLink} to="/login" onClick={handleClose}>Log in</Nav.Link>
                                    <Nav.Link
                                        as={NavLink} to="/singup" onClick={handleClose}>Sing up</Nav.Link>
                                </>)}

                            {isAdmin &&
                                <NavDropdown title="Admin actions" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="/report" onClick={handleClose}>
                                        Generate bank report
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/table" onClick={handleClose}>
                                        List of employees
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/vacationRequests" onClick={handleClose}>
                                        List of vacation requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/benefitRequests" onClick={handleClose}>
                                        List of benefit requests
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
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