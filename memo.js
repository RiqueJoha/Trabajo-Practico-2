const divMatriz = document.querySelector("#matriz");
const divMatriz2= document.querySelector("#matriz2");

const imagenes = [
    "https://cdn.shopify.com/s/files/1/0530/8517/5981/files/ShopByTitle-TJ.png?v=1654799164",
    "https://th.bing.com/th/id/OIP.3CEO2NHd_Yo-1GQ37KnQuQAAAA?pid=ImgDet&w=186&h=279&c=7",
    "https://th.bing.com/th/id/OIP.j0CgnfgcErDNHa058lmotwHaHa?pid=ImgDet&w=186&h=186&c=7",
    "https://th.bing.com/th/id/OIP.H_O_NixMS99jqpxEt1LgbQHaGP?w=199&h=180&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.DORBGjJbeD_gc5lF6lawGgHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/R.26b32043d1bef08bfc049c3fe0002518?rik=A02hhw311Qm%2f4g&riu=http%3a%2f%2f3.bp.blogspot.com%2f_uGq8SSLyPqI%2fTEiclC0saeI%2fAAAAAAAAAEQ%2folzUNJBzfKA%2fs1600%2fTom-and-Jerry-1-1NPDHNRYGS-1024x768.jpg&ehk=2x7JH0Z5XTU8DJrWeiEc%2ftgCjpltMw4Ate9G2NVl06U%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.pml9WIRdnYvGWOTfhePvmgHaNJ?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.GXUGr4Lx_UpSqIs6WRt_XQHaD4?pid=ImgDet&rs=1"
]

function generar() {
    const MAX_FILA = 4;
    const MAX_COL = 4;

    divMatriz.innerHTML = "";


    for (let fila = 0; fila < MAX_FILA; fila++) {
        divMatriz.innerHTML += `
            <div class="row">
                ${agregarColumna(fila)}
            </div>
        `;
    }


    function agregarColumna() {

        let columnas = "";

        for (let col = 0; col < MAX_COL; col++) {

            columnas += `
                <div onclick="seleccionar(this)" class="col casilla">
                    
                </div>
            `;
        }

        return columnas;
    }
}

function seleccionar(elemento, fila, col) {

    const imgAleatoria = Math.floor(Math.random() * imagenes.length);
    const matriz = imagenes[imgAleatoria];

  elemento.innerHTML = `<img class="col casilla" src="${matriz}" alt=" ${fila}-${col}"></img>`
}



