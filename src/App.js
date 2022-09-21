import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

console.log (process.env.REACT_APP_API_KEY)

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Main/>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;
