import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Cpm, Pert, Portada, Desicion,Test,Testscroll } from './components/pages';


function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/') {
      if(!document.body.classList.contains('hide-scrollbar')){
        document.body.classList.add('hide-scrollbar')
      }
    } else {
      if(document.body.classList.contains('hide-scrollbar')){
        document.body.classList.remove('hide-scrollbar')
      }
    }
  }, [location.pathname]);
  return (
    <div className='App'>
      {(location.pathname !== '/') && <Navbar />}
      <Routes>
        <Route path='/' element={<Portada />} />
        <Route path='/cpm' element={<Cpm />} />
        <Route path='/pert' element={<Pert />} />
        <Route path='/modelo-inventario' element={<Test url="https://dcromero1.github.io/modelo-de-inventario"/>} />
        <Route path='/teoria-decisiones-certidumbre' element={<Testscroll url="https://atunn25.github.io/TeoriaDeDecisiones/" />} />
        <Route path='/teoria-decisiones-incertidumbre' element={<Testscroll url="https://luismanihuarit.github.io/IO/"/>} />
        <Route path='/arbol-decisiones' element={<Testscroll url="https://s1lver0.github.io/decision-tree-operations-research/"/>} />
        <Route path='/teoria-colas' element={<Test url="https://dcromero1.github.io/Teoria-de-colas/"/>} />
        <Route path='/simulacion-montecarlo' element={<Testscroll url="https://s1lver0.github.io/Modelo-de-Montecarlo/"/>} />
        <Route path='/programacion-cuadratica' element={<Testscroll url="https://brandoncq.github.io/ProgramacionCuadratica/"/>} />
        <Route path='/teoriadedecision' element={<Desicion />} />
      </Routes>
    </div>
  );
}
export default App;
