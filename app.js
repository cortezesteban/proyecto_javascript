// Scritp que simula la compra de video juegos
// En el menu principal se da las opciones de ver la lista completa o hacer una busqueda por tipo de juego
// El juego a comprar se puede asociar a la cuenta que realiza la operacion o como regalo a otra cuenta
// Al finalizar la aplicacion muestra un detalle de la compra.

const OPCION_1 = 1;
const OPCION_2 = 2;
const OPCION_3 = 3;

const CONTINUAR = 'SI';
let total = 0;
const juegosComprados = [];

//Lista de juegos que se ofrecen en la tienda
const listaJuegos = [new Juego(1, 'Dead Read Redemption 2', 430, 'Rockstar Games'),
                     new Juego(2, 'Diablo 4', 480, 'Blizzard Entertainment'),
                     new Juego(3, 'Battlefield 4', 390, 'Electronic Arts'),
                     new Juego(4, 'New World', 510, 'Amazon Game Studios'),
                     new Juego(5, 'No Mans Sky', 300, 'Hello Games'),
                     new Juego(6, 'Overwatch 2', 410, 'Blizzard Entertainment'),
                     new Juego(7, 'World of Warcraft', 430, 'Blizzard Entertainment'),
                     new Juego(8, 'Star Wars Jedi: Survivor', 500, 'Electronic Arts'),
                     new Juego(9, 'Lost Ark', 490, 'Amazon Game Studios')];

//Lista de amigos asociados a la cuenta que realiza la compra
const listaAmigos = [{idAmigo: 1, nombreAmigo: 'Wuetin'},
                     {idAmigo: 2, nombreAmigo: 'Boyken'},
                     {idAmigo: 3, nombreAmigo: 'Tuotiu'},
                     {idAmigo: 4, nombreAmigo: 'Usxovo'},
                     {idAmigo: 5, nombreAmigo: 'Ramuos'}];


//Muestra la lista de amigos cuando el juego es un regalo
const juegoDeRegalo = (opcionJuego) => {
    let opcionAmigo = 0;
    
    do{
        let lista = `Elija un amigo de su lista (Opcion 1, 2, 3, etc): \n\n`;

        for (let i = 0 ; i < listaAmigos.length ; i++) {
            lista = lista + `${listaAmigos[i].idAmigo} - ${listaAmigos[i].nombreAmigo}\n`;
        };

        opcionAmigo = +prompt(lista);

        if(listaAmigos.some((item) => {return item.idAmigo === opcionAmigo})){
            const amigo = listaAmigos.find((item) => {return item.idAmigo === opcionAmigo});
            juegosComprados.push(new Item(opcionJuego, amigo.nombreAmigo));
            respuesta = 'NO';
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
            juegosComprados.push(new Item(juego, 'Cuenta Propia'));
            respuesta = 'NO';
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
        2 - Buscar por Juego \n
        3 - Salir`);

        if(opcion == OPCION_1){
            comprarDeListaCompleta();
        }
        else if(opcion == OPCION_2){
            alert('se eligio opcion 2');
        }
        else if(opcion == OPCION_3){
            alert('Gracias por visitar esta pagina');
        }
        else{
            respuesta = prompt('Opcion incorrecta, Desea volver al menu principal SI/NO');
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
    
    total = juegosComprados.reduce((acum, item) => acum + item.Juego.precio, 0);

    listaCompra = 'Juegos que se van a asociar a tu cuenta \n';
    for (let i = 0 ; i < juegosComprados.length ; i++) {
        if(juegosComprados[i].idAmigo === 'Cuenta Propia'){
            listaCompra = listaCompra + `\tJuego: ${juegosComprados[i].Juego.nombre} - Precio ${juegosComprados[i].Juego.precio} pesos \n`;
        }
    };
    
    listaCompra = listaCompra + '\n\nJuegos que se compran como regalo \n';
    for (let i = 0 ; i < juegosComprados.length ; i++) {
        if(juegosComprados[i].idAmigo !== 'Cuenta Propia'){
            listaCompra = listaCompra + `\tJuego: ${juegosComprados[i].Juego.nombre} - Precio ${juegosComprados[i].Juego.precio} pesos \n`;
        }
    };
    alert(`${listaCompra} \n Total a pagar: ${total}`);
}

inicioApp();