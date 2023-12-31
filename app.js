/* 
    - La App simula una pagina para comprar Video Juegos.
    - Los juegos seleccionados se agregan al Local Storage 'carritoJuegos', existe hasta hasta que se realiza la compra.
    - Los juegos comprados se agregan al Local Storage 'juegosComprados', que se usa para simular la persistencia de los juegos 
      que se compran (biblioteca), los juegos comprados se marcan, para que al recargar la pagina no se puedan volver a comprar.
*/

let listaUsuarios = [];
let listaJuegos = [];
let carritoJuegos = [];
let tablaCarrito;
let carritoStorage = [];
let flagCompra = 0;

/* 
    Muestra mensaje cuando se comprar un juego
    Desactiva Botones
*/
const validarCarrito = (juego, mensaje) => {
    if(mensaje !== ""){
        let alertaCompra = document.querySelector(`#contenedor${juego}`);
        alertaCompra.innerHTML = alertaCompra.innerHTML + `<p class="alertaCompra">${mensaje}</p>`;
    }
   
    document.querySelector(`#${juego}`).disabled = true;
    document.querySelector(`#${juego}`).classList.add('botonApagado');
}

/* 
    Muestra la lista que recibe como parametro
    Marca los juegos comprados que estan en el Local Storage
*/
const mostrarBusqueda = (lista) => {
    const contenedor = document.getElementById('contenedorTarjetas');
    contenedor.innerHTML = ``;

    lista.forEach((item) => {
        let nombre = item.nombre.replace(/\s+/g, '');

        contenedor.innerHTML = contenedor.innerHTML + `
            <div class="card col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-2 pb-2 mb-3">
                <div class="d-flex flex-column align-items-center justify-content-evenly p-2">
                    <img class="imgInicio" src="${item.imagen}">
                    ${carritoStorage?.some((e) => e.nombre.replace(/\s+/g, '') === nombre) ? '<img class="enBiblioteca" src="./assets/img/en_biblioteca.png" alt="En la Biblioteca">' : ''}
                    <div class="modal fade" id="modal${nombre}" tabindex="-1" role="dialog"
                        aria-labelledby="modal${nombre}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable d-flex justify-content-center align-items-center"
                            role="document">
                            <div class="modal-content modalColor text-white">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modal${nombre}Title">${item.nombre}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                                    <img class="imgInicio " src="${item.imagen}" alt="Juego ${item.nombre}"/>
                                    <p class="text-justify">${item.descripcion}</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <p class="text-left parrafoDescripcion"><span class="spanParrafo">Precio: </span>${item.precio} pesos</p>
                                    <p class="text-left parrafoDescripcion"><span class="spanParrafo">Genero: </span>${item.genero}</p>
                                </div>
                                <div class="modal-footer d-flex justify-content-between align-items-center" id="contenedor${nombre}">
                                    <button type="button" class="btn text-white botonComprar" id="${nombre}">Agregar al Carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn text-white ${carritoStorage?.some((e) => e.nombre.replace(/\s+/g, '') === nombre) ? 'botonOscuro' : 'botonModal'}" data-toggle="modal"
                    data-target="#modal${carritoStorage?.some((e) => e.nombre.replace(/\s+/g, '') === nombre) ? '' : nombre}">
                    Comprar ${item.nombre}
                </button>
            </div>`;
    });

    lista.forEach((item) => {
        const nombreJuego = item.nombre.replace(/\s+/g, '');
    
        if (carritoJuegos.some((e) => e.nombre.replace(/\s+/g, '') === nombreJuego)) {
            validarCarrito(nombreJuego, 'Ya esta en el carrito');
        }
        else{
            document.querySelector(`#${nombreJuego}`).addEventListener('click',(event) => {
                const juego = lista.find((e) => e.nombre.replace(/\s+/g, '') === event.target.id)

                carritoJuegos.push(new Carrito(juego.nombre, juego.genero, juego.precio));

                localStorage.setItem('carritoJuegos', JSON.stringify(carritoJuegos));

                validarCarrito(nombreJuego, 'Se agrego al Carrito');

                realizarCompra();

                if (flagCompra != 1){ document.getElementById('tablaCarrito').innerHTML = ``; }
            })
        }
    });
};

/* 
    Recibe como paremetro el id de lista desplegable
*/
const ordenarLista = (filtro) => {
    if (filtro === 'Todo') {
        mostrarBusqueda(listaJuegos);
    }
    else {
        const listaFiltrada = listaJuegos.filter((item) => item.genero === `${filtro}`);
        mostrarBusqueda(listaFiltrada);
    }
};

