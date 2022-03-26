import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import ContextEditor from './components/ContextEditor/ContextEditor.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <ContextEditor/>
      <Footer/>
    </div>
  );
}

export default App;
