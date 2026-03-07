import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "TU API",
authDomain: "TU AUTH",
projectId: "TU PROJECT",
appId: "TU APPID"

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
