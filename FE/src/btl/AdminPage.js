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
const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetchBook();
    }, [])

    useEffect(() => {
        filterBooks();
    }, [books, searchQuery]);

    const fetchBook = (() => {
        axios.get('http://localhost:8080/book')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    });

    const filterBooks = () => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const deleteBook = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            axios.delete(`http://localhost:8080/book/${id}`)
                .then(response => {
                    console.log(response.data);
                    fetchBook();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        // <div>

        //     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        //         <a class="navbar-brand" href="/">List Book</a>

        //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul class="navbar-nav mr-auto">
        //                 <li class="nav-item active">
        //                     <a class="nav-link" href="/bought">Cart <span class="sr-only"></span></a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/login">Logout</a>
        //                 </li>

        //             </ul>
        //         </div>
        //     </nav>
        //     <Link style={{ padding: 5, margin: 5 }} className='btn btn-success' to={"/add"}>Add Book</Link>

        //     <table className="table table-striped table-bordered">
        //         <thead className="table-dark">
        //             <tr>
        //                 <th>ID</th>
        //                 <th>Title</th>
        //                 <th>Author</th>
        //                 <th>Type</th>
        //                 <th>Date</th>
        //                 <th>Page</th>
        //                 <th>Sold</th>
        //                 <th>Action</th>


        //             </tr>
        //         </thead>
        //         <tbody>
        //             {books.map(book => (
        //                 <tr key={book.id}>
        //                     <td>{book.id}</td>
        //                     <td>{book.title}</td>
        //                     <td>{book.author}</td>
        //                     <td>{book.type}</td>
        //                     <td>{book.date}</td>
        //                     <td>{book.page}</td>
        //                     <td>{book.sold}</td>
        //                     <td>
        //                         <Link className='btn btn-info' to={`/book/${book.id}`}>View</Link>





        //                         <Link style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => deleteBook(book.id)}>Delete</Link>
        //                     </td>


        //                 </tr>
        //             ))}
        //         </tbody>
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

            <div >
                <div className='container'>
                    <Link className='btn btn-success mt-3' to={"/add"}>Add Book</Link>
                    <div className='row align-items-start '>

                        {filteredBooks.map(book => (

                            <div className='col-md-4 mt-3 ' key={book.id}>
                                <div className='rounded border p-3'>
                                    <div className='row'>
                                        <div className='col'>
                                            <a style={{ textDecoration: "none" ,color:"black" }} href={`/book/${book.id}`}>
                                                <p className='fs-2 fst-italic'>{book.title}</p>
                                            </a>

                                            <p className=' fst-italic'>Author: {book.author}</p>
                                            <p className=' fst-italic'>Type: {book.type}</p>
                                            <p className=' fst-italic'>Release: {book.date}</p>
                                            <p className=' fst-italic'>Page: {book.page}</p>
                                            <p className=' fst-italic'>Sold: {book.sold}</p>
                                            <Link className='btn btn-danger' onClick={() => deleteBook(book.id)}>Delete</Link>
                                        </div>
                                        <div className='col  d-flex align-items-center justify-content-center'>
                                            <div className='vertical-line'></div>
                                            <img style={{ maxWidth: '100%' }} src={`http://localhost:8080\\image\\${book.img}`}></img>
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
}

export default BookList;