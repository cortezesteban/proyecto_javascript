// Scritp que simula la compra de video juegos
// En el menu se visualizan los juegos con el precio, el usuario elije el juego y a posterior la cantidad de copias
// Al finalizar la aplicacion muestra el monto total y cantidad total de juegos.

const OPCION_1 = 1;
const OPCION_2 = 2;
const OPCION_3 = 3;

const CONTINUAR = 'SI';
let total = 0;
const juegosComprados = [];

const listaJuegos = [new Juego(1, 'Dead Read Redemption 2', 430, 'Rockstar Games'),
                     new Juego(2, 'Diablo 4', 480, 'Blizzard Entertainment'),
                     new Juego(3, 'Battlefield 4', 390, 'Electronic Arts'),
                     new Juego(4, 'New World', 510, 'Amazon Game Studios'),
                     new Juego(5, 'No Mans Sky', 300, 'Hello Games'),
                     new Juego(6, 'Overwatch 2', 410, 'Blizzard Entertainment'),
                     new Juego(7, 'World of Warcraft', 430, 'Blizzard Entertainment'),
                     new Juego(8, 'Star Wars Jedi: Survivor', 500, 'Electronic Arts'),
                     new Juego(9, 'Lost Ark', 490, 'Amazon Game Studios')];

const listaAmigos = [{idAmigo: 1, nombreAmigo: 'Wuetin'},
                     {idAmigo: 2, nombreAmigo: 'Boyken'},
                     {idAmigo: 3, nombreAmigo: 'Tuotiu'},
                     {idAmigo: 4, nombreAmigo: 'Usxovo'},
                     {idAmigo: 5, nombreAmigo: 'Ramuos'}];

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

const asociarJuego = (opcionJuego) => {
    let opcionCuentaRegalo = 0;
    let respuesta = 'NO';

    const juego = listaJuegos.find((item) => {return item.idJuego === opcionJuego});

    do{
        opcionCuentaRegalo = +prompt(`Asociar ${juego.nombre} a: \n 
            1 - Mi Cuenta
            2 - Se trata de un regalo`);

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
            total = asociarJuego(opcionJuego, total);
            respuesta = prompt('Desea comprar otro juego si/no');
        }
        else{
            alert('Opcion incorrecta, seleccione una opcion de la lista');
            respuesta = 'SI';
        }
    }while(respuesta.toUpperCase() == CONTINUAR);
}

const inicioApp = () => {
    let respuesta = 'NO';
    let opcion = 0;
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
}

inicioApp();