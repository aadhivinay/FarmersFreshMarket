const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            window.location.href = 'index.html'; // Redirect to main page
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Google Sign-In
function handleCredentialResponse(response) {
    const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
    firebase.auth().signInWithCredential(credential).then((userCredential) => {
        const user = userCredential.user;
        window.location.href = 'index.html';
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
}