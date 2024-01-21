import React, { useState } from 'react';
import { useEffect } from 'react';
export const Desicion = () => {
  const [mostrarInput, setMostrarInput] = useState(true);
  const [mostrarTable, setMostrarTable] = useState(false);
  const [mostrarTC, setMostrarTC] = useState(false);
  const [mostrarTN, setMostrarTN] = useState(false);
  const [mostrarTF, setMostrarTF] = useState(false);

  const [numeroAtributos, setNumeroAtributos] = useState(0);
  const [numeroOpciones, setnumeroOpciones] = useState(0);
  const [Matrices, setMatrices] = useState([]);
  const [Data, setData] = useState([]);
  const [Opciones, setOpciones] = useState([]);
  const [Criterio, setCriterio] = useState([]);
  const [Comparado, setComparado] = useState([]);
  const [CMatriz, setCMatriz] = useState([]);
  const [Normaliza, setNormaliza] = useState([]);
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const numAtributos = parseInt(numeroAtributos, 10);
    const numOpciones = parseInt(numeroOpciones, 10);
    console.log(numeroAtributos)
    console.log(numeroOpciones)

    const datos_opciones = []
    for (let j = 0; j < numOpciones; j++) {
      datos_opciones.push({
        nombre:'',
      })
    }
    setOpciones(datos_opciones)
    const datos_criterios = []
    for (let j = 0; j < numAtributos; j++) {
      datos_criterios.push({
        nombre:'',
      })
    }
    setCriterio(datos_criterios)
    setMostrarInput(false);
    setMostrarTC(true);
  };
  const handleInputChangeMatriz = (e, index, key) => {
    const newOpciones = [...CMatriz];
    newOpciones[index][key] = e.target.value;
    setCMatriz(newOpciones);
  };
  const handleInputChangeOpciones = (e, index, key) => {
    const newOpciones = [...Opciones];
    newOpciones[index][key] = e.target.value;
    setOpciones(newOpciones);
  };
  const handleInputChangeCriterios = (e, index, key) => {
    const newCriterios = [...Criterio];
    newCriterios[index][key] = e.target.value;
    setCriterio(newCriterios);
  };
  const handleInputChange = (e, matrizIndex, filaIndex, elementoIndex) => {
    const newMatrices = [...Matrices];
    newMatrices[matrizIndex][filaIndex][elementoIndex] = e.target.value;
    setMatrices(newMatrices);
  };
  const handleEditClick = () => {
    setMostrarInput(true);
    setMostrarTable(false);
    setMostrarTC(false);
    setMostrarTN(false);
    setMostrarTF(false);
  }
  const graficar = () =>{
    event.preventDefault()
    const numAtributos =Criterio.length
    const numOpciones = Opciones.length
    const CriteriosNuevas = [];
    for (let i = 0; i < numAtributos; i++) {
      const matriz = [];
      for (let j = 0; j < numOpciones+2; j++) {
        const fila = [];
        for (let k = 0; k < numOpciones+1; k++) {
          if(k==0 && j!=0){
            if(j==numOpciones+1){
              fila.push('')
            }else{
              fila.push('Opción '+(j))
            }
          }
          else if(k!=0 && j==0){
            fila.push('Opción '+(k))
          }else if(k==j && k!=0){
            fila.push(1)
          }
          else{
            fila.push('')
          }
         
        }
        matriz.push(fila)
      }
      CriteriosNuevas.push(matriz)
    }
    setMatrices(CriteriosNuevas)
    console.log(Matrices)
    setMostrarTN(true);
  }
  const normalizar = () =>{
    console.log(Matrices)
    event.preventDefault()
    const variasmatrices = []
    const resultMatrices =[]
    for (let i = 0; i < Matrices.length; i++) {
      const fila =[]
      for (let m = 0; m < Matrices[i].length; m++) {
        fila.push(0);
      }
      for (let j = 0; j < Matrices[i].length; j++) {
        let sum=0
        //console.log("j: "+j)
        
        for (let k = 0; k < Matrices[i][j].length; k++) {
          //console.log("k: "+k)
          if (typeof Matrices[i][j][k] === 'string' && (k!=0 && j!=0 && j!=Matrices[i].length-1)) {
            const separar = Matrices[i][j][k].split('/')
            const div = parseFloat(separar[0])/parseFloat(separar[1])
            sum+=div
            fila[k]+=div
          }else if(k==j && k!=0 && j!=0){
            //fila.push(1)
            sum+=1
            fila[k]+=1
          }
        }
      }
      fila.shift();
      fila.pop();
      resultMatrices.push(fila)
    }
    console.log(resultMatrices)

    for (let i = 0; i < Matrices.length; i++) {
      const matriz = []
      for (let j = 0; j < Matrices[i].length; j++) {
        const fila = [];
        for (let k = 0; k < Matrices[i][j].length; k++) {
          if (typeof Matrices[i][j][k] === 'string' && (k!=0 && j!=0 && j!=Matrices[i].length-1)) {
            const separar = Matrices[i][j][k].split('/')
            const div = (parseFloat(separar[0])/parseFloat(separar[1]))
            fila.push(div)
          }else if(k==j && k!=0 && j!=0){
            fila.push(1)
          }
          if(j!=0 && j!=Matrices[i].length-1 && k==Matrices[i][j].length-1){
            fila.push(0)
          }
        }
        matriz.push(fila)
        
      }
      matriz.shift();
      matriz.pop();
      variasmatrices.push(matriz)
    }
    console.log(variasmatrices)
    for (let i = 0; i < variasmatrices.length; i++) {
      for (let j = 0; j < variasmatrices[i].length; j++) {
        let suma = 0
        for (let k = 0; k < variasmatrices[i][j].length-1; k++) {
          variasmatrices[i][j][k]=(variasmatrices[i][j][k]/resultMatrices[i][k]).toFixed(6)
          suma+=parseFloat(variasmatrices[i][j][k])
        }
        variasmatrices[i][j][variasmatrices[i][j].length-1]=(suma/resultMatrices[i].length).toFixed(6)
        console.log(variasmatrices[i][j][variasmatrices[i][j].length-1])
      }
    }
    console.log(variasmatrices)
    setData(variasmatrices)
    console.log(Data)
  /*}
  const comparacionCriterios = () =>{
    event.preventDefault()*/

    const matriz = []
    Criterio.forEach((filaC , indexf)=>{
      const fila = []
      Criterio.forEach((columnaC, indexc)=>{
        if(indexc==indexf){
          fila.push(1)
        }else{
          fila.push(0)
        }
        //console.log('I: '+indexc)
      })
      //console.log('J: '+indexf)
      matriz.push(fila)
    })
    setCMatriz(matriz)
    setMostrarTable(true);
  }
  const comparar = () =>{
    event.preventDefault()
    const sumandos =[]
    CMatriz.forEach((nums)=>{
      sumandos.push(0)
    })
    console.log(CMatriz)
    CMatriz.forEach((fila,indexf)=>{
      let acumulado =0
      fila.forEach((columna,indexc)=>{
        //console.log(columna)
        if (typeof columna === 'string' && indexf!=indexc) {
          const separar = columna.split('/')
          sumandos[indexc]+=parseFloat(separar[0])/parseFloat(separar[1])
        }else{
          sumandos[indexc]+=1
        }
      })
    })
    console.log(sumandos)
    console.log(Data)
    const promedios = []
    CMatriz.forEach((nums)=>{
      promedios.push(0)
    })
    const normal =[]
    CMatriz.forEach((fila,indexf)=>{
      const normalfila = []
      let suma=0
      fila.forEach((columna,indexc)=>{
        if (typeof columna === 'string' && indexf!=indexc) {
          const separar = columna.split('/')
          const div =(parseFloat(separar[0])/parseFloat(separar[1]))
          normalfila.push((div/sumandos[indexc]).toFixed(6))
          suma+=div/sumandos[indexc]
        }else{
          normalfila.push((1/sumandos[indexc]).toFixed(6))
          suma+=(1/sumandos[indexc])
        }
      })
      console.log(fila.length)
      normalfila.push((suma/fila.length).toFixed(6))
      normal.push(normalfila)
    })
    setNormaliza(normal)
    console.log(Normaliza)
    console.log(Comparado)
    const orden = []
    for (let i = 0; i < Normaliza.length; i++) {
      orden.push(Normaliza[i][Normaliza[0].length-1])
      console.log(orden[i])
    }
    console.log(orden)
      const sumas = []
      for (let j = 0; j < Comparado.length; j++){
        sumas[j]=0
      }
      for (let i = 0; i < Comparado.length; i++) {
        for (let j = 0; j < Comparado[i].length-1; j++){
          sumas[i]+=parseFloat(Comparado[i][j])*parseFloat(orden[j])
          console.log(j+': '+Comparado[i][j]+'*'+orden[j]+'='+sumas[j])
        }
      }
      const matriz = []
      for (let i = 0; i < Data[0].length; i++) {
        const fila = []
        for (let j = 0; j < Data.length; j++){
          //console.log(Data.length[i][j])
  
          fila.push(Data[j][i][Data[0][0].length-1])
        }
        fila.push(sumas[i])
        matriz.push(fila)
      }
  
      setComparado(matriz)
      console.log(Comparado)

      
    console.log(sumas)
    setMostrarTF(true);
  }
  useEffect(() => {
  },[Comparado],[Normaliza]);

  return(

    <div className='row m-0 p-0 d-flex justify-content-center'>
      
      <div className='col-12 p-2'>
        <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h2>Calculadora de Teoría de Desiciones</h2>
              <br></br>
              <h3>Instrucciones</h3>
              <p>
                •Ingresar valores mayores a cero.
              </p>
              <p>
                •Los valores ingresados en la Matrices de los Criterios deben estar siempre con un "/" por mas que sea un numero entero.
              </p>
            </div>
          </div>
        {mostrarInput && (
        <div className='marco m-3'>
          <div className='recuadro m-3'>
            <form onSubmit={handleFormSubmit}>
              <div className='row m-0 p-0 d-flex justify-content-center'>
                <div className='col-lg-6 col-12 p-2 m-0'>
                  <label htmlFor="numeroAtributos">N° Criterios:&nbsp;&nbsp;</label>
                  <input
                    type="number"
                    id="numeroAtributos"
                    name="numeroAtributos"
                    min={2}
                    value={numeroAtributos}
                    onChange={(e) => setNumeroAtributos(e.target.value)}
                  />
                </div>
                <div className='col-lg-6 col-12 p-2 m-0'>
                  <label htmlFor="numeroOpciones">N° Opciones:&nbsp;&nbsp;</label>
                  <input
                    type="number"
                    id="numeroOpciones"
                    name="numeroOpciones"
                    min={2}
                    value={numeroOpciones}
                    onChange={(e) => setnumeroOpciones(e.target.value)}
                  />
                </div>
                <input className='strokes' type="submit" value="Generar" />
              </div>
            </form>
          </div>
          <div className='recuadro m-3'>
            <p className="emphasized">Imagen Representativa</p>
            <div className='row m-0 d-flex justify-content-center'>
              <div className='col-lg-8 col-12 p-2'>
                <img src='https://rvargas-static.s3.amazonaws.com/images/articles/articles_compendium_ahp_es-web-resources/image/3104.png' className='img-fluid'></img>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      
      {mostrarTC && (
      <div className='row m-0 p-0 d-flex justify-content-center'>
        <div className='col-lg-10 col-12 p-0'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <input type="button" value="Editar" onClick={handleEditClick} />
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-12 p-0'>
          <div className='marco m-3'>
            <div className='card m-3 table-container'>
              <table className="m-0">
                <thead className='m-0'>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Criterios</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {Criterio.map((info_criterio, critIndex) => (
                  <tr scope="row m-0 p-0" key={critIndex}>
                    <td className='m-0 col'>
                      <input
                        type='text'
                        readOnly
                        value={critIndex+1}
                        />
                    </td>
                    <td className='m-0 col'>
                      <input
                        type="text"
                        value={info_criterio.nombre}
                        onChange={(e) =>handleInputChangeCriterios(e,critIndex,'nombre')}
                      />
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-12 p-0'>
          <div className='marco m-3'>
            <div className='card m-3 table-container'>
              <table className="m-0">
                <thead className='m-0'>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {Opciones.map((opcion, opIndex) => (
                  <tr scope="row m-0 p-0" key={opIndex}>
                    <td className='m-0 col'>
                      <input
                        type='text'
                        readOnly
                        value={opIndex+1}
                        />
                    </td>
                    <td className='m-0 col'>
                      <input
                        type="text"
                        value={opcion.nombre}
                        onChange={(e) =>handleInputChangeOpciones(e,opIndex,'nombre')}
                      />
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='m-3'>
              <form onSubmit={graficar} className='d-flex justify-content-center'>
                <input className='strokes' type="submit" value="Crear" />
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
      {mostrarTN && (
      <div className='row m-0 p-0 d-flex justify-content-center'>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h3>Criterios</h3>
            </div>
            {Matrices.map((Matriz, matrizIndex) => (   
            <div className='card m-3 table-container' key={matrizIndex}>
              <h5>{Criterio[matrizIndex].nombre}</h5>
              <table className="m-0 t-desicion">
                <tbody className='m-0'>
                  {Matriz.map((fila, filaIndex) => (
                    <tr scope="row m-0 p-0" key={filaIndex}>
                      {fila.map((elemento, elementoIndex) => (
                        <td className='m-0 col' key={elementoIndex}>
                            <input
                              type="text"
                              value={elemento}
                              readOnly={filaIndex === 0 || filaIndex === Opciones.length+1 || elementoIndex === 0 || filaIndex === elementoIndex}
                              onChange={(e) => handleInputChange(e, matrizIndex, filaIndex, elementoIndex)}
                            />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ))}
          </div>
        </div>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <form onSubmit={normalizar}>
              <div className='m-3 d-flex justify-content-center'>
                <input  className='strokes' type="submit" value="Normalizar" />
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      {mostrarTable && (
      <div className='row m-0 p-0 d-flex justify-content-center'>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h3>Matriz Normalizada</h3>
            </div>
            {Data.map((dataMatriz, datIndex) => (   
            <div className='card m-3 table-container'>
              <h5>{Criterio[datIndex].nombre}</h5>
              <table className="m-0 t-desicion">
                <thead className='m-0'>
                  <tr>
                    <th scope="col" colSpan={Opciones.length}>Matriz Normalizada</th>
                    <th scope="col">Promedio</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {dataMatriz.map((datafila) => (
                    <tr scope="row m-0 p-0">
                      {datafila.map((dataelemento) => (
                        <td className='m-0 col'>
                            <input
                              type="text"
                              value={dataelemento}
                              readOnly
                            />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='m-1'>
                <input
                  type="text"
                  readOnly
                  style={{ border: '2.3px solid #ffffff' }}
                />
              </div>
            </div>
            ))}
          </div>
        </div>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h3>Matriz de Comparacion de Criterios</h3>
            </div>
            <div className='card m-3 table-container'>
              <table className="m-0 t-desicion">
                <tbody className='m-0'>
                <tr scope="row m-0 p-0">
                  <td className='m-0 col'>
                      <input
                        type="text"
                        readOnly
                    />
                  </td>
                  {CMatriz.map((elemeto,indeElemento)=>(
                  <td className='m-0 col'>
                    <input
                      type="text"
                      value={Criterio[indeElemento].nombre}
                      readOnly
                    />
                  </td>
                  ))}
                </tr>
                {CMatriz.map((filacomp, indexfilacomp) => (
                  <tr scope="row m-0 p-0" key={indexfilacomp}>
                    <td className='m-0 col'>
                      <input
                        type="text"
                        value={Criterio[indexfilacomp].nombre}
                        readOnly
                      />
                    </td>
                    {filacomp.map((compo, indexcompo) => (
                      <td className='m-0 col' key={indexcompo}>
                        <input
                          type="text"
                          value={compo}
                          onChange={(e) =>handleInputChangeMatriz(e,indexfilacomp,indexcompo)}
                          readOnly={indexfilacomp==indexcompo}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='marco m-3'>
            <form onSubmit={comparar}>
              <div className='m-3 d-flex justify-content-center'>
                <input className='strokes'  type="submit" value="Comparar" />
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      {mostrarTF && (
      <div className='row m-0 p-0 d-flex justify-content-center'>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h3>Matriz Normalizada de Criterios</h3>
            </div>  
            <div className='card m-3 table-container'>
              <table className="m-0 t-desicion">
                <thead className='m-0'>
                  <tr>
                    <th scope="col" colSpan={Criterio.length}>Matriz Normalizada</th>
                    <th scope="col">Promedio</th>
                  </tr>
                </thead>
                <tbody className='m-0'>
                  {Normaliza.map((Normalizafila) => (
                    <tr scope="row m-0 p-0">
                      {Normalizafila.map((dataNormaliza) => (
                        <td className='m-0 col'>
                            <input
                              type="text"
                              value={dataNormaliza}
                              readOnly
                            />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-12 p-2'>
          <div className='marco m-3'>
            <div className='recuadro m-3'>
              <h3>Matriz de Comparacion</h3>
            </div>
            <div className='card m-3 table-container'>
              <table className="m-0 t-desicion">
                <tbody className='m-0'>
                <tr scope="row m-0 p-0">
                  <td className='m-0 col'>
                      <input
                        type="text"
                        readOnly
                    />
                  </td>
                  {Criterio.map((elemeto)=>(
                  <td className='m-0 col'>
                    <input
                      type="text"
                      value={elemeto.nombre}
                      readOnly
                    />
                  </td>
                  ))}
                  <td className='m-0 col'>
                    <input
                      type="text"
                      value='Total'
                      readOnly
                    />
                  </td>
                </tr>
                {Comparado.map((filacomp, indexfilacomp) => (
                  <tr scope="row m-0 p-0" key={indexfilacomp}>
                    <td className='m-0 col'>
                      <input
                        type="text"
                        value={Opciones[indexfilacomp].nombre}
                        readOnly
                      />
                    </td>
                    {filacomp.map((compo, indexcompo) => (
                      <td className='m-0 col' key={indexcompo}>
                        <input
                          type="text"
                          value={compo}
                          readOnly
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
  </div>

  )
}
