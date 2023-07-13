import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';




import Login from './btl/Login';
import AdminPage from './btl/AdminPage';
import View from './btl/View';
import Home from './btl/Home';
import AddBook from './btl/AddBook';
import UserPage from './btl/UserPage';
import ViewUser from './btl/ViewUser';
import Bought from './btl/Bought';
import Register from './btl/Register';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/user" element={<UserPage></UserPage>} />
        <Route exact path="/admin" element={<AdminPage></AdminPage>} />
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/add" element={<AddBook/>} />
        <Route path="/bookU/:id" element={<ViewUser></ViewUser>}/>
        <Route path="/bought" element={<Bought></Bought>}/>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/book/:id" element={<View></View>}/>

       
      </Routes>
      
    </div>
  );
}

export default App;
