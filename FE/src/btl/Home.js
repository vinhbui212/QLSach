import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/book')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <div> 
            <Link to="/login" className='btn btn-primary' style={{float:'right'}}>Login</Link>
            <div className="row">
                <h1 style={{ display: 'inline-block' }}>List Books</h1>
                
            </div>
           
           
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Page</th>
                        <th>Sold</th>
                        


                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.type}</td>
                            <td>{book.date}</td>
                            <td>{book.page}</td>
                            <td>{book.sold}</td>
                            


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;