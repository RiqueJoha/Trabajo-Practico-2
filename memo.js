const divMatriz = document.querySelector("#matriz");



function generar() {


    const MAX_FILA = 4;
    const MAX_COLUMNA = 4;

    divMatriz.innerHTML = "";
    for (let fila = 0; fila < MAX_FILA; fila++) {

        divMatriz.innerHTML += `
    
    <div onclick="seleccionar(this)"class="row">
        ${agregarColumna()}
   
    </div>
    `

    }

    function agregarColumna() {
        let columnas = "";
        for (let col = 0; col < MAX_COLUMNA; col++) {
            columnas += `
        
        <div onclick="seleccionar(this)" class="col casilla">
    
        </div>
        `

        }
        return columnas;
    }
}
function seleccionar(elemento) {
    elemento.style.backgroundColor = "blue";
    elemento.innerHTML = `
    <img class="col casilla"src="https://th.bing.com/th/id/R.990f9d2e3b9e4f0fceefcab18c15b7e5?rik=bus%2bru5s4wTZwg&pid=ImgRaw&r=0" alt="10"></img>
    <img class="col casilla"src="https://cdn.shopify.com/s/files/1/0530/8517/5981/files/ShopByTitle-TJ.png?v=1654799164" alt="2"></img>
    <img class="col casilla"src="https://th.bing.com/th/id/OIP.3CEO2NHd_Yo-1GQ37KnQuQAAAA?pid=ImgDet&w=186&h=279&c=7" alt="3"></img>
    <img class="col casilla"src="https://th.bing.com/th/id/OIP.j0CgnfgcErDNHa058lmotwHaHa?pid=ImgDet&w=186&h=186&c=7" alt="4"></img>
    `

}
