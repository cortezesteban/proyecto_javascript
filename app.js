// Scritp que simula la compra de video juegos
// En el menu principal se da las opciones de ver la lista completa o hacer una busqueda por genero de juego
// El juego a comprar se puede asociar a la cuenta que realiza la operacion o como regalo a otra cuenta
// Al finalizar la aplicacion muestra un detalle de la compra.

const OPCION_1 = 1;
const OPCION_2 = 2;
const OPCION_3 = 3;
const OPCION_4 = 4;
const OPCION_5 = 5;
const OPCION_6 = 6;

const CONTINUAR = 'SI';
let total = 0;
const juegosComprados = [];

//Lista de juegos que se ofrecen en la tienda
const listaJuegos = [new Juego(1, 'Dead Read Redemption 2', 430, 'Rockstar Games', 'Accion'),
                     new Juego(2, 'Diablo 4', 480, 'Blizzard Entertainment', 'Rol'),
                     new Juego(3, 'Battlefield 4', 390, 'Electronic Arts', 'Disparos'),
                     new Juego(4, 'New World', 510, 'Amazon Game Studios', 'Rol'),
                     new Juego(5, 'No Mans Sky', 300, 'Hello Games', 'Aventura'),
                     new Juego(6, 'Overwatch 2', 410, 'Blizzard Entertainment', 'Disparos'),
                     new Juego(7, 'World of Warcraft', 430, 'Blizzard Entertainment', 'Rol'),
                     new Juego(8, 'Star Wars Jedi: Survivor', 500, 'Electronic Arts', 'Accion'),
                     new Juego(9, 'Project Zomboid', 380, 'The Indie Stone', 'Supervivencia'),
                     new Juego(10, 'Age of Empire', 450, 'Relic Entertainment', 'Estrategia'),
                     new Juego(11, 'Assassins Creed Odyssey', 560, 'Ubisoft', 'Accion'),
                     new Juego(12, 'Cities: Skylines', 400, 'Colossal Order', 'Estrategia'),
                     new Juego(13, 'Counter-Strike', 320, 'Valve', 'Disparos')];

//Lista de amigos asociados a la cuenta que realiza la compra
const listaAmigos = [{idAmigo: 1, nombreAmigo: 'Wuetin'},
                     {idAmigo: 2, nombreAmigo: 'Boyken'},
                     {idAmigo: 3, nombreAmigo: 'Tuotiu'},
                     {idAmigo: 4, nombreAmigo: 'Usxovo'},
                     {idAmigo: 5, nombreAmigo: 'Ramuos'}];


