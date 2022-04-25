import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import ContextEditor from './components/ContextEditor/ContextEditor.js';
import ContextsDisplayerWrapper from './components/ContextDisplayerWrapper/ContextDisplayerWrapper';
import Login from './components/Login/Login.js'
import Signup from './components/Signup/Signup.js'
import WelcomePage from './components/WelcomePage/WelcomePage.js'
import { Routes, Route } from "react-router-dom";
import AccountInfo from './components/AccountInfo/AccountInfo';
import NewBlog from './components/NewBlog/NewBlog';
import cookie from 'react-cookies'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/edit" element={cookie.load("username") == null? <Login/> : <ContextEditor/>} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/signUp" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/displayBlog" element={cookie.load("username") == null? <Login/> : <ContextsDisplayerWrapper />} />
        <Route path="/account" element={cookie.load("username") == null? <Login/> : <AccountInfo />} />
        <Route path="/newBlog" element={cookie.load("username") == null? <Login/> : <NewBlog />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
