
const divMatriz = document.querySelector("#matriz");
const pResultado1 = document.querySelector("#resultado1");
const pResultado2 = document.querySelector("#resultado2");



const imagenes = [
    "https://cdn.shopify.com/s/files/1/0530/8517/5981/files/ShopByTitle-TJ.png?v=1654799164",
    "https://th.bing.com/th/id/OIP.3CEO2NHd_Yo-1GQ37KnQuQAAAA?pid=ImgDet&w=186&h=279&c=7",
    "https://th.bing.com/th/id/OIP.j0CgnfgcErDNHa058lmotwHaHa?pid=ImgDet&w=186&h=186&c=7",
    "https://th.bing.com/th/id/OIP.H_O_NixMS99jqpxEt1LgbQHaGP?w=199&h=180&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.DORBGjJbeD_gc5lF6lawGgHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/R.26b32043d1bef08bfc049c3fe0002518?rik=A02hhw311Qm%2f4g&riu=http%3a%2f%2f3.bp.blogspot.com%2f_uGq8SSLyPqI%2fTEiclC0saeI%2fAAAAAAAAAEQ%2folzUNJBzfKA%2fs1600%2fTom-and-Jerry-1-1NPDHNRYGS-1024x768.jpg&ehk=2x7JH0Z5XTU8DJrWeiEc%2ftgCjpltMw4Ate9G2NVl06U%3d&risl=&pid=ImgRaw&r=0",

]

const imagenesContador = {};
/* imagenesContador realiza un seguimiento del número de veces que se ha mostrado cada imagen en el tablero. */


let clicks = 0;
let ElementoSeleccionado = 0;

function inicializarContador() {
    imagenes.forEach((imagen) => {
        imagenesContador[imagen] = 0;
    });
}

function generar() {
    const MAX_FILA = 3;
    const MAX_COL = 4;
    
    inicializarContador();
    aciertos = 0 + 1;


    divMatriz.innerHTML = "";

    for (let fila = 0; fila < MAX_FILA; fila++) {
        divMatriz.innerHTML += `
            <div class="row">
                ${agregarColumna()}
            </div>
        `;
    }

    function agregarColumna() {
        let columnas = "";

        for (let col = 0; col < MAX_COL; col++) {
            const imgAleatoria = obtenerImagenAleatoria();
            columnas += `
                <div onclick="seleccionar(this)" data-imagen="${imgAleatoria}" class="col casilla">
                </div>
            `;
        }

        return columnas;
    }
/* La función obtenerImagenAleatoria filtra las imágenes que no se han mostrado más de dos veces y elige aleatoriamente una de las imágenes disponibles. Luego, al hacer clic en un elemento del tablero, se muestra la imagen correspondiente y se actualiza el contador. Esto garantiza que nunca se muestren más de dos imágenes idénticas en el tablero. */
    function obtenerImagenAleatoria() {
        const imagenesDisponibles = imagenes.filter((imagen) => imagenesContador[imagen] < 2);
        const imgAleatoria = imagenesDisponibles[Math.floor(Math.random() * imagenesDisponibles.length)];

        imagenesContador[imgAleatoria]++;

        return imgAleatoria;
    }
}

/* getAttribute se utiliza para conocer la URL de la imagen que se debe mostrar en la casilla cuando el jugador hace clic  */

function seleccionar(elemento) {

    const imgURL = elemento.getAttribute("data-imagen");
    elemento.innerHTML = `<img class="col casilla" src="${imgURL}" alt=""></img>`;


    if (clicks < 2) {
        if (ElementoSeleccionado === 0) {
            ElementoSeleccionado = elemento;
        } else {
            if (ElementoSeleccionado.getAttribute("data-imagen") === imgURL) {

                setTimeout(() => {
                    pResultado1.innerHTML = "Aciertos: " + (aciertos++);
                    const TOTAL_ACIERTOS = 7;
                    if (aciertos === TOTAL_ACIERTOS) {
                        pResultado1.innerHTML = "FELICITACIONES GANASTE"
                        pResultado2.innerHTML = `
                        <button onclick="VolveAJugar()">Volver a Jugar</button>
                        <button onclick="Retomar jugada()">Retomar Jugada</button>
                        `
                    }
                }, 100);
                ElementoSeleccionado = 0;
            } else {

                setTimeout(() => {
                    ElementoSeleccionado.innerHTML = "";
                    elemento.innerHTML = "";
                    ElementoSeleccionado = 0;
                }, 500);
            }
            clicks = 0;
        }


    }

}

function VolveAJugar() {
    pResultado1.innerHTML = "Aciertos:";
    pResultado2.innerHTML = "";
    generar()
}
