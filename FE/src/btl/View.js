
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// const View = () => {
//     const params = useParams();
//     const [book, setBook] = useState({
//         title: '',
//         author: '',
//         type: '',
//         date: '',
//         page: '',
//     });
//     const [imgUrl, setImgUrl] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const id = params.id;
//     const [isEditing, setIsEditing] = useState(false);

//     const onSaveClick = () => {
//         fetch(`http://localhost:8080/book/${id}`, {
//             method: 'PUT',
//             mode: 'cors',
//             body: JSON.stringify(book),
//             headers: {
//                 'Content-Type': 'application/json; charset=ISO-8859-1',
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 setSuccessMessage('Update successful!');
//             })
//             .catch((err) => console.log(err));
//     };


//     useEffect(() => {
//         fetch(`http://localhost:8080/book/${id}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setBook(data);
//                 setImgUrl(data.imgUrl);
//             })
//             .catch((err) => console.log(err));
//     }, [id]);

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };


//     const inputStyle = { backgroundColor: isEditing ? 'white' : 'lightgrey', readOnly: !isEditing };

//     return (
//         // <div style={{ textAlign: 'center' }}>
//         //     <h1 className='header1'>{id < 0 ? 'New Book' : `Book ${id}`}</h1>

//         //     <br />
//         //     <label> Title:{' '}</label>
//         //     <input
//         //         type="text"
//         //         value={book.title}
//         //         style={inputStyle}
//         //         onChange={(e) => setBook({ ...book, title: e.target.value })}
//         //     />
//         //     <br />
//         //     <label>  Author:{' '}</label>
//         //     <input
//         //         type="text"
//         //         value={book.author}
//         //         style={inputStyle}
//         //         onChange={(e) => setBook({ ...book, author: e.target.value })}
//         //     />
//         //     <br />
//         //     <label> Type:{' '}</label>
//         //     <select value={book.type} onChange={(e) => setBook({ ...book, type: e.target.value })}>
//         //         <option value="fiction">Fiction</option>
//         //         <option value="non-fiction">Non-fiction</option>
//         //         <option value="science-fiction">Science-fiction</option>
//         //         <option value="manga">Manga</option>
//         //         <option value="poem">Poem</option>
//         //     </select>
//         //     <br />
//         //     <label> Date:{' '}</label>
//         //     <input
//         //         type="date"
//         //         value={book.date}
//         //         style={inputStyle}
//         //         onChange={(e) => setBook({ ...book, date: e.target.value })}
//         //     />
//         //     <br />
//         //     <label> Page:{' '}</label>
//         //     <input
//         //         type="number"
//         //         value={book.page}
//         //         style={inputStyle}
//         //         onChange={(e) => setBook({ ...book, page: e.target.value })}
//         //     />
//         //     <br />

//         //     {imgUrl && (
//         //         <>
//         //             Image: <img src={imgUrl} alt="book cover" width="200px" height="auto" />
//         //         </>
//         //     )}


//         //     <br />
//         //     {!isEditing && <button onClick={handleEditClick}>Edit</button>}

//         //     {isEditing && (
//         //         <>
//         //             <button onClick={onSaveClick}>Save</button>
//         //             <button onClick={() => setIsEditing(false)}>Cancel</button>
//         //         </>
//         //     )}
//         // </div>
//         <div>
//             <div>
//                 <h1 style={{ textAlign: 'center' }}>{`Book ${id}`}</h1>
//             </div>
//             <div className='container'>
//                 <div className='rounded border p-3'>
//                     <div className='row'>
//                         <div className='col-8 '>
//                             <div className='d-flex mt-3'>
//                                 <label>Title:{' '}</label>
//                                 <input
//                                     className='form-control ms-4'
//                                     type="text"
//                                     value={book.title}
//                                     style={inputStyle}
//                                     onChange={(e) => setBook({ ...book, title: e.target.value })}
//                                 />
//                             </div>

//                             <div className='d-flex mt-3'>
//                                 <label>Author:{' '}</label>
//                                 <input
//                                     className='form-control ms-2'
//                                     type="text"
//                                     value={book.author}
//                                     style={inputStyle}
//                                     onChange={(e) => setBook({ ...book, author: e.target.value })}
//                                 />
//                             </div>

