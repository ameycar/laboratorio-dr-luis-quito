import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

form.addEventListener("submit",(e)=>{

e.preventDefault();

const nombre = document.getElementById("nombre").value.toUpperCase();
const precio = document.getElementById("precio").value.toUpperCase();
const tiempo = document.getElementById("tiempo").value.toUpperCase();
const ayuno = document.getElementById("ayuno").value.toUpperCase();
const preparacion = document.getElementById("preparacion").value.toUpperCase();
const reactivo = document.getElementById("reactivo").value === "true";

const id = nombre.toLowerCase().replaceAll(" ","_");

set(ref(db,"estudios/"+id),{

nombre:nombre,
precio:precio,
tiempo_entrega:tiempo,
ayuno:ayuno,
preparacion:preparacion,
reactivo:reactivo

});

alert("Estudio guardado");

form.reset();

});
