import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Bought = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBook();
    }, [])

    const fetchBook = (() => {
        axios.get('http://localhost:8080/bought')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    })

    const deleteBook=(title)=>{
        const confirmed = window.confirm('Are you sure you want to cancel this book?');
       
       if(confirmed){ axios.delete(`http://localhost:8080/bought/${title}`)
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
        <div>
           <Header></Header>
           <div className='mt-3'>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Book Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
            <tbody>
                {books.map(book =>(
                    <tr key={book.title} >
                        <td><img style={{width:200, height:200 }} src={book.imgUrl}/></td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.quantity}</td>
                        <td>
                                            
                         <Link style={{ marginLeft: 10 }} className='btn btn-danger' onClick={()=>deleteBook(book.title)}>Cancel</Link>
                        </td>

                    </tr>
                ))}
            </tbody>
            
            </table>
            </div>
        </div>

    );
};

export default Bought;