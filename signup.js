import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqICHuQy3ChQhfC4Ws8ct6dbmoQC2zLoI",
    authDomain: "farmerfreshmarket-d280e.firebaseapp.com",
    projectId: "farmerfreshmarket-d280e",
    storageBucket: "farmerfreshmarket-d280e.firebasestorage.app",
    messagingSenderId: "332591147213",
    appId: "1:332591147213:web:722ba3a4415ece0ecf6184"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Google Sign-In
function handleCredentialResponse(response) {
    const credential = GoogleAuthProvider.credential(response.credential);
    signInWithCredential(auth, credential).then((userCredential) => {
        window.location.href = 'index.html';
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "272444071987-qt0iikgljab21lb59gk83jmup96ateql.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
}