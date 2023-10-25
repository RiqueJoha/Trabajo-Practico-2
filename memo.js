
const divMatriz = document.querySelector("#matriz");
const pResultado1 = document.querySelector("#resultado1");
const pResultado2 = document.querySelector("#resultado2");

const CLAVE_ACIERTOS = "lista de aciertos";
const CLAVE_IMAGENES = "lista de imagenes";

let listaAciertos = "lista vacía";
let listaImagenes = "lista vacía";

const imagenes = [
    "https://cdn.shopify.com/s/files/1/0530/8517/5981/files/ShopByTitle-TJ.png?v=1654799164",
    "https://th.bing.com/th/id/OIP.3CEO2NHd_Yo-1GQ37KnQuQAAAA?pid=ImgDet&w=186&h=279&c=7",
    "https://th.bing.com/th/id/OIP.j0CgnfgcErDNHa058lmotwHaHa?pid=ImgDet&w=186&h=186&c=7",
    "https://th.bing.com/th/id/OIP.H_O_NixMS99jqpxEt1LgbQHaGP?w=199&h=180&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.DORBGjJbeD_gc5lF6lawGgHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/R.26b32043d1bef08bfc049c3fe0002518?rik=A02hhw311Qm%2f4g&riu=http%3a%2f%2f3.bp.blogspot.com%2f_uGq8SSLyPqI%2fTEiclC0saeI%2fAAAAAAAAAEQ%2folzUNJBzfKA%2fs1600%2fTom-and-Jerry-1-1NPDHNRYGS-1024x768.jpg&ehk=2x7JH0Z5XTU8DJrWeiEc%2ftgCjpltMw4Ate9G2NVl06U%3d&risl=&pid=ImgRaw&r=0",

]

const TOTAL_ACIERTOS = 6;
let ImgSeleccionada = 0;
let clicks = 0;
let aciertos = 0;
listaAciertos = [];
listaImagenes = [];

function ContadorImg() {
    imagenes.forEach((imagen) => {
        imagenes[imagen] = 0;
    });
}

function generar() {
    const MAX_FILA = 3;
    const MAX_COL = 4;
    pResultado2.innerHTML=""


    ContadorImg();

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
    /* La función obtenerImagenAleatoria filtra las imágenes que no se han mostrado más de dos veces y elige aleatoriamente una de las imágenes disponibles. Luego, al hacer clic en un elemento del tablero, se muestra la imagen correspondiente y se actualiza el contador. Esto garantiza que nunca se muestren más de dos imágenes idénticas en el tablero. */
    function obtenerImagenAleatoria() {
        const imgDisp = imagenes.filter((imagen) => imagenes[imagen] < 2);
        const imgAleatoria = imgDisp[Math.floor(Math.random() * imgDisp.length)];

        imagenes[imgAleatoria]++;

        return imgAleatoria;
    }
}

/* getAttribute se utiliza para conocer la URL de la imagen que se debe mostrar en la casilla cuando el jugador hace clic  */

function seleccionar(elemento) {

    const imgURL = elemento.getAttribute("data-imagen");
    elemento.innerHTML = `<img class="col casilla" src="${imgURL}" alt=""></img>`;
  


    if (clicks <= 2) {
        if (ImgSeleccionada === 0) {
            ImgSeleccionada = elemento;
        } else {
            if (ImgSeleccionada.getAttribute("data-imagen") === imgURL) {
                elemento.style.pointerEvents = "none"
                setTimeout(() => {
                    aciertos++;
                    pResultado1.innerHTML = "Aciertos: " + (aciertos);
                    
                    listaImagenes.push(imgURL)
                    listaAciertos.push(aciertos)

                    actualizarLocalStorage(); 

                    if (aciertos === TOTAL_ACIERTOS) {
                        pResultado1.innerHTML = "FELICITACIONES GANASTE"
                        pResultado2.innerHTML = `
                        <button onclick="volveAJugar()">Volver a Jugar</button>
                        `
                        elemento.style.pointerEvents = "none";
                        juegoGanado = true;
                    }
                }, 100);
                ImgSeleccionada = 0;
            } else {

                setTimeout(() => {
                    ImgSeleccionada.innerHTML = "";
                    elemento.innerHTML = "";
                    ImgSeleccionada = 0;
                }, 500);
            }
        }

    }
}



function actualizarLocalStorage() {
    localStorage.setItem(CLAVE_ACIERTOS, JSON.stringify(listaAciertos));
    localStorage.setItem(CLAVE_IMAGENES, JSON.stringify(listaImagenes));
}

function volveAJugar() {
    pResultado1.innerHTML = "Aciertos:";
    pResultado2.innerHTML = "";
    clicks = 0;
    aciertos = 0;
    juegoGanado = false;
    generar()
}


function partidaGuardada(aciertos, imgURL) {

    
    const listaAciertos = JSON.parse(localStorage.getItem(CLAVE_ACIERTOS));
    const listaImagenes = JSON.parse(localStorage.getItem(CLAVE_IMAGENES));

    listaImagenes.push(imgURL)
    listaAciertos.push(aciertos)

    actualizarLocalStorage()
    generar();
}