/* 
    Muestra la tabla con el detalle de la compra
*/
const realizarCompra = () => {
    let carrito = document.getElementById('tablaCarrito');
    let totalCompra = carritoJuegos.reduce((acum, item) => acum + item.precio, 0);
    let carritoJson;

    carrito.innerHTML = ``;
    tablaCarrito = ``;

    tablaCarrito = tablaCarrito + `
        <h2 class="h2Tittle col-12 tituloSeparador text-center text-uppercase text-white mb-3 pt-3 pb-3">Juegos agregados al carrito</h2>
        <table class="table table-striped table-dark col-sm-12 listaJuego">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>`;
    
    carritoJuegos.forEach((e, index) => {
        tablaCarrito = tablaCarrito +  `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${e.nombre}</td>
                    <td>${e.genero}</td>
                    <td>${e.precio} pesos</td>
                </tr>`;
        });

    tablaCarrito = tablaCarrito + `
                <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td>Total + Imp del 30%: ${(totalCompra * 0.30) + totalCompra} pesos</td>
                </tr>
            </tbody>
        </table>
        <div class="col-sm-12 modal-footer d-flex justify-content-start mb-5">
            <button type="button" class="btn text-white botonCarrito" id="comprarJuegos">Comprar</button>
            <button type="button" class="btn text-white botonCarrito" id="cancelarCompra">Cancelar</button>
        </div>`;

    carrito.innerHTML = tablaCarrito;
    
    if(carritoJuegos.length > 0){
        document.getElementById('comprarJuegos').addEventListener('click', () => {
            if (carritoStorage?.length > 0){
                carritoJson = JSON.stringify(carritoJuegos.concat(carritoStorage));
            }
            else{
                carritoJson = JSON.stringify(carritoJuegos);
            }
            localStorage.setItem('juegosComprados', carritoJson);
            localStorage.removeItem('carritoJuegos');

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se realizo la compra',
                showConfirmButton: false,
                timer: 2000
            });

            validarCarrito('comprarJuegos', '');
            carrito.innerHTML = ``;
            carritoJuegos = [];
            flagCompra = 0;
            inicioAPP();
        });
    }
    else{
        validarCarrito('comprarJuegos', '');
    }

    document.getElementById('cancelarCompra').addEventListener('click', () => {
        localStorage.removeItem('carritoJuegos');
        carrito.innerHTML = ``;
        carritoJuegos = [];
        flagCompra = 0;
        mostrarBusqueda(listaJuegos);
    });
};

/* 
    Funcion Principal
*/
const inicioAPP = () => {
    carritoStorage = JSON.parse(localStorage.getItem('juegosComprados'));
    carritoJuegos = localStorage.getItem('carritoJuegos') != null ? JSON.parse(localStorage.getItem('carritoJuegos')) : [];

    document.getElementById('tablaCarrito').innerHTML = ``;

    document.getElementById('itemLista').addEventListener('click', (event) => {
        ordenarLista(event.target.id);
    });

    document.getElementById('busquedaNombre').addEventListener('submit', (event) => {
        event.preventDefault();
        mostrarBusqueda(listaJuegos.filter((e) => e.nombre.toLowerCase().includes(document.getElementById('nombreBusqueda').value.toLowerCase())));
    })
    
    document.getElementById('verCarrito').addEventListener('click', (event) => {
        flagCompra = 1;
        realizarCompra();
    });

    mostrarBusqueda(listaJuegos);
};

/* 
    Arma carrusel de tarjetas
*/
const listarUsuario = () => {
    let carruselUsuario = ``;
    let ini = 0;
    let fin = 4;

    for (let i = 0; i < 4; i++){
        if (i == 0){
            carruselUsuario = carruselUsuario + `
            <div class="carousel-item active">
                <div class="row" id="contenedorUsuarios">`;
        }
        else{
            carruselUsuario = carruselUsuario + `
            <div class="carousel-item">
                <div class="row" id="contenedorUsuarios">`;
        };
        
        for(let y = ini; y < fin; y++){
            carruselUsuario = carruselUsuario + `
                    <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3 contenedorTarjeta">
                        <div class="card d-flex flex-column align-items-center justify-content-evenly tarjeta pt-4 mb-4">
                            <img class="img-fluid w-50 h-50" alt="100%x280" src="${listaUsuarios.results[y].picture.large}">
                            <div class="card-body w-100 h-100 text-center">
                                <h4 class="card-title h4Tittle text-white">${listaUsuarios.results[y].name.first} ${listaUsuarios.results[y].name.last}</h4>
                                <p class="card-text mb-0 text-white"><span class="font-weight-bold">Edad: </span>${listaUsuarios.results[y].dob.age}</p>
                                <p class="card-text text-white"><span class="font-weight-bold">Ciudad: </span> ${listaUsuarios.results[y].location.city}</p>
                            </div>
                        </div>
                    </div>`;
            ini++;
        };
        fin = fin + 4;
        carruselUsuario = carruselUsuario + `
                </div>
            </div>`;
    };
    return carruselUsuario;
};

/* 
    Consulta usuario para armar el carrusel de tarjetas
*/
const cargarListaUsuario = async () => {
    const respuesta = await fetch('https://randomuser.me/api/?results=16&gender=male');
    
    if (respuesta.ok){
        listaUsuarios = await respuesta.json();
        let contenedor = document.getElementById('contenedorUsuarios');
        contenedor.innerHTML = ``;
        contenedor.innerHTML = listarUsuario();
    }
    else{
        const contenedor = document.getElementById('contenedorTarjetas');
        contenedor.innerHTML = ``;
        contenedor.innerHTML = `<p class="text-center dflex justify-content-center w-100 errorMensaje">
                                    <span class="errorMensaje">Se produjo el siguiente error </span>Status: ${respuesta.status} - ${respuesta.statusText}</p>`;
    }
}

/* 
    Carga datos del archivo json, carga el carrusel de usuario y llama a la funcion principal
*/
const cargarLista = async () => {
    const respuesta = await fetch('./juegos.json');
    
    if (respuesta.ok){
        listaJuegos = await respuesta.json();
        cargarListaUsuario();
        inicioAPP();
    }
    else{
        const contenedor = document.getElementById('contenedorTarjetas');
        contenedor.innerHTML = ``;
        contenedor.innerHTML = `<p class="text-center dflex justify-content-center w-100 errorMensaje">
                                    <span class="errorMensaje">Se produjo el siguiente error </span>Status: ${respuesta.status} - ${respuesta.statusText}</p>`;
    }
}

cargarLista();