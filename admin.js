import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsBAnSCxSaYqP3NcbU41_2vUZAG-OcuCg",
  authDomain: "laboratorio-dr-luis-quito.firebaseapp.com",
  databaseURL: "https://laboratorio-dr-luis-quito-default-rtdb.firebaseio.com",
  projectId: "laboratorio-dr-luis-quito",
  storageBucket: "laboratorio-dr-luis-quito.firebasestorage.app",
  messagingSenderId: "165604879420",
  appId: "1:165604879420:web:659121228440c0a7f26739"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const nombre = document.getElementById("nombre").value.toUpperCase();
const precio = document.getElementById("precio").value;
const tiempo = document.getElementById("tiempo").value;
const ayuno = document.getElementById("ayuno").value;
const preparacion = document.getElementById("preparacion").value;
const reactivo = document.getElementById("reactivo").value === "true";

const estudiosRef = ref(db,"estudios");

const snapshot = await get(estudiosRef);

let duplicado = false;

snapshot.forEach(child=>{

const e = child.val();

if(e.nombre === nombre){

duplicado = true;

}

});

if(duplicado){

alert("⚠️ ESTE ESTUDIO YA EXISTE");

return;

}

const id = nombre.toLowerCase().replaceAll(" ","_");

set(ref(db,"estudios/"+id),{

nombre:nombre,
precio:precio,
tiempo_entrega:tiempo,
ayuno:ayuno,
preparacion:preparacion,
reactivo:reactivo

});

alert("✅ Estudio guardado");

form.reset();

});


// =======================================
// NUEVA FUNCION: MOSTRAR ESTUDIOS
// =======================================

const lista = document.getElementById("listaEstudios");

onValue(ref(db,"estudios"), (snapshot)=>{

if(!lista) return;

lista.innerHTML = "";

snapshot.forEach(child=>{

const data = child.val();
const id = child.key;

lista.innerHTML += `

<div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:6px">

<b>${data.nombre}</b><br>
Precio: S/ ${data.precio}<br>
Entrega: ${data.tiempo_entrega}<br>

<button onclick="editarEstudio('${id}')">✏️ Editar</button>
<button onclick="eliminarEstudio('${id}')">🗑 Eliminar</button>

</div>

`;

});

});


// =======================================
// ELIMINAR ESTUDIO
// =======================================

window.eliminarEstudio = function(id){

if(confirm("¿Eliminar este estudio?")){

remove(ref(db,"estudios/"+id));

}

}


// =======================================
// EDITAR ESTUDIO
// =======================================

window.editarEstudio = async function(id){

const snapshot = await get(ref(db,"estudios/"+id));

const data = snapshot.val();

document.getElementById("nombre").value = data.nombre;
document.getElementById("precio").value = data.precio;
document.getElementById("tiempo").value = data.tiempo_entrega;
document.getElementById("ayuno").value = data.ayuno;
document.getElementById("preparacion").value = data.preparacion;

if(data.reactivo){
document.getElementById("reactivo").value = "true";
}else{
document.getElementById("reactivo").value = "false";
}

}
