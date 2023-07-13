
import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState('');
  const [img, setImg] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type', type);
    formData.append('date', date);
    formData.append('page', page);
    formData.append('img', img);
    const confirmed = window.confirm('Are you sure you want to add this book?');
    if (confirmed) {
      try {
        const response = await axios.post('http://localhost:8080/book', formData);
        console.log(response.data);
        setBookData(response.data);
        setShowSuccessAlert(true);
        setTitle('');
        setAuthor('');
        setType('');
        setDate('');
        setPage('');
        setImg(null);
        alert("Add Book Success")
      } catch (error) {
        console.error(error);
        alert('Duplicate book');
      }
    }
  }

  return (
    // <div className="centered-form">
    //   <div ><h1 className='header'>Book</h1></div>
    //   <form onSubmit={handleSubmit}>

    //     <div>
    //       <label>Title:</label>
    //       <input className='i_title' type="text" value={title} required onChange={e => setTitle(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Author:</label>
    //       <input type="text" value={author} required onChange={e => setAuthor(e.target.value)} />
    //     </div>
    //     <div>

    //       <label> Type:</label>
    //         <select value={type} onChange={e => setType(e.target.value)}>
    //             <option value="fiction">Fiction</option>
    //             <option value="non-fiction">Non-fiction</option>
    //             <option value="science-fiction">Science-fiction</option>
    //             <option value="manga">Manga</option>
    //             <option value="poem">Poem</option>
    //         </select>
    //     </div>
    //     <div>
    //       <label>Date:</label>
    //       <input type="date" value={date} required onChange={e => setDate(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Page:</label>
    //       <input type="number" value={page} required onChange={e => setPage(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Image:</label>
    //       <input className='in_image' type="file" required onChange={e => setImg(e.target.files[0])} />
    //       {img && (
    //         <img src={URL.createObjectURL(img)} style={{maxWidth:'200px'}} alt="Selected Image" />
    //       )}
    //     </div>
    //     <button type="submit">Add Book</button>
    //   </form>
    //   {showSuccessAlert && (
    //     <div className="alert alert-success" role="alert">
    //       Book added successfully!
    //     </div>
    //   )}
    // </div>
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Add Book</h1>
      </div>
      <div className='container'>
        <div className='rounded border p-3'>
          <div className='row'>
            <div className='col-8 '>
              <div className='d-flex mt-3'>
                <label>Title:{' '}</label>

                <input className='form-control ms-4' type="text" value={title} required onChange={e => setTitle(e.target.value)} />
              </div>

              <div className='d-flex mt-3'>
                <label>Author:{' '}</label>

                <input className='form-control ms-2' type="text" value={author} required onChange={e => setAuthor(e.target.value)} />
              </div>

              <div className='d-flex mt-3'>
                <label>Date:{' '}</label>

                <input className='form-control ms-4' type="date" value={date} required onChange={e => setDate(e.target.value)} />
              </div>

              <div className='d-flex mt-3'>
                <label> Type:{' '}</label>
                <select className='form-control ms-4' value={type} placeholder='Choose type' onChange={e => setType(e.target.value)} >
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-fiction</option>
                  <option value="science-fiction">Science-fiction</option>
                  <option value="manga">Manga</option>
                  <option value="poem">Poem</option>
                </select>
              </div>

              <div className='d-flex mt-3'>
                <label>Page:{' '}</label>

                <input className='form-control ms-4' type="number" value={page} required onChange={e => setPage(e.target.value)} />
              </div>
            </div>

            <div className='d-flex mt-3'>
              <label>Image:</label>
              <input className='ms-3' type="file" required onChange={e => setImg(e.target.files[0])} />

            </div>
            <div className='col-4'>
              <div className='mt-3'>
                {img && (
                  <img src={URL.createObjectURL(img)} style={{ maxWidth: '200px' }} alt="Selected Image" />
                )}
              </div>
                <button className='btn btn-success ms-3 mt-3 ' onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;