import React, { useState } from 'react';
import { useEffect } from 'react';
import {showmessage} from './showmessage'

export const Pert= () => {
  const [numeroActividades, setNumeroActividades] = useState(2);

  const [actividades, setActividades] = useState([]);
  const [mostrarInput, setMostrarInput] = useState(true);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [mostrarCanvas, setMostrarCanvas] = useState(false);
  const [graph, setGraph] = useState({
    nodes: [],
    links: [],
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const numActividades = parseInt(numeroActividades, 10);
    
    const actividadesNuevas = [];
    for (let i = 0; i < numActividades; i++) {
      const letra = String.fromCharCode(65 + i)
      actividadesNuevas.push({
        nombre: letra,
        predecesores: '',
        optimista: '',
        probable: '',
        pesimista: '',
      });
    }
    const refresh = {
      nodes: [],
      links: [],
    }
    setActividades(actividadesNuevas);
    setGraph(refresh)
    setMostrarInput(false);
    setMostrarTabla(true);
  };
  const handleEditClick = () => {
    setMostrarInput(true);
    setMostrarTabla(false);
    setMostrarCanvas(false);
  }
  const handleInputChange = (e, index, key) => {
    const newActividades = [...actividades];
    newActividades[index][key] = e.target.value;
    setActividades(newActividades);
  };

  const handleGraficarClick = () => {
    var cifra=0
    event.preventDefault()
    const validPredecesores = actividades.every((actividad) => {
      const predecesores = actividad.predecesores.trim();
    
      // Verifica si la cadena está vacía o tiene letras separadas por espacios
      return predecesores.length <= 1 || /^[A-Z]( [A-Z])*$/.test(predecesores);
    });
    
    if (!validPredecesores) {
      showmessage('El formato de los Predecesores es incorrecto. Debe ser una lista de letras separadas por espacios.');
      return;
    }
    const predecesoresVacios = actividades.some((actividad) => actividad.predecesores.trim() === '');
    if (predecesoresVacios) {
      showmessage('Los Predecesores no pueden estar en blanco o en su defecto colocar un "-" para indicar el Inicio. Debe ingresar Predecesores válidos.');
      return; 
    }

    
    let hasError = false;
    const validSpacePredecesores = actividades.every((actividad) => {
      const predecesores = actividad.predecesores;
      if (/^\s|\s$/.test(predecesores)) {
        hasError = true;
      }
      return true;
    });

    if (hasError) {
      showmessage('Los Predecesores no pueden contener espacios al inicio o al final.');
      return;
    }
    let haSactividad = false;
    const validACPredecesores = actividades.every((actividad) => {
      const predecesores = actividad.predecesores;
      if (predecesores.includes(actividad.nombre)) {
        haSactividad = true;
      }
      return true;
    });

    if (haSactividad) {
      showmessage('Los Predecesores no pueden incluir a la Actividad de su misma fila.')
      return
    }
    
    let haSactividadP = true;
    actividades.forEach(elemento=>{
      if(elemento.predecesores.length > 1){
        const pred = elemento.predecesores.split(' ')
        pred.forEach(predecesor=>{
          const buscar = actividades.find(busqueda=> busqueda.nombre == predecesor)
          if(!buscar){
            console.log(buscar)
            haSactividadP = false
          }
        })
      }else{
        if(elemento.predecesores!="-"){
          const buscar = actividades.find(busqueda=> busqueda.nombre == elemento.predecesores)
          if(!buscar){
            console.log(buscar)
            haSactividadP = false
          }
        }
      }
    })
    if (!haSactividadP) {
      showmessage('Ha inculido un Predecesor que no esta incluido en la lista de Actividades');
      return;
    }
    let haSactividadCoincidencia = true;
    actividades.forEach(elemento=>{
      if(elemento.predecesores.length > 1){
        const pred = elemento.predecesores.split(' ')
        const tieneDuplicados = pred.some((valor, indice) => pred.indexOf(valor) !== indice);
        if (tieneDuplicados) {
          console.log('Hay elementos duplicados en predecesores:', pred);
          haSactividadCoincidencia = false;
        }
      }
    })
    if (!haSactividadCoincidencia) {
      showmessage('No puede insertar una actividad mas de una vez como predecesor de una actividad');
      return;
    }
    const validValoresPe = actividades.every((actividad) => {
      const valorop = actividad.optimista.trim()
      const valorpr = actividad.probable.trim()
      const valorpe = actividad.pesimista.trim()
      if (!valorop || !valorpr || !valorpe) {
        return false;
      }
      return !isNaN(valorop)
    });
    if (!validValoresPe) {
      showmessage('La Duración de las Actividades debe ser un número válido y no puede estar en blanco.');
      return;
    }
    let positividad = true;
    actividades.forEach(number=>{
      if(number.optimista <=0 ||number.probable <=0 ||number.pesimista <=0 ){
        positividad=false
      }
    })
    if (!positividad) {
      showmessage('Los valores de tiempo no pueden ser menores o iguales a cero');
      return;
    }
    const nodes = actividades.map((actividad) => {
      const optimista = parseFloat(actividad.optimista);
      const probable = parseFloat(actividad.probable);
      const pesimista = parseFloat(actividad.pesimista);
        cifra=cifra+1
      return {
        number : cifra,
        name: actividad.nombre,
        optimista: optimista,
        probable: probable,
        pesimista: pesimista,
        valor: (optimista + 4 * probable + pesimista) / 6,
        last: actividad.predecesores,
        count: 0,
        IT: 0,
        FT: 0,
        TL: 0,
        IL: 0
      };
    });
    cifra=0

    setGraph({
      nodes,
      links: graph.links,
    });
    setMostrarCanvas(true);
  };
  useEffect(() => {
    GraficoPert(graph);
  
  }, [graph]);



  return (
    <>
      <div className='row m-0'>
        <div className='col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h2>Calculadora PERT</h2>
              <br></br>
              <h3>Instrucciones</h3>
              <p>
                •Los precedentes de cada actividad se deben ingresar en letras mayúsculas separados por espacios.
              </p>
              <p>
                •En la duración de la actividad se deben ingresar sólo valores positivos. Puedes ingresar decimales con punto.
              </p>
              <p>
                •Si desea indicar que una actividad contiene como predecesor el Inicio inserte "-".
              </p>
            </div>
          </div>
          {mostrarInput && (
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="numero">N° Actividades:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name='numero'
                  min={2}
                  value={numeroActividades}
                  placeholder='Max 10'
                  onChange={(e) => setNumeroActividades(e.target.value)}
                />
                <input type="submit" value="Crear" />
              </form>
            </div>
            <div className='recuadro m-3'>
              <p className="emphasized">Imagen Representativa</p>
              <div className='row m-0 d-flex justify-content-center'>
                <div className='col-lg-6 col-12 p-2'>
                  <img src='https://assets.asana.biz/transform/fce55983-714f-4329-8342-860f013fa157/inline-project-management-PERT-diagram-3-es-2x' className='img-fluid'></img>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
        
      </div>
      {mostrarTabla && (
      <div className='row m-0'>
        <div className='col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <input type="button" value="Editar" onClick={handleEditClick} />
            </div>
          </div>
          <div className='marco m-3'>
            <div className='card m-3 table-container'>
              <table className="m-0">
                <thead className='m-0'>
                  <tr>
                    <th scope="col">Actividades</th>
                    <th scope="col">Predecesores</th>
                    <th scope="col">Tiempo Optimista</th>
                    <th scope="col">Tiempo Probable</th>
                    <th scope="col">Tiempo Pesimista</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {actividades.map((actividad, index) => (
                    <tr scope="row m-0 p-0" key={index}>
                      <td className='m-0 col'>
                        <input
                          type="text"
                          value={actividad.nombre}
                          className='border-0'
                          readOnly="readonly"
                          onChange={(e) => handleInputChange(e, index, 'nombre')}
                        />
                      </td>
                      <td className='m-0 col'>
                        <input
                          type="text"
                          value={actividad.predecesores}
                          onChange={(e) => handleInputChange(e, index, 'predecesores')}
                        />
                      </td>
                      <td className='m-0 col'>
                        <input
                          type="number"
                          value={actividad.optimista}
                          onChange={(e) => handleInputChange(e, index, 'optimista')}
                        />
                      </td>
                      <td className='m-0 col'>
                        <input
                          type="number"
                          value={actividad.probable}
                          onChange={(e) => handleInputChange(e, index, 'probable')}
                        />
                      </td>
                      <td className='m-0 col'>
                        <input
                          type="number"
                          value={actividad.pesimista}
                          onChange={(e) => handleInputChange(e, index, 'pesimista')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='marco m-3'>
            <div className='m-3 d-flex justify-content-center'>
              <input className='strokes' type="submit" value="Resolver" onClick={handleGraficarClick} />
            </div>
          </div>
        </div>
      </div>
      )}
      {mostrarCanvas && (
      <div className='row m-0'>
        <div className='col-lg-5 col-12 p-4'>
          <div className='marco'>
            <div className='recuadro m-3'>
              <h3>Resultados</h3>
            </div>
            <div className='recuadro input-group p-3'>
              <span className="input-group-text">Ruta Crítica</span>
              <div className="form-floating">
                <textarea
                  type="text"
                  name='numero'
                  readOnly="readonly"
                  className='ruta form-control'
                  ></textarea>
              </div>
            </div>
            <div className='recuadro input-group p-3'>
            <span className="input-group-text">Tiempo Esperado</span>
              <div className="form-floating">
                <input
                  type="number"
                  name='numero'
                  readOnly="readonly"
                  className='valor form-control'
                />
              </div>
            </div>
            <div className='recuadro input-group p-3'>
              <span className="input-group-text">Varianza</span>
              <div className="form-floating">
                <input
                  type="number"
                  name='numero'
                  readOnly="readonly"
                  className='varianza form-control'
                />
              </div>
            </div>
          </div>
          <br></br>
          <div className='marco'>
            <div className='recuadro p-3'>
              <h3>Probabilidad</h3>
            </div>
            <div className='recuadro input-group p-3'>
              <form>
                <label htmlFor="numero">Tiempo:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name='numero'
                  min={0}
                  className='cantidad'
                />
                <input type="submit" value="Calcular" onClick={Probabilidad}/>
              </form>
              <div className='input-group mt-3'>
                <span className="input-group-text">Z</span>
                <div className="form-floating">
                  <input
                    type="number"
                    name='numero'
                    readOnly="readonly"
                    className='z-probabilidad form-control'
                  />
                </div>
              </div>
              <div className='input-group mt-3'>
              <span className="input-group-text">P(Z)</span>
              <div className="form-floating">
                <input
                  type="number"
                  name='numero'
                  readOnly="readonly"
                  className='probabilidad form-control'
                />
                </div>
              </div>
            </div>
          </div>     
        </div>
        <div className='col-lg-7 col-12 p-4'>
          <div className='row m-0 bg-custom'>
            <canvas id='pert' className='col-12 p-0' height='460'width='590'>
            </canvas>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

function GraficoPert(graph){

  enlazar(graph)
  let ruta = document.querySelector('.ruta')
  let valor = document.querySelector('.valor')
  let varianza = document.querySelector('.varianza')
  let sumav=0
  const { allPaths, longestPath, longestDuration } = findAllPaths(graph, 'Inicio', 'Fin');
  if (longestPath && longestDuration) {
    longestPath.forEach(elemento=>{
      let buscar = graph.nodes.find( node => node.name == elemento.target)
      let linea = graph.links.find( link => link.source == elemento.source && link.target == elemento.target && elemento.type!='ficticio')
      if(buscar && linea){
        sumav=sumav+((buscar.optimista-buscar.pesimista)*(buscar.optimista-buscar.pesimista))/36
      }
    })
    ruta.value=''
    let contador = 0
    allPaths.forEach(rutas=>{
      let bandera = true
      let numero=0
      rutas.forEach(elemento=>{
        const aux = graph.nodes.find(node => node.name == elemento.source)
        const recorrido = graph.nodes.find(node => node.name == elemento.target+'-1')
        const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
        if(recorrido && valink && aux && valink.duration!=0){
          console.log(numero+' + '+valink.duration+' = '+recorrido.IT)
          numero+=parseFloat(valink.duration)
          console.log(aux.IT+' + '+valink.duration+' = '+recorrido.IT)
          console.log(recorrido.TL+' = '+recorrido.IT)
          if((recorrido.TL-recorrido.IT<0.0000001 || recorrido.IT-recorrido.IL<0.0000001 || recorrido.IT==recorrido.TL) && (numero ==recorrido.IT)){
            console.log(' ENTRO ')
          }else{
            bandera = false
            console.log(' NO ENTRO ')
          }
        }
      })
      if(bandera){
        if(contador>0){
          ruta.value += '\n';
        }
        ruta.value += ' ['+(contador+1)+'] ';
        for (let i = 0; i < rutas.length - 1; i++) {
          if(rutas[i].duration==0){
            ruta.value += 'Fic';
          }else{
            ruta.value += rutas[i].target;
          }
          if(i!=rutas.length - 2){
            ruta.value += ' 🠖 ';
          }
        }
        contador++
      }
    })
    varianza.value = Math.sqrt(sumav).toFixed(7)
    valor.value = longestDuration
  }
  
  if (!graph || !Array.isArray(graph.nodes)) {
    console.error('Datos de gráfico no válidos');
    return;
  }
  const comprobar = document.querySelector('canvas')
  if (comprobar){
  var canvas_ = d3.select("#pert"),
  width = canvas_.attr("width"),
  height = canvas_.attr("height"),
  ctx = canvas_.node().getContext("2d"),
  r = 17,
  color = d3.scaleOrdinal(d3.schemeCategory20),
  simulation = d3.forceSimulation()
    .force("x", d3.forceX(width/2))
    .force("y", d3.forceY(height/2))
    .force("collide", d3.forceCollide(r+1))
    .force("charge", d3.forceManyBody().strength(-500))
    .on("tick",update)
    .force("link", d3.forceLink()
      .id(function (d) { return d.name; }));


 

  simulation.nodes(graph.nodes);
  simulation.force("link")
    .links(graph.links);
  

  canvas_
      .call(d3.drag()
          .container(canvas_.node())
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  function update() {
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = "#aaa";
    graph.links.forEach(drawLink);
    ctx.stroke();

    ctx.globalAlpha = 1.0;
    graph.nodes.forEach(drawNode);
  }

  function dragsubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }


function dragstarted() {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
  console.log(d3.event.subject);
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}



function drawNode(d) {
  ctx.beginPath();
  if(d.name == 'Inicio' || d.name == 'Fin'){
    ctx.fillStyle = "#0fa5eb";
  }else{
    if(d.count == 0){
      ctx.fillStyle = "#e28743";
    }else{
      ctx.fillStyle = "#0f172a";
    }
  }
  ctx.moveTo(d.x, d.y);
  ctx.arc(d.x, d.y, r, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  var textX = d.x;
  var textY = d.y;
  if(d.count==0){
    if(d.name == 'Inicio' || d.name == 'Fin'){
      ctx.fillText(d.name, textX, textY); 
      ctx.font = "12px Arial";
    }else{
      ctx.fillText(d.name, textX, textY); 
      ctx.font = "12px Arial";
    }
  }else{
    ctx.font = "9px Arial";
    ctx.fillText(d.TL.toFixed(2), textX-1, textY-8);
    ctx.fillText("━━━", textX, textY);
    ctx.fillText(d.IT.toFixed(2), textX-1, textY+8);
  }
}
function drawLink(l) {
  if(l.type=='info'){
    ctx.fillStyle = "#0f172a";
    ctx.stroke();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
  }else{
    if(l.type=='ficticio'){
      ctx.strokeStyle = "#0fa4ee";
    }else if(l.type=='continuo'){
      ctx.strokeStyle = "#909baf";
    }else if(l.type=='ruta'){
      ctx.strokeStyle = "#ff0000";
    }
    
    ctx.lineWidth = 2;

    var dx = l.target.x - l.source.x;
    var dy = l.target.y - l.source.y;
    var length = Math.sqrt(dx * dx + dy * dy);


    var arrowLength = 25;
    var offset = 5;
    var arrowX = l.target.x - (arrowLength / length) * dx + (offset / length) * dx;
    var arrowY = l.target.y - (arrowLength / length) * dy + (offset / length) * dy;

    // Dibuja el enlace
    ctx.beginPath();
    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(arrowX, arrowY);
    ctx.stroke();

    // Dibuja la punta de flecha
    ctx.save();
    if(l.type=='ficticio'){
      ctx.fillStyle = "#0fa4ee";
    }else if(l.type=='continuo'){
      ctx.fillStyle = "#909baf";
    }else if(l.type=='ruta'){
      ctx.fillStyle = "#ff0000";
    }
    ctx.translate(arrowX, arrowY);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.beginPath();
    ctx.moveTo(-5, -5); // Punto inferior izquierdo
    ctx.lineTo(5, -5); // Punto inferior derecho
    ctx.lineTo(0, 5); // Punto superior
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    }
  }
  }
}

function enlazar(graph){
  graph.links = []
  var nodo_aux=0
  var orden =[]
  graph.nodes.forEach(node=>{
    
    if(node.last.length > 1){
      var bandera=true
      let llegadas = node.last.split(' ')
      let valores = []
      llegadas.forEach(mayores=>{
        let buscamayor = graph.nodes.find(nodos => nodos.name == mayores)
        if(buscamayor){
          valores.push({mayor:buscamayor.valor,nodo:buscamayor.name})
          console.log(buscamayor.valor)
        }
      })
      let objetoMaximo = valores.reduce((max, obj) => (obj.mayor > max.mayor) ? obj : max, { mayor: -Infinity });
      console.log("El valor máximo es:", objetoMaximo.mayor);
      console.log("El nodo asociado al valor máximo es:", objetoMaximo.nodo);
      llegadas.forEach(termino=>{
        llegadas.forEach(rastro=>{
          const enlaceEncontrados = orden.find(link => link.llegada === termino && link.partida === rastro)
          if(enlaceEncontrados){
            bandera=false
          }
        })
      })
      if(bandera){
        let acumulador = []
        
        llegadas.forEach(buscamayor=>{
          let sumaIteracion = 0
          let mayor=true
          let auxllegada=buscamayor
          while(mayor){
            let encontrar = graph.nodes.find(node=> node.name==auxllegada)
            console.log("NO")
            console.log(encontrar)
            console.log(auxllegada)
            if(encontrar){
              auxllegada = encontrar.last
              sumaIteracion += parseFloat(encontrar.valor)
              if(auxllegada.length > 1 || auxllegada=='-'){
                mayor=false
                console.log("SI")
              }
            }
            else{
              mayor=false
            }
          }
          acumulador.push({mayor:sumaIteracion,nodo:buscamayor})
        })
        let objetoMaximo = acumulador.reduce((max, obj) => (obj.mayor > max.mayor ? obj : max), {
          mayor: -Infinity,
          nodo: null,
        });
        for(let object of acumulador){
          console.log(object.nodo+" : "+object.mayor)
        }
        let j = 0;
        for(let k=0;k<llegadas.length;k++) {
          const partidaEncontrados = orden.find(link => link.partida === llegadas[k])
          console.log('MAYOR: '+objetoMaximo.nodo)
          console.log(llegadas[k])
          console.log(llegadas.length)
          console.log(k+': '+objetoMaximo.nodo+' = '+llegadas[k])
          console.log(partidaEncontrados)
          if (partidaEncontrados || objetoMaximo.nodo!=llegadas[k]) {
            j = j + 1
            console.log(10)
          } else {
            k=llegadas.length
            console.log(20)
          }
        }
        for(let i=0;i<llegadas.length;i++){
          if(i!=j){
            var enlace={
              'partida': llegadas[i],
              'llegada': llegadas[j],
              'cantidad': 0,
              'tipo': 'ficticio'
            }
            orden.push(enlace)
          }else{
            var enlace={
              'partida': llegadas[j],
              'llegada': node.name,
              'cantidad': node.valor,
              'tipo': 'continuo'
            }
            orden.push(enlace)
          }
        }
      }if(!bandera){
        
        llegadas.forEach(termino=>{
          var suports={
            'partida': termino,
            'llegada': 'S-'+nodo_aux,
            'cantidad': '0',
            'tipo': 'ficticio'
          }
          orden.push(suports)
        })
        var enlace={
          'partida': 'S-'+nodo_aux,
          'llegada': node.name,
          'cantidad': node.valor,
          'tipo': 'continuo'
        }
        orden.push(enlace)
        nodo_aux=nodo_aux+1
      }
    }
    if(node.last.length == 1){
      if(node.last=='-'){
        var enlace={
          'partida': 'Inicio',
          'llegada': node.name,
          'cantidad': node.valor,
          'tipo': 'continuo'
        }
        orden.push(enlace)
      }else{
        var enlace={
          'partida': node.last,
          'llegada': node.name,
          'cantidad': node.valor,
          'tipo': 'continuo'
      }
        orden.push(enlace)
      }  
    }
  })
  graph.nodes.forEach(coincidencia=>{
    let flag=true
    graph.nodes.forEach(busqueda=>{
      if(busqueda.last.length > 1){
        let llegadas = busqueda.last.split(' ')
        llegadas.forEach(termino=>{
          if(coincidencia.name==termino){
            flag=false
          }
        })
        
      }else{
        if(coincidencia.name==busqueda.last){
          flag=false
        }
      }
    })
    if(flag){
      var enlace={
        'partida': coincidencia.name,
        'llegada': 'Fin',
        'cantidad': 0,
        'tipo': 'continuo'
      }
      orden.push(enlace)
    }
  })
  for(let j=0;j<nodo_aux;j++){
    var soporte = {
      "number":0,
      "name": 'S-'+j,
      "optimista": 0,
      "probable": 0,
      "pesimista": 0,
      "valor": 0,
      "last":"",
      "count": 0,
      "IT": 0,
      "FT": 0,
      "TL": 0,
      "IL": 0
    }
    graph.nodes.push(soporte)
  }
  
  
  var start = {
    "number":0,
    "name": "Inicio",
    "optimista": 0,
    "probable": 0,
    "pesimista": 0,
    "valor": 0,
    "last":"",
    "count": 0,
    "IT": 0,
    "FT": 0,
    "TL": 0,
    "IL": 0
  }
  var end = {
      "number":0,
      "name": "Fin",
      "optimista": 0,
      "probable": 0,
      "pesimista": 0,
      "valor": 0,
      "last":"",
      "count": 0,
      "IT": 0,
      "FT": 0,
      "TL": 0,
      "IL": 0
  }
  graph.nodes.push(start)
  graph.nodes.push(end)
  orden.forEach(enlace=>{
    var secuencia={
      'source': enlace.partida,
      'target': enlace.llegada,
      'duration': enlace.cantidad,
      'type': enlace.tipo
    }
    graph.links.push(secuencia)
  }) 
  const paths = []
  graph.nodes.forEach(sumandos=>{
    paths.push(sumandos.name)
  })
  paths.forEach(elemento=>{
    var info = {
      "number":0,
      "name": elemento+'-1',
      "valor": 0,
      "last":elemento,
      "count": 1,
      "IT": 0,
      "FT": 0,
      "TL": 0,
      "IL": 0
    }
    var secuencia={
      'source': elemento,
      'target': elemento+'-1',
      'duration': 0,
      'type': 'info'
    }
    graph.nodes.push(info)
    graph.links.push(secuencia)
  })
  const { allPaths, longestPath, longestDuration } = findAllPaths(graph, 'Inicio', 'Fin');

  if (longestPath,allPaths,longestDuration) {
    console.log(allPaths, longestPath, longestDuration)
    let records=0
    longestPath.forEach(elemento=>{
      const recorrido = graph.nodes.find(node => node.name == elemento.target)
      const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
      if(recorrido && valink){
        records=records+parseFloat(valink.duration)
        const buscando = graph.nodes.find(node => node.name == elemento.target+'-1')
        if (buscando) {
          buscando.IT=records+recorrido.IT
          buscando.TL=records+recorrido.TL
          console.log(valink.source+':-:'+valink.target)
          console.log('1: '+records+'++  '+recorrido.TL+' = '+recorrido.IT)
          console.log('1: '+buscando.TL+' = '+buscando.IT)
        }
      }
    })
    allPaths.forEach(rutas=>{
      let records=0
      rutas.forEach(elemento=>{
        const recorrido = graph.nodes.find(node => node.name == elemento.target)
        const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
        if(recorrido && valink){
          records=records+parseFloat(valink.duration)
          const buscando = graph.nodes.find(node => node.name == elemento.target+'-1')
          if (buscando) {
            if(buscando.IT > records){
              records=buscando.IT
            }else{
              buscando.IT=records+recorrido.IT
            }
            console.log(valink.source+':-:'+valink.target)
            console.log('2: '+records+'++  '+buscando.TL+' = '+buscando.IT)
            console.log('2: '+buscando.TL+' = '+buscando.IT)
          }
        }
      })
    })
    allPaths.forEach(rutas=>{
      let records=longestDuration
      for(let i=rutas.length-2;i>=0;i--){
        const recorrido = graph.nodes.find(node => node.name == rutas[i].source)
        const valink = graph.links.find(link => link.source == rutas[i+1].source && link.target == rutas[i+1].target)
        if(recorrido && valink){
          records=records-(valink.duration)
          const buscando = graph.nodes.find(node => node.name == rutas[i].target+'-1')
          if (buscando) {
            if(buscando.TL < records && buscando.TL!=0){
              records=buscando.TL
            }else{
              buscando.TL=records-recorrido.TL
            }
            console.log(valink.source+':-:'+valink.target)
            console.log('3: '+valink.duration+'--  '+buscando.TL+' = '+buscando.IT)
            console.log('3: '+buscando.TL+' = '+buscando.IT)
          }
        }
      }
    })
    longestPath.forEach(elemento=>{
      const recorrido = graph.nodes.find(node => node.name == elemento.target)
      if(recorrido){
        const buscando = graph.nodes.find(node => node.name == elemento.target+'-1')
        if (buscando) {
          recorrido.IT=buscando.IT
          recorrido.TL=buscando.TL
          console.log(recorrido.name)
          console.log('4: '+recorrido.TL+' = '+recorrido.IT)
          console.log('4: '+buscando.TL+' = '+buscando.IT)
        }
      }
    })
    allPaths.forEach(rutas=>{
      let numero =0
      rutas.forEach(elemento=>{
        const aux = graph.nodes.find(node => node.name == elemento.source)
        const recorrido = graph.nodes.find(node => node.name == elemento.target+'-1')
        const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
        if(recorrido && valink && aux && valink.duration!=0){
          console.log(numero+' + '+valink.duration+' = '+recorrido.IT)
          numero+=parseFloat(valink.duration)
          console.log(aux.IT+' + '+valink.duration+' = '+recorrido.IT)
          if((recorrido.TL-recorrido.IT<0.0000001 || recorrido.IT-recorrido.IL<0.0000001 || recorrido.IT==recorrido.TL) && (numero ==recorrido.IT)){
            valink.type='ruta'
            console.log('ENTER')
          }
        }
      })
    })
  }
}

function findAllPaths(graph, startNode, endNode) {
  const visitedNodes = new Set();
  const currentPath = [];
  const allPaths = [];
  let longestPath = null;
  let longestDuration = 0;

  function DFS(node) {
    visitedNodes.add(node);
  
    if (node === endNode) {
      const validLinks = currentPath.map((link) => ({ ...link }));
      // Calcula la duración total del recorrido actual
      const currentDuration = validLinks.reduce((sum, link) => sum + parseFloat(link.duration), 0);
  
      if (currentDuration > longestDuration) {
        longestPath = validLinks;
        longestDuration = currentDuration;
      }
      allPaths.push(validLinks);
    } else {
      const currentNode = graph.nodes.find((n) => n.name === node);
      const adjacentLinks = graph.links.filter((link) => link.source === node);
      for (const link of adjacentLinks) {
        if (!visitedNodes.has(link.target)) {
          currentPath.push(link);
          DFS(link.target);
          currentPath.pop(); 
        }
      }
    }
    visitedNodes.delete(node);
  }

  DFS(startNode);
  return { allPaths, longestPath, longestDuration };
}

function Probabilidad(){
  event.preventDefault()
  const valor = document.querySelector('.valor').value
  const varianza = document.querySelector('.varianza').value
  const cantidad = document.querySelector('.cantidad').value
  if(cantidad<=0){
    showmessage('Ingrese un tiempo mayor a cero')
    return
  }
  if(varianza==0){
    showmessage('No se puede hallar la probabilidad debido a que la varianza es cero')
    return
  }
  const z=(cantidad-valor)/varianza
  const zprobabilidad = document.querySelector('.z-probabilidad')
  zprobabilidad.value=z.toFixed(6)
  const probabilidad = document.querySelector('.probabilidad')
  probabilidad.value=cumulativeProbability(z).toFixed(6)

}
function cumulativeProbability(z) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}
function erf(x) {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p = 0.3275911;

  const sign = (x < 0) ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;

  return sign * (1 - y * Math.exp(-x * x));
}