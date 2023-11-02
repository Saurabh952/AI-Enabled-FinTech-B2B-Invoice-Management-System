import './App.css';
import Header from './home/header/header';
import Footer from './home/footer/footer';
import Data from './home/data-grid/data-grid';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
      <div>
        <Routes>
          <Route path="" element={
            <div>
              <Header />
              <Data />
              <Footer />
            </div>
          }></Route>
        </Routes>
      </div>
  );
}

export default App;
