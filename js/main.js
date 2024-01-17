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
          console.log("Ingreso a historia de usuarios");
          data.historiaDeUsuario.forEach(item => {
              const listItem = document.createElement('div');
              listItem.classList.add('list-group-item');
      
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.classList.add('form-check-input');
              checkbox.id = `check-${item.como.replace(/ /g, '_')}`;
              checkbox.setAttribute('data-title', item.como);
      
              const textarea = document.createElement('textarea');
              textarea.classList.add('form-control');
              textarea.id = `textarea-${item.como.replace(/ /g, '_')}`;
              textarea.setAttribute('data-title', item.como);
              textarea.rows = '3';
              textarea.disabled = true;
      
              textarea.value = `Como: ${item.como}
Quiero: ${item.quiero}
Para: ${item.para}
              `;
      
              checkbox.addEventListener('change', function () {
                  textarea.disabled = !textarea.disabled;
                  
                  // Ajustar dinámicamente la altura del textarea después de cambiar el estado
                  textarea.style.height = "auto";
                  textarea.style.height = (textarea.scrollHeight) + "px";
              });
      
              listItem.appendChild(checkbox);
              listItem.appendChild(textarea);
      
              resultContainer.appendChild(listItem);
      
              // Ajustar dinámicamente la altura del textarea después de agregar al DOM
              textarea.style.height = "auto";
              textarea.style.height = (textarea.scrollHeight) + "px";
          });
      }
      


      if (data.casos_prueba && opcionSeleccionada === "2") {
        console.log("Ingreso a casos de prueba");
        data.casos_prueba.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-group-item');
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.id = `check-${item.titulo.replace(/ /g, '_')}`;
            checkbox.setAttribute('data-title', item.titulo);
    
            const textarea = document.createElement('textarea');
            textarea.classList.add('form-control');
            textarea.id = `textarea-${item.titulo.replace(/ /g, '_')}`;
            textarea.setAttribute('data-title', item.titulo);
            textarea.rows = '3';
            textarea.disabled = true;
    
            textarea.value = `${item.titulo}
    
Descripción:
    ${item.descripcion}
    
Precondición:
    ${item.preCondicion.join('\n')}
    
Pasos:
    ${item.pasos.join('\n')}
    
Resultados Esperados:
    ${item.resultadosEsperados.join('\n')}
            `;
    
            checkbox.addEventListener('change', function () {
                textarea.disabled = !textarea.disabled;
    
                // Ajustar dinámicamente la altura del textarea después de cambiar el estado
                textarea.style.height = "auto";
                textarea.style.height = (textarea.scrollHeight) + "px";
            });
    
            listItem.appendChild(checkbox);
            listItem.appendChild(textarea);
    
            resultContainer.appendChild(listItem);
    
            // Ajustar dinámicamente la altura del textarea después de agregar al DOM
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";
        });
    }
    
    


    if (data.criteriosDeAceptacion && opcionSeleccionada === "3") {
      console.log("Ingreso a criterios de aceptación");
  
      if (data.criteriosDeAceptacion && data.criteriosDeAceptacion.length > 0) {
          data.criteriosDeAceptacion.forEach(criterio => {
              const listItem = document.createElement('div');
              listItem.classList.add('list-group-item');
  
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.classList.add('form-check-input');
              checkbox.id = `check-${criterio.dado.replace(/ /g, '_')}`;
  
              const textarea = document.createElement('textarea');
              textarea.classList.add('form-control');
              textarea.id = `textarea-${criterio.dado.replace(/ /g, '_')}`;
              textarea.setAttribute('data-title', criterio.dado);
              textarea.rows = '3';
              textarea.disabled = true;
  
              textarea.value = `Dado: ${criterio.dado}
Cuando: ${criterio.cuando}
Entonces: ${criterio.entonces}`;
  
              checkbox.addEventListener('change', function () {
                  textarea.disabled = !textarea.disabled;
  
                  // Ajustar dinámicamente la altura del textarea después de cambiar el estado
                  textarea.style.height = "auto";
                  textarea.style.height = (textarea.scrollHeight) + "px";
              });
  
              listItem.appendChild(checkbox);
              listItem.appendChild(textarea);
  
              resultContainer.appendChild(listItem);
  
              // Ajustar dinámicamente la altura del textarea después de agregar al DOM
              textarea.style.height = "auto";
              textarea.style.height = (textarea.scrollHeight) + "px";
          });
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


  function obtenerDatosSeleccionados() {
    // Obtener el valor del radio seleccionado
    const tipo1Radio = document.getElementById('opcion1');
    const tipo2Radio = document.getElementById('opcion2');
    const tipo3Radio = document.getElementById('opcion3');

    let tipo = 1;  // Valor predeterminado

    if (tipo1Radio.checked) {
        tipo = 1;
    } else if (tipo2Radio.checked) {
        tipo = 2;
    } else if (tipo3Radio.checked) {
        tipo = 3;
    }

    // Obtener todas las casillas de verificación marcadas
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Objeto para almacenar la información de las casillas de verificación marcadas
    const checkboxInfo = {
        Tipo: tipo,  // 1=Historia de usuario 2 = casos de prueba 3 = criterios de aceptacion
        contenido: []
    };

    checkboxes.forEach(checkbox => {
        const checkboxId = checkbox.id;
        const textareaId = checkboxId.replace("check-", "textarea-");
        const textareaValue = document.getElementById(textareaId).value;

        // Agregar el contenido al array "contenido"
        checkboxInfo.contenido.push(textareaValue);
    });

    // Mostrar la información en la consola
    console.log(JSON.stringify(checkboxInfo, null, 2));
    //return checkboxInfo;

    if(tipo1Radio.checked || tipo2Radio.checked || tipo3Radio.checked){
  
      fetch('http://192.168.100.24:3040/api/chagpt/jira', {//ip local: ipconfig
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkboxInfo, null, 2),
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
      //console.log(tipo1Radio.checked);
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
      console.log(tipo2Radio.checked);

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
