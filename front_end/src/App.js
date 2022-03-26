import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import ContextEditor from './components/ContextEditor/ContextEditor.js';
import ContextsDisplayerWrapper from './components/ContextDisplayerWrapper/ContextDisplayerWrapper';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <ContextEditor/> */}
      <ContextsDisplayerWrapper/>
      <Footer/>
    </div>
  );
}

export default App;
