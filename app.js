const listaJuegos = [new Juego('Elden Ring', 430, 'Rockstar Games', 'Accion', './assets/img/elden_ring_recomendado.jpg', 'Red Dead Redemption 2 es un juego de acción y aventuras de temática occidental . Jugado desde una perspectiva en primera o tercera persona, el juego está ambientado en un entorno de mundo abierto que presenta una versión ficticia de los Estados Unidos en 1899.'),
                     new Juego('Valheim', 480, 'Iron Gate Studio', 'Supervivencia', './assets/img/valheim_recomendado.jpg', 'Valheim tiene lugar en un mundo donde los vikingos asesinados van a demostrar que son aptos para los pasillos de Valhalla . Como tal, el jugador comienza sin nada y pronto descubre que para llegar al más allá nórdico, debe derrotar a los males que acechan a Valheim. Guiado únicamente por sus instintos y las pistas ocasionales de un cuervo.'),
                     new Juego('RDR 2', 460, 'Rockstar Games', 'Aventura', './assets/img/rdr2_recomendado.jpg', 'Red Dead Redemption 2 es un juego de acción y aventuras de temática occidental . Jugado desde una perspectiva en primera o tercera persona, el juego está ambientado en un entorno de mundo abierto que presenta una versión ficticia de los Estados Unidos en 1899.'),
                     new Juego('Factorio', 510, 'Wube Software', 'Estrategia', './assets/img/factorio_recomendado.jpg', 'Factorio es un videojuego de estrategia en tiempo real desarrollado por Wube Software. Ha estado disponible como videojuego de acceso anticipado desde 2013 y ha sido lanzado oficialmente el 14 de agosto de 2020.'),
                     new Juego('New World', 530, 'Amazon Game Studios', 'Rol', './assets/img/new_world_recomendado.jpg', 'New World es un videojuego de rol multijugador masivo en línea desarrollado por Amazon Game Studios. Ambientado a mediados del siglo XVII, los jugadores tendrán la tarea de colonizar tierras modeladas a imagen y semejanza de la América Británica oriental.'),
                     new Juego('Project Zomboid', 390, 'The Indie Stone', 'Supervivencia', './assets/img/project_zomboid_recomendados.jpg', 'En Project Zomboid , el jugador tiene como objetivo sobrevivir el mayor tiempo posible en un área apocalíptica y plagada de zombis alrededor de la ciudad de Louisville, Kentucky , conocida como Knox Country, que ha sido puesta en cuarentena por el gobierno.'),
                     new Juego('No Man Sky', 390, 'Hello Games', 'Aventura', './assets/img/no_man_sky_recomendado.jpg', 'No Mans Sky es un juego de ciencia ficción y aventura desarrollado por Hello Games. Contará con niveles generados proceduralmente, y nos dejará explorar planetas, océanos, batallas en el espacio y luchar contra depredadores. Cada mundo tendrá su propio ecosistema, con mundos de todo tipo, desde entornos desérticos hasta lugares boscosos.'),
                     new Juego('Star Wars Jedi', 390, 'Respawn Entertainment', 'Accion', './assets/img/star_wars_jedi_survivor_recomendado.webp', 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order y acompañaremos a Cal en su lucha cada vez más desesperada mientras la galaxia se hunde en la oscuridad'),
                     new Juego('Assassins Creed Odyssey', 390, 'Ubisoft Quebec', 'Aventura', './assets/img/assassins_creed _odyssey.jpg', 'Assassin Creed Odyssey es la nueva entrega de la saga de Assassin Creed tras Assassin Creed Origins. Desarrollada por Ubisoft Quebec, se trata de una vuelta de tuerca a la habitual propuesta de acción y aventura en mundo abierto de la serie, apostando en esta ocasión por una ambientación en la Antigua Grecia y un estilo de videojuego más enfocado al rol'),
                     new Juego('Battlefield 4', 390, 'EA Games', 'Disparos', './assets/img/battlefield_4.jpg', 'Esta ocasión llevará al jugador a diferentes enclaves en Oriente. El nuevo Frostbite 3 promete un nivel gráfico y destructivo a gran escala pensando también en ver la guerra con gran realismo. Con el denominado "Levolution" la partida irá cambiando con la forma de avanzar de cada jugador.'),
                     new Juego('Cities Skylines', 390, ' Colossal Order', 'Estrategia', './assets/img/cities_skylines.png', 'El juego es una simulación de construcción de ciudades abierta para un solo jugador. Los jugadores participan en la planificación urbana controlando la zonificación, la ubicación de las carreteras, los impuestos, los servicios públicos y el transporte público de un área'),
                     new Juego('Counter Strike', 390, 'Valve', 'Disparos', './assets/img/counterstrike.jpg', 'Counter-Strike es la nueva versión del emblemático shooter competitivo de Valve. Se trata de un juego que llega para sustituir a CS:GO contando con el motor Source 2 e importantes cambios en físicas, humos, mecánicas de disparo, estabilidad de servidores, mapas modificados o reconstruidos desde cero y un nuevo sistema competitivo')];

const mostrarBusqueda = (lista) => {
    const contenedor = document.getElementById('contenedorTarjetas');
    contenedor.innerHTML = ``;

    lista.forEach((item) => {
        let nombre = item.nombre.replace(/\s+/g, '');

        contenedor.innerHTML = contenedor.innerHTML + `
            <div class="card col-4 mt-2 pb-2">
                <div class="d-flex flex-column align-items-center justify-content-evenly p-2">
                    <img class="imgInicio" src="${item.imagen}">
                    <div class="modal fade" id="modal${nombre}" tabindex="-1" role="dialog"
                        aria-labelledby="modal${nombre}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable d-flex justify-content-center align-items-center"
                            role="document">
                            <div class="modal-content w-75 modalColor text-white">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modal${nombre}Title">${item.nombre}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div
                                    class="modal-body d-flex flex-column justify-content-center align-items-center">
                                    <img class="imgInicio " src="${item.imagen}" alt="Juego ${item.nombre}"/>
                                    <p class="text-justify">${item.descripcion}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn text-white botonModal" data-toggle="modal"
                    data-target="#modal${nombre}">
                    Comprar ${item.nombre}
                </button>
            </div>`;
    });
};

const ordenarLista = (filtro) => {
    if (filtro === 'Todo') {
        mostrarBusqueda(listaJuegos);
    }
    else {
        const listaFiltrada = listaJuegos.filter((item) => item.genero === `${filtro}`);
        mostrarBusqueda(listaFiltrada);
    }
};

document.getElementById('itemLista').addEventListener('click', (event) => {
    ordenarLista(event.target.id);
});

const inicioAPP = () => {
    mostrarBusqueda(listaJuegos);
};

inicioAPP();

