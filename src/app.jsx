import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Cpm, Pert, Portada, Desicion } from './components/pages';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      {(location.pathname !== '/') && <Navbar />}
      <Routes>
        <Route path='/' element={<Portada />} />
        <Route path='/cpm' element={<Cpm />} />
        <Route path='/pert' element={<Pert />} />
        <Route path='/decision' element={<Desicion />} />
      </Routes>
    </div>
  );
}

export default App;
