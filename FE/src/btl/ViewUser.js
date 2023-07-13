import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router';

const ViewUser = () => {
    const params = useParams();
    const [book, setBook] = useState({

        idb: '',
        title: '',
        author: '',
        type: '',
        date: '',
        page: '',
        sold: '',

    })
    const [imgUrl, setImgUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const id = params.id;
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [star, setStar] = useState(1);
    const [comments, setComments] = useState([]);




    useEffect(() => {
        fetchComment();
    }, [])

    const fetchComment = (() => {
        axios.get('http://localhost:8080/comment')
            .then(res => {
                setComments(res.data);
            })
            .catch(err => console.log(err));
    })



    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);

                setImgUrl(data.imgUrl);
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleBuy() {
        axios.post('http://localhost:8080/bought', { ...book, quantity })
            .then(response => {
                console.log(response.data);

                alert('Book bought added successfully!');
                setQuantity('');
                const { id } = book;
                axios.put(`http://localhost:8080/book/${id}`, {
                    ...book,
                    sold: book.sold + parseInt(quantity),

                })
            })
            .catch(error => {
                console.error(error);
                alert('You have bought in cart');
            });


    }
    function handleComment() {
        axios.post('http://localhost:8080/comment', { user, comment, star })
            .then(response => {
                console.log(response.data);
                alert('Comment added successfully!');
                fetchComment();
            })
            .catch(error => {
                console.error(error);
                alert('One user must rate once');
            });

    }


    return (
        // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        //     <h1>{id < 0 ? "New Book" : `Book ${id}`

        //     }</h1>
        // <div >
        //     <br />
        //     Title:{" "}
        //     <input

        //         type='text '
        //         value={book.title}
        //         readOnly
        //         style={{ backgroundColor: 'lightgrey' }}
        //         onChange={(e) => setBook({ ...book, title: e.target.value })}
        //     />
        //     <br />
        //     Author:{" "}
        //     <input
        //         type='text'
        //         value={book.author}
        //         onChange={(e) => setBook({ ...book, author: e.target.value })}
        //         readOnly
        //         style={{ backgroundColor: 'lightgrey' }}
        //     />
        //     <br />
        //     Type:{" "}
        //     <select disabled
        //         value={book.type}
        //         onChange={(e) => setBook({ ...book, type: e.target.value })}

        //     >
        //         <option value="fiction">Fiction</option>
        //         <option value="non-fiction">Non-fiction</option>
        //         <option value="science-fiction">Science-fiction</option>
        //         <option value="manga">Manga</option>
        //         <option value="poem">Poem</option>


        //     </select>

        //     <br />

        //     Date:{" "}
        //     <input
        //         type='date'
        //         value={book.date}
        //         onChange={(e) => setBook({ ...book, type: e.target.value })}
        //         readOnly
        //         style={{ backgroundColor: 'lightgrey' }}

        //     />
        //     <br />
        //     Page:{" "}
        //     <input readOnly
        //         type='number'
        //         value={book.page}

        //         onChange={(e) => setBook({ ...book, page: e.target.value })}
        //     />
        //     <br />

        //     {imgUrl && (
        //         <>
        //             Image:{' '}
        //             <img src={imgUrl} alt="book cover" width="200px" height="auto" />
        //         </>
        //     )}
        //     <br></br>

        //     <label htmlFor="quantity">Quantity:</label>{' '}
        //     <input
        //         id="quantity"
        //         type="number"
        //         value={quantity}
        //         required
        //         onChange={(e) => setQuantity(e.target.value)}
        //     />

        //     <button onClick={() => handleBuy()}>Mua</button>
        //     </div>
        //     <br />
        //     <div>
        //     <h1 style={{textAlign:'center'}}>Rate</h1>
        //     <br/>
        //     <label htmlFor="user">User:</label> {' '}
        //     <input id="user" value={user} required onChange={(e) => setUser(e.target.value)} />
        //     <br/>
        //     <label htmlFor="comment">Comment:</label> {' '}
        //     <input id="comment" value={comment} required onChange={(e) => setComment(e.target.value)} />
        //     <br />
        //     <label htmlFor="star">Star:</label> {' '}
        //     <input type="number" id="star" min="1" max="5" value={star} required onChange={(e) => setStar(e.target.value)} />

        //         <button onClick={handleComment}>Comment</button>
        //         </div>
        //     {/* bảng comment */}
        //         <table className="table table-striped table-bordered">
        //         <thead className="table-dark">
        //             <tr>
        //                 <th>User</th>
        //                 <th>Comment</th>
        //                 <th>Star</th>

        //             </tr>
        //         </thead>
        //     <tbody>
        //         {comments.map(comment =>(
        //             <tr key={comment.id}>
        //                 <td>{comment.user}</td>
        //                 <td>{comment.comment}</td>
        //                 <td>{comment.star}</td>

        //             </tr>
        //         ))}
        //     </tbody>

        //     </table>
        // </div>

        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>{`Book ${id}`}</h1>
            </div>
            <div>
                <div className='container'>
                    <div className='rounded border p-3'>
                        <div className='row'>
                            <div className='col-8 '>
                                <div className='d-flex mt-3'>
                                    <label>Title:{' '}</label>
                                    <input
                                        className='form-control ms-4'
                                        type="text"
                                        value={book.title}
                                        disabled
                                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                                    />
                                </div>

                                <div className='d-flex mt-3'>
                                    <label>Author:{' '}</label>
                                    <input
                                        className='form-control ms-2'
                                        type="text"
                                        value={book.author}
                                        disabled
                                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                                    />
                                </div>

                                <div className='d-flex mt-3'>
                                    <label> Type:{' '}</label>
                                    <select className='form-control ms-4' value={book.type} onChange={(e) => setBook({ ...book, type: e.target.value })} disabled >
                                        <option value="fiction">Fiction</option>
                                        <option value="non-fiction">Non-fiction</option>
                                        <option value="science-fiction">Science-fiction</option>
                                        <option value="manga">Manga</option>
                                        <option value="poem">Poem</option>
                                    </select>
                                </div>
                                <div className='d-flex mt-3'>
                                    <label>Release:{' '}</label>
                                    <input
                                        className='form-control ms-1'
                                        type="date"
                                        value={book.date}
                                        disabled
                                        onChange={(e) => setBook({ ...book, date: e.target.value })}

                                    />
                                </div>

                                <div className='d-flex mt-3'>
                                    <label>Page:{' '}</label>
                                    <input
                                        className='form-control ms-4'
                                        type="text"
                                        value={book.page}
                                        disabled
                                        onChange={(e) => setBook({ ...book, page: e.target.value })}
                                    />
                                </div>

                                <div className='mt-5 d-flex justify-content-center'>
                                    <label htmlFor="quantity">Quantity : </label>{' '}
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        required
                                        placeholder="Choose quantity"

                                        onChange={(e) => setQuantity(e.target.value)}
                                    />

                                    <button className='btn btn-info ms-3' onClick={() => handleBuy()}>Mua</button>
                                </div>

                            </div>
                            <div className='col-4'>
                                <img src={imgUrl} alt="book cover" width="70%" height="auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment container */}
            <div className='mt-3' >
                <div>
                    <h1 style={{ textAlign: "center" }}>Comment</h1>
                </div>
                <div className='container'>
                    <div className='rounded border p-3'>
                        <div className='row'>
                            <div className='col-md-4 '>
                                <label htmlFor="user">User:</label> {' '}
                                <input className='ms-5 mt-3' id="user" value={user} required onChange={(e) => setUser(e.target.value)} />
                                <br />
                                <label htmlFor="comment">Comment:</label> {' '}
                                <input id="comment" className='ms-2 mt-3' value={comment} required onChange={(e) => setComment(e.target.value)} />
                                <br />
                                {/* <label htmlFor="star">Star:</label> {' '}
                                <input type="number" id="star" className='ms-5 mt-3' min="1" max="5" value={star} required onChange={(e) => setStar(e.target.value)} /> */}
                                <label htmlFor="star">Star:</label> {' '}
                                <div className="star-rating">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={index < star ? "star-filled" : "star-empty"}
                                            onClick={() => setStar(index + 1)}
                                        />
                                    ))}
                                </div>
                                <button onClick={handleComment}>Comment</button>
                            </div>
                            <div className='col-md-8'>
                                <table className="table table-striped table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>User</th>
                                            <th>Comment</th>
                                            <th>Star</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comments.map(comment => (
                                            <tr key={comment.id}>
                                                <td>{comment.user}</td>
                                                <td>{comment.comment}</td>
                                                <td>{comment.star}</td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewUser;