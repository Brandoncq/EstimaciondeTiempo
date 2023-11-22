import React, { useState } from 'react';
import { useEffect } from 'react';
import {showmessage} from './showmessage'

export const Cpm = () => {
  const [numeroActividades, setNumeroActividades] = useState(2);
  const [mostrarInput, setMostrarInput] = useState(true);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [mostrarCanvas, setMostrarCanvas] = useState(false);
  const [actividades, setActividades] = useState([]);
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
        duracion: '',
      });
    }
    const refresh = {
      nodes: [],
      links: [],
    }
    setActividades(actividadesNuevas)
    setGraph(refresh)
    setMostrarInput(false);
    setMostrarTabla(true);
  };

  const handleInputChange = (e, index, key) => {
    const newActividades = [...actividades];
    newActividades[index][key] = e.target.value;
    setActividades(newActividades);
  };
  const handleEditClick = () => {
    setMostrarInput(true);
    setMostrarTabla(false);
    setMostrarCanvas(false);
  }
  const handleGraficarClick = () => {
    var cifra=0
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
      showmessage('Los Predecesores no pueden estar en blanco o en su defecto colocar un "-" para indicar el Inicio. Debe ingresar predecesores válidos.');
      return; 
    }
    const validValores = actividades.every((actividad) => {
      const valor = actividad.duracion.trim()
      if (!valor) {
        return false;
      }
      return !isNaN(valor)
    });
    if (!validValores) {
      showmessage('La Duración de las actividades debe ser un número válido y no puede estar en blanco.');
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
      showmessage('Los Predecesores no pueden incluir a la Actividad de su misma fila.');
      return;
    }
    let positividad = true;
    actividades.forEach(number=>{
      if(number.duracion <=0){
        positividad=false
      }
    })
    if (!positividad) {
      showmessage('Los valores de tiempo no pueden ser menores o iguales a cero');
      return;
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
    const nodes = actividades.map((actividad) => {
        cifra=cifra+1
      return {
        number : cifra,
        name: actividad.nombre,
        valor: actividad.duracion,
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
    GraficoCPM(graph);
  }, [graph]);



  return (
    <>
      <div className='row m-0'>
        <div className='col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h2>CPM (Critical Path Method)</h2>
              <br></br>
              <p>
                El método CPM o Ruta Crítica (equivalente a la sigla en inglés Critical Path Method) es
                frecuentemente utilizado en el desarrollo y control de proyectos. El objetivo principal es
                determinar la duración de un proyecto, entendiendo éste como una secuencia de actividades
                relacionadas entre sí, donde cada una de las actividades tiene una duración estimada.
              </p>
              <p>
                En este sentido el principal supuesto de CPM es que las actividades y sus tiempos de duración
                son conocidos, es decir, no existe incertidumbre. Este supuesto simplificador hace que esta
                metodología sea fácil de utilizar y en la medida que se quiera ver el impacto de la incertidumbre
                en la duración de un proyecto, se puede utilizar un método complementario como lo es PERT.
              </p>
              <p>
                Una ruta es una trayectoria desde el inicio hasta el final de un proyecto. En este sentido, la
                longitud de la ruta crítica es igual a la la trayectoria más grande del proyecto. Cabe destacar que
                la duración de un proyecto es igual a la ruta crítica
              </p>
            </div>
          </div>
        </div>
        <div className='col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h2>Calculadora CPM</h2>
              <br></br>
              <h3>Instrucciones</h3>
              <p>
                •Los precedentes de cada actividad se deben ingresar en letras mayúsculas separados por espacios.
              </p>
              <p>
                •En la duración de la actividad se deben ingresar sólo valores positivos. Puedes ingresar decimales con punto.
              </p>
            </div>
          </div>
          {mostrarInput && (
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="numero">Ingresar N° Actividades:&nbsp;&nbsp;</label>
                <input
                  type="number"
                  name='numero'
                  min={2}
                  value={numeroActividades}
                  onChange={(e) => setNumeroActividades(e.target.value)}
                />
                <input type="submit" value="Crear" />
              </form>
            </div>
            <div className='recuadro m-3'>
              <p className="emphasized">Imagen Representativa</p>
              <div className='row m-0 d-flex justify-content-center'>
                <div className='col-lg-8 col-12 p-2'>
                  <img src='https://diagramaweb.com/wp-content/uploads/2020/10/diagrama-de-flechas-pasos-1.png' className='img-fluid'></img>
                </div>
              </div>
            </div>
          </div>
          )}
          </div>
        </div>
      <div className='row m-0'>
        {mostrarTabla && (
        <div className='col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <input type="button" value="Editar" onClick={handleEditClick} />
            </div>
          </div>
          <div className='marco m-3'>
            <div className='card m-3'>
              <table className="m-0">
                <thead className='m-0'>
                  <tr>
                    <th scope="col">Actividades</th>
                    <th scope="col">Predecesores</th>
                    <th scope="col">Tiempo</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {actividades.map((actividad, index) => (
                    <tr scope="row m-0 p-0" key={index}>
                      <td className='m-0 col'>
                        <input
                          type="text"  
                          readOnly="readonly"
                          className='border-0'
                          value={actividad.nombre}
                          onChange={(e) => handleInputChange(e, index, 'predecesores')}
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
                          value={actividad.duracion}
                          onChange={(e) => handleInputChange(e, index, 'duracion')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='marco m-3'>
            <div className='m-3'>
              <input type="button" value="Resolver" onClick={handleGraficarClick} />
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
                    className='c-ruta form-control'
                  ></textarea>
                </div>
              </div>
              <div className='recuadro input-group p-3'>
                <span className="input-group-text">Tiempo</span>
                <div className="form-floating">
                  <input
                    type="text"
                    name='numero'
                    readOnly="readonly"
                    className='c-valor form-control'
                  />
                </div> 
              </div> 
            </div>   
          </div>
          <div className='col-lg-7 col-12 p-4'>
            <div className='row m-0 bg-custom'>
              <canvas id='network' className='col-12 p-0' height='460'width='590'>
              </canvas>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

function GraficoCPM(graph){

  enlazar(graph)
  let ruta = document.querySelector('.c-ruta')
  let valor = document.querySelector('.c-valor') 
  const { allPaths, longestPath, longestDuration } = findAllPaths(graph, 'Inicio', 'Fin');
  if (longestPath && longestDuration) {
    ruta.value=''
    allPaths.forEach(rutas=>{
      let bandera = true
      rutas.forEach(elemento=>{
        const aux = graph.nodes.find(node => node.name == elemento.source)
        const recorrido = graph.nodes.find(node => node.name == elemento.target+'-1')
        const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
        if(recorrido && valink && aux && valink.duration!=0){
          if(recorrido.IT==recorrido.TL && (parseFloat(aux.IT)+parseFloat(valink.duration)==recorrido.IT)){
          }else{
            bandera = false
          }
        }
      })
      if(bandera){
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
        ruta.value += '\n';
      }
    })
    valor.value = longestDuration.toFixed(2)  
  }

  if (!graph || !Array.isArray(graph.nodes)) {
    console.error('Datos de gráfico no válidos');
    return;
  }
  const comprobar = document.querySelector('canvas')
  if (comprobar){
  var canvas_ = d3.select("#network")
  
  var width = canvas_.attr("width"),
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
  ctx.fillStyle = "#ffffff"; // Color del texto (por ejemplo, blanco)
  ctx.font = "12px Arial"; // Estilo de fuente del texto
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Ajusta las coordenadas para centrar el texto en el círculo
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
     // Estilo de fuente para el número
    //ctx.fillText(d.name, textX, textY + 12);
  }else{
    ctx.font = "10px Arial";
    ctx.fillText(d.TL, textX-1, textY-8);
    ctx.fillText("━━━", textX, textY);
    ctx.fillText(d.IT, textX-1, textY+8);
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

    ctx.lineWidth = 2; // Ancho del enlace

    // Calcula la dirección y longitud del enlace
    var dx = l.target.x - l.source.x;
    var dy = l.target.y - l.source.y;
    var length = Math.sqrt(dx * dx + dy * dy);

    // Ajusta la posición de la punta de flecha para que esté más allá del nodo
    var arrowLength = 25; // Longitud de la punta de flecha (ajusta según tu preferencia)
    var offset = 5; // Ajusta el valor para que la punta de flecha esté más allá del nodo

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
      llegadas.forEach(termino=>{
        llegadas.forEach(rastro=>{
          const enlaceEncontrados = orden.find(link => link.llegada === termino && link.partida === rastro)
          if(enlaceEncontrados){
            bandera=false
          }
        })
      })
      if(bandera){
        let j = 0;
        for(let k=0;k<llegadas.length;k++) {
          const partidaEncontrados = orden.find(link => link.partida === llegadas[k])
          if (partidaEncontrados) {
            j = j + 1
          } else {
            k=llegadas.length
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
          records=records-parseFloat(valink.duration)
          const buscando = graph.nodes.find(node => node.name == rutas[i].target+'-1')
          if (buscando) {
            if(buscando.TL < records && buscando.TL!=0){
              records=buscando.TL
            }else{
              buscando.TL=records-recorrido.TL
            }
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
        }
      }
    })
    allPaths.forEach(rutas=>{
      rutas.forEach(elemento=>{

        const aux = graph.nodes.find(node => node.name == elemento.source)
        const recorrido = graph.nodes.find(node => node.name == elemento.target+'-1')
        const valink = graph.links.find(link => link.source == elemento.source && link.target == elemento.target)
        if(recorrido && valink && aux && valink.duration!=0){
          if(recorrido.IT==recorrido.TL && (parseFloat(aux.IT)+parseFloat(valink.duration)==recorrido.IT)){
            valink.type='ruta'
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
  // Declaración y cálculo de longestDuration
  let longestDuration = 0;

  function DFS(node) {
    visitedNodes.add(node);
  
    if (node === endNode) {
      // Filtra los enlaces válidos del camino actual
      const validLinks = currentPath.map((link) => ({ ...link })); // Copia de los enlaces
      // Calcula la duración total del recorrido actual
      const currentDuration = validLinks.reduce((sum, link) => sum + parseFloat(link.duration), 0);
  
      if (currentDuration > longestDuration) {
        longestPath = validLinks;
        longestDuration = currentDuration;
      }
      allPaths.push(validLinks);
    } else {
      // Continúa la búsqueda en los enlaces no visitados
      const currentNode = graph.nodes.find((n) => n.name === node);
      const adjacentLinks = graph.links.filter((link) => link.source === node);
      for (const link of adjacentLinks) {
        if (!visitedNodes.has(link.target)) {
          currentPath.push(link); // Agrega el enlace al camino actual
          DFS(link.target);
          currentPath.pop(); // Elimina el enlace del camino actual después de explorar
        }
      }
    }
    visitedNodes.delete(node);
  }

  DFS(startNode);
  return { allPaths, longestPath, longestDuration };
}