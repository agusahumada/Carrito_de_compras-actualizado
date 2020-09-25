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

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Reseteamos el array
    limpiarHtml(); //Eliminamos tod le HTML
  });

  //Muestra los cursos del LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHtml();
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leeDatosCurso(cursoSeleccionado);
  }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Elimina del arreglo de articulosCarrito por le data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHtml(); // Iterar sobre el carrito y mostrar su HTML
  }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leeDatosCurso(curso) {
  //Objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Reatorna el objeto actualizado
      } else {
        return curso; //Retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agrega elementos al array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHtml();
}

//Muestra el carrito de compra en el HTML
function carritoHtml() {
  //Limpiar el HTML
  limpiarHtml();

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
          <img src= '${imagen}' width="100">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href = "#" class= "borrar-curso" data-id=${id} > X </a>
      </td>
    `;

    //Agrega el HTML en el tbody
    contenedorCarrito.appendChild(row);
  });

  //Agregar el carrito de compras al Storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
