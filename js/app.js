// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando 'Agregar al carrito'
  listaCursos.addEventListener("click", agregarCurso);
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leeDatosCurso(cursoSeleccionado);
  }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leeDatosCurso(curso) {
  //   console.log(curso);

  //Objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Agrega elementos al array de carrito
  articulosCarrito = [...articulosCarrito, infoCurso];

  console.log(articulosCarrito);
  carritoHtml();
}

//Muestra el carrito de compra en el HTML
function carritoHtml() {
  //Limpiar el HTML
  limpiarHtml();

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        ${curso.titulo}
      </td>
    ;`;

    //Agrega el HTML en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody
function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
