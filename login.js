import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);

window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{
window.location.href="admin.html";
})

.catch(()=>{
alert("Usuario o contraseña incorrecta");
});

}
