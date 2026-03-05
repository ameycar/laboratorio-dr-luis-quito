const firebaseConfig = { 
  apiKey: "AIzaSyDsBAnSCxSaYqP3NcbU41_2vUZAG-OcuCg",
  authDomain: "laboratorio-dr-luis-quito.firebaseapp.com",
  databaseURL: "https://laboratorio-dr-luis-quito-default-rtdb.firebaseio.com",
  projectId: "laboratorio-dr-luis-quito",
  storageBucket: "laboratorio-dr-luis-quito.firebasestorage.app",
  messagingSenderId: "165604879420",
  appId: "1:165604879420:web:659121228440c0a7f26739"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();

  database.ref("estudios").once("value", snap => {
    resultados.innerHTML = "";

    snap.forEach(child => {
      const e = child.val();

      if (e.nombre.toLowerCase().includes(texto)) {
        resultados.innerHTML += `
        <div class="card">
          <h3>${e.nombre}</h3>
          <p class="precio">Precio: S/ ${e.precio}</p>
          <p>Entrega: ${e.tiempo_entrega}</p>
          <p>Ayuno: ${e.ayuno}</p>
          <p>Preparación: ${e.preparacion}</p>
          <p class="estado">Estado: ${e.reactivo ? "Disponible" : "Sin reactivo"}</p>
        </div>`;
      }
    });
  });
});