//                             <div className='d-flex mt-3'>
//                                 <label> Type:{' '}</label>
//                                 <select className='form-control ms-4' value={book.type} onChange={(e) => setBook({ ...book, type: e.target.value })} disabled={!isEditing}>
//                                     <option value="fiction">Fiction</option>
//                                     <option value="non-fiction">Non-fiction</option>
//                                     <option value="science-fiction">Science-fiction</option>
//                                     <option value="manga">Manga</option>
//                                     <option value="poem">Poem</option>
//                                 </select>
//                             </div>
//                             <div className='d-flex mt-3'>
//                                 <label>Release:{' '}</label>
//                                 <input
//                                     className='form-control ms-1'
//                                     type="date"
//                                     value={book.date}
//                                     style={inputStyle}
//                                     onChange={(e) => setBook({ ...book, date: e.target.value })}
//                                     readOnly={!isEditing}
//                                 />
//                             </div>

//                             <div className='d-flex mt-3'>
//                                 <label>Page:{' '}</label>
//                                 <input
//                                     className='form-control ms-4'
//                                     type="text"
//                                     value={book.page}
//                                     style={inputStyle}
//                                     onChange={(e) => setBook({ ...book, page: e.target.value })}
//                                 />
//                             </div>
//                             <div className='d-flex justify-content-center mt-3'>
//                             {!isEditing && <button className='btn btn-info  ' onClick={handleEditClick}>Edit</button>}

//                             {isEditing && (
//                                 <>
//                                     <button className='btn btn-success me-2' onClick={onSaveClick}>Save</button>
//                                     <button className='btn btn-danger' onClick={() => setIsEditing(false)}>Cancel</button>
//                                 </>
//                             )}
//                             </div>
//                         </div>
//                         <div className='col-4'>
//                             <img src={imgUrl} alt="book cover" width="70%" height="auto" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {successMessage && (
//                 <div className="alert alert-success mt-3" role="alert">
//                     {successMessage}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default View;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const View = () => {
    const params = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        type: '',
        date: '',
        page: '',
    });
    const [imgUrl, setImgUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const id = params.id;
    const [isEditing, setIsEditing] = useState(false);

    const onSaveClick = () => {
        fetch(`http://localhost:8080/book/${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json; charset=ISO-8859-1',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage('Update successful!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000); 
            })
            .catch((err) => console.log(err));
            
    };


    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                setImgUrl(data.imgUrl);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
    };


    const inputStyle = { backgroundColor: isEditing ? 'white' : 'lightgrey', readOnly: !isEditing };

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>{`Book ${id}`}</h1>
            </div>
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
                                    style={inputStyle}
                                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                                />
                            </div>

                            <div className='d-flex mt-3'>
                                <label>Author:{' '}</label>
                                <input
                                    className='form-control ms-2'
                                    type="text"
                                    value={book.author}
                                    style={inputStyle}
                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                />
                            </div>

                            <div className='d-flex mt-3'>
                                <label> Type:{' '}</label>
                                <select className='form-control ms-4' value={book.type} onChange={(e) => setBook({ ...book, type: e.target.value })} disabled={!isEditing}>
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
                                    style={inputStyle}
                                    onChange={(e) => setBook({ ...book, date: e.target.value })}
                                    readOnly={!isEditing}
                                />
                            </div>

                            <div className='d-flex mt-3'>
                                <label>Page:{' '}</label>
                                <input
                                    className='form-control ms-4'
                                    type="text"
                                    value={book.page}
                                    style={inputStyle}
                                    onChange={(e) => setBook({ ...book, page: e.target.value })}
                                />
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                {!isEditing && <button className='btn btn-info' onClick={handleEditClick}>Edit</button>}

                                {isEditing && (
                                    <>
                                        <button className='btn btn-success me-2' onClick={onSaveClick}>Save</button>
                                        <button className='btn btn-danger' onClick={() => setIsEditing(false)}>Cancel</button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='col-4'>
                            <img src={imgUrl} alt="book cover" width="70%" height="auto" />
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="alert alert-success mt-3" role="alert" style={{ textAlign: 'center' }}>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default View;
