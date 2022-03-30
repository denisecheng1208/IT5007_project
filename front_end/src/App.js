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

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/edit" element={<ContextEditor/>} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/signUp" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/displayBlog" element={<ContextsDisplayerWrapper />} />
        <Route path="/account" element={<AccountInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
