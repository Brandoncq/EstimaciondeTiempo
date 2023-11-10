import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Cpm, Pert, Portada, Desicion } from './components/pages';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      {(location.pathname !== '/EstimaciondeTiempo' && location.pathname !== '/EstimaciondeTiempo/') && <Navbar />}
      <Routes>
        <Route path='/EstimaciondeTiempo' element={<Portada />} />
        <Route path='/EstimaciondeTiempo/cpm' element={<Cpm />} />
        <Route path='/EstimaciondeTiempo/pert' element={<Pert />} />
        <Route path='/EstimaciondeTiempo/decision' element={<Desicion />} />
      </Routes>
    </div>
  );
}

export default App;
