import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import {
    Badge,
    Button,
    Container,
    Dropdown,
    FormControl,
    Nav,
    Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi"
export default function Header() {
  return (
    <div>
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Shopping Cart</Link>
                    </Navbar.Brand>

                    <Navbar.Text className="search">
                        <FormControl
                            style={{ width: 500 }}
                            type="search"
                            placeholder="Search a book..."
                            className="m-auto"

                            aria-label="Search"
                            

                        />
                    </Navbar.Text>

                    <Nav>
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="success" >
                                <a href='/bought'>
                                    <FaShoppingCart color="white" fontSize="25px" />
                                </a>
                            </Dropdown.Toggle>

                        </Dropdown>
                    </Nav>

                    <Nav>
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="danger">
                                <a href='/login'>
                                    <BiLogOut color="white" fontSize="25px" />
                                </a>
                            </Dropdown.Toggle>

                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
    </div>
  )
}
