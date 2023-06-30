import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/">Talent Project</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Customer</Nav.Link>
                            <Nav.Link href="/product">Product</Nav.Link>
                            <Nav.Link href="/store">Store</Nav.Link>
                            <Nav.Link href="/sale">Sale</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    };
}
export default HeaderComponent;