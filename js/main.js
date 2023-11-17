document.addEventListener('DOMContentLoaded', function () {
  var tipo1Radio = document.getElementById('opcion1');
  var tipo2Radio = document.getElementById('opcion2');
  var tipo3Radio = document.getElementById('opcion3');
  var miInput = document.getElementById('customerNeed');

  tipo1Radio.addEventListener('change', function () {
    if (tipo1Radio.checked) {
      miInput.placeholder = "Ingrese la historia de usuario...";
    }
  });

  tipo2Radio.addEventListener('change', function () {
    if (tipo2Radio.checked) {
      miInput.placeholder = "Ingrese el caso de prueba...";
    }
  });
  tipo3Radio.addEventListener('change', function () {
    if (tipo3Radio.checked) {
      miInput.placeholder = "Ingrese los criterios de aceptacion...";
    }
  });

  document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    const opcionSeleccionada = document.querySelector('input[name="option"]:checked').value;
    const cantidadRespuestas = document.getElementById('requestQuantity').value;
    const mensaje = document.getElementById('customerNeed').value;
    
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ opcionSeleccionada, cantidadRespuestas, mensaje }),
    })
      .then(response => response.json())
      .then(data => {
        const resultContainer = document.getElementById('resultList');
        resultContainer.innerHTML = '';

        if (data.historiaDeUsuario && opcionSeleccionada === "1") {
          data.historiaDeUsuario.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-group-item');

            listItem.innerHTML = `
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="check-${item.como.replace(/ /g, '_')}" data-title="${item.como}">
                <label class="form-check-label" for="check-${item.como.replace(/ /g, '_')}">
                  <span class="info-title">${item.como}</span>
                </label>
              </div>
              <p class="info-description">${item.quiero}</p>
              <p class="info-para">${item.para}</p>
            `;

            /*if (item.criterios_aceptacion && item.criterios_aceptacion.length > 0) {
              const criteriosList = document.createElement('ul');
              criteriosList.classList.add('criterios-aceptacion');

              item.criterios_aceptacion.forEach((criterio, index) => {
                const criterioItem = document.createElement('li');
                criterioItem.textContent = `${index + 1}) ${criterio}`;
                criteriosList.appendChild(criterioItem);
              });
              listItem.appendChild(criteriosList);
            }*/
            resultContainer.appendChild(listItem);
          });
        }

        if (data.casos_prueba && opcionSeleccionada === "2") {
          data.casos_prueba.forEach(item => {
              const listItem = document.createElement('div');
              listItem.classList.add('list-group-item');
      
              listItem.innerHTML = `
                  <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="check-${item.titulo.replace(/ /g, '_')}" data-title="${item.titulo}">
                      <label class="form-check-label" for="check-${item.titulo.replace(/ /g, '_')}">
                          <span class="info-title">${item.titulo}</span>
                      </label>
                  </div>
                  <p class="info-description">${item.descripcion}</p>
              `;
      
              if (item.preCondicion && item.preCondicion.length > 0) {
                  const precondicionList = document.createElement('ul');
                  precondicionList.classList.add('precondicion');
      
                  item.preCondicion.forEach((precondicion, index) => {
                      const precondicionItem = document.createElement('li');
                      precondicionItem.textContent = precondicion;
                      precondicionList.appendChild(precondicionItem);
                  });
                  listItem.appendChild(precondicionList);
              }
      
              if (item.pasos && item.pasos.length > 0) {
                  const pasosList = document.createElement('ol');
                  pasosList.classList.add('pasos');
      
                  item.pasos.forEach((paso, index) => {
                      const pasoItem = document.createElement('li');
                      pasoItem.textContent = paso;
                      pasosList.appendChild(pasoItem);
                  });
                  listItem.appendChild(pasosList);
              }

              if (item.resultadosEsperados && item.resultadosEsperados.length > 0) {
                const resultadosList = document.createElement('ol');
                resultadosList.classList.add('resultados');
    
                item.resultadosEsperados.forEach((resultado, index) => {
                    const resultadoItem = document.createElement('li');
                    resultadoItem.textContent = resultado;
                    resultadosList.appendChild(resultadoItem);
                });
                listItem.appendChild(resultadosList);
            }
      
              /*if (item.resultadosEsperados) {
                  const resultadoEsperado = document.createElement('p');
                  resultadoEsperado.textContent = `Resultado Esperado: ${item.resultado_esperado}`;
                  listItem.appendChild(resultadoEsperado);
              }*/
      
              resultContainer.appendChild(listItem);
          });
        }

        if(data.historiaDeUsuario && opcionSeleccionada === "3"){
          console.log(JSON.stringify(data));
          data.historiaDeUsuario.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-group-item');
    
            listItem.innerHTML = `
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="check-${item.como.replace(/ /g, '_')}" data-title="${item.como}">
                    <label class="form-check-label" for="check-${item.como.replace(/ /g, '_')}">
                        <span class="info-title">${item.como}</span>
                    </label>
                </div>
                <p class="info-quiero">${item.quiero}</p>
                <p class="info-para">${item.para}</p>
            `;
            
            // Agregar la sección de criterios de aceptación como lista ordenada
            if (item.criteriosDeAceptacion && item.criteriosDeAceptacion.length > 0) {
              const criteriosList = document.createElement('ol');
              criteriosList.classList.add('criterios');

              item.criteriosDeAceptacion.forEach(criterio => {
                const criterioItem = document.createElement('li');
                criterioItem.innerHTML = `
                  <strong>Dado:</strong> ${criterio.dado}<br>
                  <strong>Cuando:</strong> ${criterio.cuando}<br>
                  <strong>Entonces:</strong> ${criterio.entonces}
                `;
                criteriosList.appendChild(criterioItem);
              });

              listItem.appendChild(criteriosList);
            }

            resultContainer.appendChild(listItem);

        });
        }

        spinner.style.display = 'none';
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
        spinner.style.display = 'none';
      });
  });

    //Validacion de la cantidad de request
    const requestQuantityInput = document.getElementById('requestQuantity');
    requestQuantityInput.addEventListener('input', function () {
    // Obtén el valor actual del input como una cadena
    let inputValue = requestQuantityInput.value;
    // Limpia el valor de cualquier caracter no numérico
    inputValue = inputValue.replace(/\D/g, ''); // Expresión regular para eliminar caracteres no numéricos
    // Convierte el valor en un número entero
    let numericValue = parseInt(inputValue);
    // Validación: No números negativos
    if (numericValue < 1) {
      numericValue = 1; // Establece el valor a 1 si es negativo o 0
    }
    // Validación: No más de 10
    if (numericValue > 10) {
      numericValue = 10; // Establece el valor a 10 si es mayor que 10
    }
    // Establece el valor limpiado y validado en el input
    requestQuantityInput.value = numericValue;
  });





  // Función para obtener los datos seleccionados y mostrarlos por consola
  function obtenerDatosSeleccionados() {
    // Verificar si el radio con value "1" (o id "opcion1") está seleccionado
    const tipo1Radio = document.getElementById('opcion1');
    const tipo2Radio = document.getElementById('opcion2');
    const tipo3Radio = document.getElementById('opcion3');

    const datosSeleccionados = [];

    if (tipo1Radio.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      //const datosSeleccionados = [];
  
      checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest('.list-group-item');
        const nombre = listItem.querySelector('.info-title').textContent;
        const descripcion = listItem.querySelector('.info-description').textContent;
  
        const criterios = [];
        const criteriosList = listItem.querySelector('.criterios-aceptacion');
        if (criteriosList) {
          criteriosList.querySelectorAll('li').forEach(criterioItem => {
            criterios.push(criterioItem.textContent);
          });
        }
  
        datosSeleccionados.push({
          nombre,
          descripcion,
          criterios
        });
      });
  
      /*console.log(JSON.stringify(datosSeleccionados, null, 2));
  
      fetch('http://192.168.100.24:3040/api/chagpt/jira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSeleccionados, null, 2),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });*/
    }

    if (tipo2Radio.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      //const datosSeleccionados = [];
    
      checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest('.list-group-item');
        const nombre = listItem.querySelector('.info-title').textContent;
        const descripcion = listItem.querySelector('.info-description').textContent;
    
        const precondiciones = [];
        const precondicionList = listItem.querySelector('.precondicion');
        if (precondicionList) {
          precondicionList.querySelectorAll('li').forEach(precondicionItem => {
            precondiciones.push(precondicionItem.textContent);
          });
        }
    
        const pasos = [];
        const pasosList = listItem.querySelector('.pasos');
        if (pasosList) {
          pasosList.querySelectorAll('li').forEach(pasoItem => {
            pasos.push(pasoItem.textContent);
          });
        }

        const resultados = [];
        const resultadosList = listItem.querySelector('.resultados');
        if (resultadosList) {
          resultadosList.querySelectorAll('li').forEach(resultadoItem => {
            resultados.push(resultadoItem.textContent);
          });
        }
    
        //const resultadoEsperado = listItem.querySelector('.resultado-esperado');
        //const resultadoEsperadoText = resultadoEsperado ? resultadoEsperado.textContent.replace('Resultado Esperado: ', '') : '';
    
        datosSeleccionados.push({
          nombre,
          descripcion,
          precondiciones,
          pasos,
          resultados
          //resultado_esperado: resultadoEsperadoText
        });
      });

      /*console.log(JSON.stringify(datosSeleccionados, null, 2));
  
      fetch('http://192.168.100.24:3040/api/chagpt/jira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSeleccionados, null, 2),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });*/
    }


    if (tipo3Radio.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      //const datosSeleccionados = [];
    
      checkboxes.forEach(checkbox => {
        const listItem = checkbox.closest('.list-group-item');
        const como = listItem.querySelector('.info-title').textContent;
        const quiero = listItem.querySelector('.info-quiero').textContent;
        const para = listItem.querySelector('.info-para').textContent;

        const criteriosDeAceptacion = [];
        const criteriosList = listItem.querySelector('.criterios');
        if (criteriosList) {
          criteriosList.querySelectorAll('li').forEach(criterioItem => {
            criteriosDeAceptacion.push(criterioItem.textContent);
          });
        }
    
        datosSeleccionados.push({
          como,
          quiero,
          para,
          criteriosDeAceptacion,
        });
      });

      /*console.log(JSON.stringify(datosSeleccionados, null, 2));
  
      fetch('http://192.168.100.24:3040/api/chagpt/jira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSeleccionados, null, 2),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });*/
    }

    

    if(tipo1Radio.checked || tipo2Radio.checked || tipo3Radio.checked){
      console.log(JSON.stringify(datosSeleccionados, null, 2));
  
      fetch('http://192.168.100.24:3040/api/chagpt/jira', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSeleccionados, null, 2),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }

  }
  

  // Agregar un botón "Obtener Datos" al formulario
  const obtenerDatosButton = document.createElement('button');
  obtenerDatosButton.textContent = 'Obtener Datos y Enviar Jira';
  obtenerDatosButton.className = 'btn btn-primary';
  document.getElementById('resultContainer').appendChild(obtenerDatosButton);

  // Escuchar el evento de clic en el botón para obtener los datos seleccionados
  obtenerDatosButton.addEventListener('click', function () {
    obtenerDatosSeleccionados();
  });
});
