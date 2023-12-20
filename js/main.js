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

        console.log(opcionSeleccionada )
        if (data.historiaDeUsuario && opcionSeleccionada === "1") {
          console.log("Ingreso a historia de usuarios")
          data.historiaDeUsuario.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-group-item');

            listItem.innerHTML = `
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="check-${item.como.replace(/ /g, '_')}" data-title="${item.como}">
                <label class="form-check-label" for="check-${item.como.replace(/ /g, '_')}">
                  <span class="info-title">Como: ${item.como}</span>
                </label>
              </div>
              <p class="info-description">Quiero : ${item.quiero}</p>
              <p class="info-para">Para: ${item.para}</p>
            `;
            resultContainer.appendChild(listItem);
          });
        }

        if (data.casos_prueba && opcionSeleccionada === "2") {
          console.log("Ingreso a casos de pruebas")
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
                  <span class="info-subtitle">Descripción</span>
                  <p class="info-description">${item.descripcion}</p>
                  <span class="info-subtitle">Prencondicion</span>
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
            
                // Agregar el subtítulo "Pasos"
                const pasosSubtitle = document.createElement('span');
                pasosSubtitle.classList.add('info-subtitle');
                pasosSubtitle.textContent = 'Pasos';
                listItem.appendChild(pasosSubtitle);
            
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

                const resultadoSubtitle = document.createElement('span');
                resultadoSubtitle.classList.add('info-subtitle');
                resultadoSubtitle.textContent = 'Resultados Esperados';
                listItem.appendChild(resultadoSubtitle);
    
                item.resultadosEsperados.forEach((resultado, index) => {
                    const resultadoItem = document.createElement('li');
                    resultadoItem.textContent = resultado;
                    resultadosList.appendChild(resultadoItem);
                });
                listItem.appendChild(resultadosList);
            }
      
              resultContainer.appendChild(listItem);
          });
        }

        if(data.criteriosDeAceptacion && opcionSeleccionada === "3"){
          console.log(JSON.stringify(data));
          console.log("Ingreso al opcion Criterios")
         
           
        
            // Agregar la sección de criterios de aceptación como lista ordenada
           // Agregar la sección de criterios de aceptación como lista ordenada
if (data.criteriosDeAceptacion && data.criteriosDeAceptacion.length > 0) {
  const criteriosList = document.createElement('ol');
  criteriosList.classList.add('criterios');

  data.criteriosDeAceptacion.forEach((criterio, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      const checkboxId = `check-${criterio.dado.replace(/ /g, '_')}`;
      
      listItem.innerHTML = `
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="${checkboxId}" data-title="Criterio Aceptación #${index + 1}">
              <label class="form-check-label" for="${checkboxId}">
                  <span class="info-title">Criterio Aceptación #${index + 1}</span>
              </label>
          </div>
          <strong>Dado:</strong> ${criterio.dado}<br>
          <strong>Cuando:</strong> ${criterio.cuando}<br>
          <strong>Entonces:</strong> ${criterio.entonces}
      `;

      criteriosList.appendChild(listItem);
  });

  resultContainer.appendChild(criteriosList);
}


           

      
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
        });
      });

   
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
     
          mostrarToast('Tarjetas Creadas En Jira Correctamente');
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }

  }

  function mostrarToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
  
    toastMessage.textContent = message;
    toast.classList.add('show');
  
    // Ocultar el toast después de 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
    }, 6000);
  }

  function obtenerDatosSeleccionadosExcel() {
    const tipo1Radio = document.getElementById('opcion1');
    const tipo2Radio = document.getElementById('opcion2');
    const tipo3Radio = document.getElementById('opcion3');

    const datosSeleccionados = [];

    if (tipo1Radio.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');  
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
  
    
    }

    if (tipo2Radio.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
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
    
      
        datosSeleccionados.push({
          nombre,
          descripcion,
          precondiciones,
          pasos,
          resultados
        });
      });
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

    }

    

    if(tipo1Radio.checked || tipo2Radio.checked || tipo3Radio.checked){
      console.log(JSON.stringify(datosSeleccionados, null, 2));

  
      fetch('http://192.168.100.24:3040/api/chagpt/excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosSeleccionados, null, 2),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // Crear un enlace temporal y configurar su URL con el Blob
          const url = URL.createObjectURL(blob);
      
          // Crear un elemento de enlace y configurar sus atributos
          const link = document.createElement('a');
          link.href = url;
          link.download = 'CasosPruebas.xlsx'; // Puedes establecer el nombre del archivo como desees
      
          // Agregar el enlace al documento
          document.body.appendChild(link);
      
          // Simular un clic en el enlace para iniciar la descarga
         link.click();
      
          // Eliminar el enlace y liberar el objeto Blob después de la descarga
         document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }

  }
  

// Agregar un espacio entre los dos botones
const espacio = document.createElement('span');
espacio.innerHTML = '&nbsp;&nbsp;'; // Puedes ajustar la cantidad de espacios según sea necesario
document.getElementById('resultContainer').appendChild(espacio);

// Agregar el botón "Obtener Datos y Enviar Jira"
const obtenerDatosButton = document.createElement('button');
obtenerDatosButton.textContent = 'Obtener Datos y Enviar Jira';
obtenerDatosButton.className = 'btn btn-primary';
document.getElementById('resultContainer').appendChild(obtenerDatosButton);

// Agregar un espacio adicional entre los botones
const espacioAdicional = document.createElement('span');
espacioAdicional.innerHTML = '&nbsp;&nbsp;';
document.getElementById('resultContainer').appendChild(espacioAdicional);

// Agregar el botón "Descargar Excel"
const obtenerDatosButtonExcel = document.createElement('button');
obtenerDatosButtonExcel.textContent = 'Descargar Excel';
obtenerDatosButtonExcel.className = 'btn btn-success'; // Cambiado a color verde de WhatsApp
document.getElementById('resultContainer').appendChild(obtenerDatosButtonExcel);

// Escuchar el evento de clic en el botón para obtener los datos seleccionados
obtenerDatosButton.addEventListener('click', function () {
  obtenerDatosSeleccionados();
});

// Escuchar el evento de clic en el botón para obtener los datos seleccionados (Excel)
obtenerDatosButtonExcel.addEventListener('click', function () {
  obtenerDatosSeleccionadosExcel();
});


});
