
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const checkSession = document.getElementById("session").checked;

    const account = getAccount(email);

    if(!account) {      //Exclamação é para quando não se encontrar o valor informado
        alert("Ops! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {     // o sinal !== significa diferente em JS
            alert("Ops! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";     //href é a url para onde vai ser encaminhado
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    console.log(email, password);

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return
    }

    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

//FUNÇÕES
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}