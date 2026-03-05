import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const database = getDatabase(app);

const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");

buscador.addEventListener("input", async () => {

    const texto = buscador.value.toLowerCase();

    const snapshot = await get(ref(database, "estudios"));

    resultados.innerHTML = "";

    snapshot.forEach(child => {

        const e = child.val();

        if(e.nombre.toLowerCase().includes(texto)){

            resultados.innerHTML += `
            <div class="card">
              <h3>${e.nombre}</h3>
              <p class="precio">Precio: S/ ${e.precio}</p>
              <p>Entrega: ${e.tiempo_entrega}</p>
              <p>Ayuno: ${e.ayuno}</p>
              <p>Preparación: ${e.preparacion}</p>
            </div>
            `;
        }

    });

});
