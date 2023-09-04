// Scritp que simula la compra de video juegos
// En el menu se visualizan los juegos con el precio, el usuario elije el juego y a posterior la cantidad de copias
// Al finalizar la aplicacion muestra el monto total y cantidad total de juegos.

const JUEGO_1 = 'Dead Read Redemption 2';
const PRECIO_JUEGO_1 = 430;
const ID_JUEGO_1 = 1;

const JUEGO_2 = 'Diablo 4';
const PRECIO_JUEGO_2 = 480;
const ID_JUEGO_2 = 2;

const JUEGO_3 = 'Battlefield 4';
const PRECIO_JUEGO_3 = 390;
const ID_JUEGO_3 = 3;

const JUEGO_4 = 'New World';
const PRECIO_JUEGO_4 = 510;
const ID_JUEGO_4 = 4;

const CONTINUAR = 'SI';

let respuesta;
let cantidadTotal = 0;
let idJuego;
let total = 0;

const calculaOperacion = (opcionJuego, precioTotal) => {
    let cantidadCopias = 0;

    switch (opcionJuego) {
        case ID_JUEGO_1:
            cantidadCopias = +prompt(`Cuantas copias desea comprar del juego ${JUEGO_1}`);
            precioTotal = (PRECIO_JUEGO_1 * cantidadCopias) + precioTotal;
            cantidadTotal = cantidadTotal + cantidadCopias;
            return precioTotal;
        case ID_JUEGO_2:
            cantidadCopias = +prompt(`Cuantas copias desea comprar del juego ${JUEGO_2}`);
            precioTotal = (PRECIO_JUEGO_2 * cantidadCopias) + precioTotal;
            cantidadTotal = cantidadTotal + cantidadCopias;
            return precioTotal;
        case ID_JUEGO_3:
            cantidadCopias = +prompt(`Cuantas copias desea comprar del juego ${JUEGO_3}`);
            precioTotal = (PRECIO_JUEGO_3 * cantidadCopias) + precioTotal;
            cantidadTotal = cantidadTotal + cantidadCopias;
            return precioTotal;
        case ID_JUEGO_4:
            cantidadCopias = +prompt(`Cuantas copias desea comprar del juego ${JUEGO_4}`);
            precioTotal = (PRECIO_JUEGO_4 * cantidadCopias) + precioTotal;
            cantidadTotal = cantidadTotal + cantidadCopias;
            return precioTotal;
        default:
            break;
    }
}

do{
    idJuego = +prompt(`Elija el Juego que desea comprar (Opcion 1, 2, 3, etc): \n
    1 - ${JUEGO_1} - Precio ${PRECIO_JUEGO_1} pesos \n
    2 - ${JUEGO_2} - Precio ${PRECIO_JUEGO_2} pesos \n
    3 - ${JUEGO_3} - Precio ${PRECIO_JUEGO_3} pesos \n
    4 - ${JUEGO_4} - Precio ${PRECIO_JUEGO_4} pesos \n`);

    if(idJuego == ID_JUEGO_1 || idJuego == ID_JUEGO_2 || idJuego == ID_JUEGO_3 || idJuego == ID_JUEGO_4){
        total = calculaOperacion(idJuego, total);
        respuesta = prompt('Desea comprar otro juego si/no');
    }
    else{
        respuesta = prompt('Opcion incorrecta, Desea volver al menu principal SI/NO');
    }

}while(respuesta.toUpperCase() == CONTINUAR);

alert(`Cantidad de juego comprados ${cantidadTotal}, total ${total} pesos`);