//Muestra la lista de amigos cuando el juego es un regalo
const juegoDeRegalo = (opcionJuego) => {
    let opcionAmigo = 0;
    let lista = '';
    let amigo = {};
    
    console.log(opcionJuego);

    do{
        lista = `Elija un amigo de su lista (Opcion 1, 2, 3, etc): \n\n`;

        for (let i = 0 ; i < listaAmigos.length ; i++) {
            lista = lista + `${listaAmigos[i].idAmigo} - ${listaAmigos[i].nombreAmigo}\n`;
        };

        opcionAmigo = +prompt(lista);

        if(listaAmigos.some((item) => {return item.idAmigo === opcionAmigo})){
            amigo = listaAmigos.find((item) => {return item.idAmigo === opcionAmigo});
            if(juegosComprados.some((item) => {return (item.Juego.nombre === opcionJuego.nombre && item.idAmigo === amigo.nombreAmigo)})){
                alert(`Ya le regalaste este juego a ${amigo.nombreAmigo}`);
                respuesta = 'NO';
            }
            else{
                juegosComprados.push(new Item(opcionJuego, amigo.nombreAmigo));
                respuesta = 'NO';
            }
        }
        else{
            alert('Opcion incorrecta, seleccione una opcion de la lista');
            respuesta = 'SI';
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
}

//Valida si el juego se va a asociar a la cuenta del usuario o es un regalo
const asociarJuego = (opcionJuego) => {
    let opcionCuentaRegalo = 0;
    let respuesta = 'NO';

    const juego = listaJuegos.find((item) => {return item.idJuego === opcionJuego});

    do{
        opcionCuentaRegalo = +prompt(`Asociar ${juego.nombre} a: \n 1 - Mi Cuenta \n 2 - Se trata de un regalo`);

        if(opcionCuentaRegalo == OPCION_1){
            if(juegosComprados.some((item) => {return (item.Juego.idJuego === opcionJuego && item.idAmigo === 'Cuenta Propia')})){
                alert('Este juego ya esta en tu biblioteca');
                respuesta = 'NO';
            }
            else{
                juegosComprados.push(new Item(juego, 'Cuenta Propia'));
                respuesta = 'NO';
            }
        }
        else if(opcionCuentaRegalo == OPCION_2){
            juegoDeRegalo(juego);
        }
        else{
            alert('Opcion incorrecta, seleccione una opcion de la lista');
            respuesta = 'SI';
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
}

//Muestra lista completa de Juegos
const comprarDeListaCompleta = () => {
    let opcionJuego = 0;
    let respuesta = 'NO';
    let lista = '';

    do{
        lista = `Elija el Juego que desea comprar (Opcion 1, 2, 3, etc): \n\n`;
        for (let i = 0 ; i < listaJuegos.length ; i++) {
            lista = lista + `${listaJuegos[i].idJuego} - ${listaJuegos[i].nombre} - Precio ${listaJuegos[i].precio} pesos \n`;
        };

        opcionJuego = +prompt(lista);

        if (listaJuegos.some((item) => {return item.idJuego === opcionJuego})){
            asociarJuego(opcionJuego);
            respuesta = prompt('Desea comprar otro juego si/no');
        }
        else{
            alert('Opcion incorrecta, seleccione una opcion de la lista');
            respuesta = 'SI';
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
}

//devuelve los juegos por filtro
const listaJuegosPorFiltro = (filtro) => {
    return listaJuegos.filter((item) => item.genero === `${filtro}`);
}

//Muestra lista de juegos por genero
const comprarDeListaPorGenero = () => {
    let opcionJuego = 0;
    let respuesta = 'NO';
    let listaGenero = '';
    let lista = '';

    do{
        opcionJuego = +prompt(`Elija algun Genero (Opcion 1, 2, 3, etc):
 1 - Rol \n 2 - Accion \n 3 - Aventura \n 4 - Disparos \n 5 - Estrategia \n 6 - Supervivencia`);

        switch (opcionJuego) {
            case OPCION_1:
                listaGenero = listaJuegosPorFiltro('Rol');
                break;
            case OPCION_2:
                listaGenero = listaJuegosPorFiltro('Accion');
                break;
            case OPCION_3:
                listaGenero = listaJuegosPorFiltro('Aventura');
                break;
            case OPCION_4:
                listaGenero = listaJuegosPorFiltro('Disparos');
                break;
            case OPCION_5:
                listaGenero = listaJuegosPorFiltro('Estrategia');
                break;
            case OPCION_6:
                listaGenero = listaJuegosPorFiltro('Supervivencia');
                break;
            default:
                alert('Opcion incorrecta, seleccione una opcion de la lista');
                respuesta = 'SI';
                break;
        }
    }while(respuesta.toUpperCase() == CONTINUAR)

    do{
        lista = `Elija el Juego que desea comprar (Opcion 1, 2, 3, etc): \n\n`;
        for (let i = 0 ; i < listaGenero.length ; i++) {
            lista = lista + `${listaGenero[i].idJuego} - ${listaGenero[i].nombre} - ${listaGenero[i].genero} - Precio ${listaGenero[i].precio} pesos \n`;
        };

        opcionJuego = +prompt(lista);

        if (listaGenero.some((item) => {return item.idJuego === opcionJuego})){
            asociarJuego(opcionJuego);
            respuesta = prompt('Desea comprar otro juego si/no');
        }
        else{
            alert('Opcion incorrecta, seleccione una opcion de la lista');
            respuesta = 'SI';
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
}

//Menu de Inicio
// - Muetra las opciones de ordenamiento de los Juegos
// - Muestra detalle de compra y total
const inicioApp = () => {
    let respuesta = 'NO';
    let opcion = 0;
    let listaCompra = '';

    do{
        opcion = +prompt(`Bienvenido al menu de compra, Elija una opcion (1, 2, 3, etc): \n
        1 - Mostrar Lista Completa de Juegos \n
        2 - Buscar por Genero de Video Juego \n
        3 - Salir`);
        
        switch (opcion) {
            case OPCION_1:
                comprarDeListaCompleta();
                respuesta = 'SI';
                break;
            case OPCION_2:
                comprarDeListaPorGenero();
                respuesta = 'SI'; 
                break;
            case OPCION_3:
                respuesta = 'NO';
                break;
        }
    
    }while(respuesta.toUpperCase() == CONTINUAR);
    
    total = juegosComprados.reduce((acum, item) => acum + item.Juego.precio, 0);
    total = total + (total * 0.3);

    //lista los juegos - cuenta propia
    listaCompra = 'Juegos que se van a asociar a tu cuenta: \n';
    for (let i = 0 ; i < juegosComprados.length ; i++) {
        if(juegosComprados[i].idAmigo === 'Cuenta Propia'){
            listaCompra = listaCompra + `\t\t ${juegosComprados[i].Juego.nombre} - ${juegosComprados[i].Juego.genero} - Precio ${juegosComprados[i].Juego.precio} pesos \n`;
        }
    };
    
    //lista los juegos de regalo
    listaCompra = listaCompra + '\n\nJuegos que se compran como regalo: \n';
    for (let i = 0 ; i < juegosComprados.length ; i++) {
        if(juegosComprados[i].idAmigo !== 'Cuenta Propia'){
            listaCompra = listaCompra + `\t\t ${juegosComprados[i].Juego.nombre} - ${juegosComprados[i].Juego.genero} - Amigo: ${juegosComprados[i].idAmigo} - Precio ${juegosComprados[i].Juego.precio} pesos \n`;
        }
    };
    alert(`${listaCompra} \nTotal a pagar con un impuesto del 30%: ${total} pesos`);
}

inicioApp();