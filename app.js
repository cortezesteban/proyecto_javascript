/* 
    - La App simula una pagina para comprar Video Juegos
    - Los juegos seleccionados se agregan al Local Storage 'carritoJuegos' que, se existe hasta que se compre el juego
    - Los juegos comprados se agregan Local Storage 'juegosComprados' que, se usa para simular la persistencia de los juegos 
      que se compran (biblioteca), los juegos comprados se marcan, para que al recargar la pagina no se puedan volver a comprar.
*/

const listaJuegos = [new Juego('Elden Ring', 430, 'Rockstar Games', 'Accion', './assets/img/elden_ring_recomendado.jpg', 'Red Dead Redemption 2 es un juego de acción y aventuras de temática occidental . Jugado desde una perspectiva en primera o tercera persona, el juego está ambientado en un entorno de mundo abierto que presenta una versión ficticia de los Estados Unidos en 1899.'),
                     new Juego('Valheim', 480, 'Iron Gate Studio', 'Supervivencia', './assets/img/valheim_recomendado.jpg', 'Valheim tiene lugar en un mundo donde los vikingos asesinados van a demostrar que son aptos para los pasillos de Valhalla . Como tal, el jugador comienza sin nada y pronto descubre que para llegar al más allá nórdico, debe derrotar a los males que acechan a Valheim. Guiado únicamente por sus instintos y las pistas ocasionales de un cuervo.'),
                     new Juego('RDR 2', 460, 'Rockstar Games', 'Aventura', './assets/img/rdr2_recomendado.jpg', 'Red Dead Redemption 2 es un juego de acción y aventuras de temática occidental . Jugado desde una perspectiva en primera o tercera persona, el juego está ambientado en un entorno de mundo abierto que presenta una versión ficticia de los Estados Unidos en 1899.'),
                     new Juego('Factorio', 510, 'Wube Software', 'Estrategia', './assets/img/factorio_recomendado.jpg', 'Factorio es un videojuego de estrategia en tiempo real desarrollado por Wube Software. Ha estado disponible como videojuego de acceso anticipado desde 2013 y ha sido lanzado oficialmente el 14 de agosto de 2020.'),
                     new Juego('New World', 530, 'Amazon Game Studios', 'Rol', './assets/img/new_world_recomendado.jpg', 'New World es un videojuego de rol multijugador masivo en línea desarrollado por Amazon Game Studios. Ambientado a mediados del siglo XVII, los jugadores tendrán la tarea de colonizar tierras modeladas a imagen y semejanza de la América Británica oriental.'),
                     new Juego('Project Zomboid', 430, 'The Indie Stone', 'Supervivencia', './assets/img/project_zomboid_recomendados.jpg', 'En Project Zomboid , el jugador tiene como objetivo sobrevivir el mayor tiempo posible en un área apocalíptica y plagada de zombis alrededor de la ciudad de Louisville, Kentucky , conocida como Knox Country, que ha sido puesta en cuarentena por el gobierno.'),
                     new Juego('No Man Sky', 540, 'Hello Games', 'Aventura', './assets/img/no_man_sky_recomendado.jpg', 'No Mans Sky es un juego de ciencia ficción y aventura desarrollado por Hello Games. Contará con niveles generados proceduralmente, y nos dejará explorar planetas, océanos, batallas en el espacio y luchar contra depredadores. Cada mundo tendrá su propio ecosistema, con mundos de todo tipo, desde entornos desérticos hasta lugares boscosos.'),
                     new Juego('Star Wars Jedi', 550, 'Respawn Entertainment', 'Accion', './assets/img/star_wars_jedi_survivor_recomendado.webp', 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order y acompañaremos a Cal en su lucha cada vez más desesperada mientras la galaxia se hunde en la oscuridad'),
                     new Juego('Assassins Creed Odyssey', 600, 'Ubisoft Quebec', 'Aventura', './assets/img/assassins_creed _odyssey.jpg', 'Assassin Creed Odyssey es la nueva entrega de la saga de Assassin Creed tras Assassin Creed Origins. Desarrollada por Ubisoft Quebec, se trata de una vuelta de tuerca a la habitual propuesta de acción y aventura en mundo abierto de la serie, apostando en esta ocasión por una ambientación en la Antigua Grecia y un estilo de videojuego más enfocado al rol'),
                     new Juego('Battlefield 4', 590, 'EA Games', 'Disparos', './assets/img/battlefield_4.jpg', 'Esta ocasión llevará al jugador a diferentes enclaves en Oriente. El nuevo Frostbite 3 promete un nivel gráfico y destructivo a gran escala pensando también en ver la guerra con gran realismo. Con el denominado "Levolution" la partida irá cambiando con la forma de avanzar de cada jugador.'),
                     new Juego('Cities Skylines', 560, ' Colossal Order', 'Estrategia', './assets/img/cities_skylines.png', 'El juego es una simulación de construcción de ciudades abierta para un solo jugador. Los jugadores participan en la planificación urbana controlando la zonificación, la ubicación de las carreteras, los impuestos, los servicios públicos y el transporte público de un área'),
                     new Juego('Counter Strike', 500, 'Valve', 'Disparos', './assets/img/counterstrike.jpg', 'Counter-Strike es la nueva versión del emblemático shooter competitivo de Valve. Se trata de un juego que llega para sustituir a CS:GO contando con el motor Source 2 e importantes cambios en físicas, humos, mecánicas de disparo, estabilidad de servidores, mapas modificados o reconstruidos desde cero y un nuevo sistema competitivo'),
                     new Juego('Grim Dawn', 520, 'Crate Entertainment', 'Rol', './assets/img/grim_dawn.jfif', 'Grim Dawn es un juego de rol y acción con elementos de crafting en el que tendremos que sobrevivir en un mundo posapocalíptico en el que la humanidad está al borde de la extinción, y en el que la magia, ha vuelto a surgir.'),
                     new Juego('Diablo IV', 680, 'Blizzard Entertainment', 'Rol', './assets/img/diablo_4.jpg', 'Diablo 4 es la cuarta entrega de la saga de acción y rol de Blizzard, toda una institución del mundo del videojuego. En esta ocasión volverá a sus raíces, presentándonos un mundo de terror gótico y de fantasía oscura, devolviéndonos la lucha constante contra los demonios y las criaturas que se esconden en el inframundo.'),
                     new Juego('World of Warcraft', 610, 'Blizzard Entertainment', 'Rol', './assets/img/World_of_Warcraft.jpg', 'World of Warcraft: Classic es la versión clásica del videojuego de rol multijugador de Blizzard. El objetivo principal de la compañía es no ofrecer exactamente la versión original de 2005, sino la versión más refinada posible de esa experiencia original, pues consideran que será también la más divertida e interesante para los jugadores nostálgicos y curiosos.'),
                     new Juego('Monster Hunter', 620, 'Niantic y Capcom', 'Accion', './assets/img/monster_hunter.jpg', 'Monster Hunter World es el retorno de la serie a las consolas de sobremesa, permitiéndonos cazar criaturas gigantes en un entorno salvaje, ya sea en solitario o con tres cazadores con un nuevo sistema multijugador drop-in que permite cooperativo entre regiones.'),
                     new Juego('Call of Duty', 380, 'Infinity Ward', 'Disparos', './assets/img/Call_Of_Duty.jpg', 'Call of Duty: Modern Warfare 2 Remastered es la remasterización del shooter en primera persona de Activision. El videojuego ha sido actualizado por Beenox e incluye exclusivamente el modo campaña del juego original de 2009, ni su modo online ni las experiencias Spec Ops. En su momento fue un juego espectacular que repitió -e incluso superó- el éxito del primer Modern Warfare'),
                     new Juego('Age of Empires II', 370, 'Forgotten Empires', 'Estrategia', './assets/img/Age2.webp', 'Age of Empires II: Definitive Edition celebra el vigésimo aniversario de una de las sagas de estrategia más populares y queridas del ocio digital, presentando ahora sus gráficos en 4K, remasterizando su audio y los efectos sonoros y estrenando una campaña nueva llamada The Last Khans.')];

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
    Marca los juegos comprados que estan en el Storage
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
    Recibe como paremetro la lista que se quiere mostrar
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
        <h2 class="h2Tittle col-12 listaJuego text-center text-uppercase text-white mb-5 pt-4 pb-4 bg-danger">Juegos agregados al carrito</h2>
        <table class="table table-striped table-dark col-sm-12">
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
            alert('Se realizo la compra');
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
    Inicio de la App
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

inicioAPP();
