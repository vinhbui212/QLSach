import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const UserPage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetchBook();
    }, [])

    const filterBooks = () => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        filterBooks();
    }, [books, searchQuery]);

    const fetchBook = (() => {
        axios.get('http://localhost:8080/book')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    })

    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //         <a className="navbar-brand" href="/">List Book</a>

        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav mr-auto">
        //                 <li className="nav-item active">
        //                     <a className="nav-link" href="/bought">Cart <span className="sr-only"></span></a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="/login">Logout</a>
        //                 </li>

        //             </ul>
        //         </div>
        //     </nav>
        //     <table className="table table-striped table-bordered">
        //         <thead className="table-dark">
        //             <tr>
        //                 <th>Book Cover</th>
        //                 <th>Title</th>
        //                 <th>Author</th>
        //                 <th>Action</th>
        //             </tr>
        //         </thead>
        //     <tbody>
        //         {books.map(book =>(
        //             <tr key={book.id}>
        //                 <td><img style={{width:200, height:200 }} src={`http://localhost:8080\\image\\${book.img}`}/></td>
        //                 <td>{book.title}</td>
        //                 <td>{book.author}</td>
        //                 <td>
        //                      <Link className='btn btn-info' to={`/bookU/${book.id}`}>View</Link>
        //                  </td>
        //             </tr>
        //         ))}
        //     </tbody>

        //     </table>
        // </div> 

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
                            value={searchQuery}
                            onChange={handleSearch}

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

            <div>
            <div className='container'>
                    
                    <div className='row align-items-start '>

                        {filteredBooks.map(book => (
                                
                            <div className='col-md-4 mt-3 ' key={book.id}>
                                <div className='rounded border p-3 d-grid'>
                                    <div className='row'>
                                        <div className='col'>
                                            <a style={{ textDecoration: "none" ,color:"black" }} href={`/bookU/${book.id}`}>
                                                <p className='fs-2 fst-italic'>{book.title}</p>
                                            </a>

                                            <p className=' fst-italic'>Author: {book.author}</p>
                                            <p className=' fst-italic'>Type: {book.type}</p>
                                            <p className=' fst-italic'>Release: {book.date}</p>
                                            <p className=' fst-italic'>Page: {book.page}</p>
                                            
                                        </div>
                                        <div className='col  d-flex align-items-center justify-content-center'>
                                            <div className='vertical-line'></div>
                                            <img style={{ maxWidth: '100%',height:"auto" }} src={`http://localhost:8080\\image\\${book.img}`}></img>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
        

    );
};

export default UserPage;