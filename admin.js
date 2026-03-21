// =============================
// FIREBASE IMPORTS
// =============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getDatabase, 
ref, 
set, 
get, 
onValue, 
remove 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// =============================
// CONFIG FIREBASE
// =============================

const firebaseConfig = {
apiKey: "AIzaSyDsBAnSCxSaYqP3NcbU41_2vUZAG-OcuCg",
authDomain: "laboratorio-dr-luis-quito.firebaseapp.com",
databaseURL: "https://laboratorio-dr-luis-quito-default-rtdb.firebaseio.com",
projectId: "laboratorio-dr-luis-quito",
storageBucket: "laboratorio-dr-luis-quito.appspot.com",
messagingSenderId: "165604879420",
appId: "1:165604879420:web:659121228440c0a7f26739"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);


// =============================
// PROTEGER PANEL ADMIN
// =============================

onAuthStateChanged(auth,(user)=>{

if(!user){

alert("Debes iniciar sesión");
window.location.href="login.html";

}

});


// =============================
// ELEMENTOS HTML
// =============================

const form = document.getElementById("form");
const lista = document.getElementById("listaEstudios");
const buscador = document.getElementById("buscador");
let textoBusqueda = "";


// =============================
// GUARDAR ESTUDIO
// =============================

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const nombre = document.getElementById("nombre").value.toUpperCase();
const precio = document.getElementById("precio").value;
const tiempo = document.getElementById("tiempo").value;
const ayuno = document.getElementById("ayuno").value;
const preparacion = document.getElementById("preparacion").value;
const reactivo = document.getElementById("reactivo").value === "true";
const envio_lab = document.getElementById("envio_lab").value;

const id = nombre.toLowerCase().replaceAll(" ","_");

set(ref(db,"estudios/"+id),{

nombre,
precio,
tiempo_entrega:tiempo,
ayuno,
preparacion,
reactivo,
envio_lab

});

alert("✅ Estudio guardado");

form.reset();

});


// =============================
// MOSTRAR ESTUDIOS
// =============================

onValue(ref(db,"estudios"), (snapshot)=>{

lista.innerHTML = "";

snapshot.forEach(child=>{

const data = child.val();
const id = child.key;

// 🔍 FILTRO INTELIGENTE
const contenido = normalizar(
  data.nombre + " " +
  data.precio + " " +
  data.tiempo_entrega + " " +
  data.envio_lab + " " +
  (data.reactivo ? "disponible" : "sin reactivo")
);

if(!contenido.includes(textoBusqueda)) return;

lista.innerHTML += `

<div class="card-estudio">

<div class="estudio-info">
<b>${data.nombre}</b>
<span>Precio: S/ ${data.precio}</span>
<span>Entrega: ${data.tiempo_entrega}</span>
<span>Estado: ${data.reactivo ? "Disponible" : "Sin reactivo"}</span>
<span>Envio Lab: ${data.envio_lab || "No"}</span>
</div>

<div class="estudio-acciones">
<button class="btn-editar" onclick="editarEstudio('${id}')">✏️ Editar</button>
<button class="btn-eliminar" onclick="eliminarEstudio('${id}')">🗑 Eliminar</button>
</div>

</div>

`;

});

});

// =============================
// ELIMINAR ESTUDIO
// =============================

window.eliminarEstudio = function(id){

if(confirm("¿Eliminar este estudio?")){

remove(ref(db,"estudios/"+id));

}

}


// =============================
// EDITAR ESTUDIO
// =============================

window.editarEstudio = async function(id){

const snapshot = await get(ref(db,"estudios/"+id));

const data = snapshot.val();

document.getElementById("nombre").value = data.nombre;
document.getElementById("precio").value = data.precio;
document.getElementById("tiempo").value = data.tiempo_entrega;
document.getElementById("ayuno").value = data.ayuno;
document.getElementById("preparacion").value = data.preparacion;
document.getElementById("reactivo").value = data.reactivo ? "true":"false";
document.getElementById("envio_lab").value = data.envio_lab || "No";

}


// =============================
// IMPORTAR EXCEL
// =============================

window.importarExcel = function(){

const archivo = document.getElementById("excelFile").files[0];

if(!archivo){

alert("Selecciona un archivo Excel");
return;

}

const reader = new FileReader();

reader.onload = function(e){

const data = new Uint8Array(e.target.result);

const workbook = XLSX.read(data,{type:"array"});

const hoja = workbook.Sheets[workbook.SheetNames[0]];

const estudios = XLSX.utils.sheet_to_json(hoja);

let contador = 0;

estudios.forEach(estudio=>{

const nombre = estudio.nombre.toUpperCase();

const id = nombre.toLowerCase().replaceAll(" ","_");

set(ref(db,"estudios/"+id),{

nombre:nombre,
precio:estudio.precio || "",
categoria:estudio.categoria || "",
tiempo_entrega:estudio.tiempo_entrega || "",
ayuno:estudio.ayuno || "",
preparacion:estudio.preparacion || "",
reactivo:estudio.reactivo === true || estudio.reactivo === "TRUE",
envio_lab:estudio.envio_lab || "No"

});

contador++;

});

document.getElementById("estadoCarga").innerHTML =
"✅ "+contador+" estudios cargados correctamente";

};

reader.readAsArrayBuffer(archivo);

}
