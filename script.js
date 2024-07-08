document.addEventListener("DOMContentLoaded", function () {
    function tradePag(x) {
        var pagL = document.getElementById("log");
        var pagR = document.getElementById("reg");

        if (x == 1) {
            pagL.style.display = 'flex';
            pagR.style.display = 'none';
        } else {
            pagL.style.display = 'none';
            pagR.style.display = 'flex';
        }
    }

    function cadastrar() {
        let nomeR = document.querySelector("#NomeR").value;
        let senhaR = document.querySelector("#SenhaR").value;

        if (nomeR && senhaR) {
            localStorage.setItem("username", nomeR);
            localStorage.setItem("password", senhaR);
            alert("Registrado com sucesso!");
            tradePag(1);
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    function entrar() {
        let nomeL = document.querySelector("#NomeL").value;
        let senhaL = document.querySelector("#SenhaL").value;

        let storedName = localStorage.getItem("username");
        let storedPassword = localStorage.getItem("password");

        if (nomeL === storedName && senhaL === storedPassword) {
            alert("Login bem-sucedido!");
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("Nome ou senha incorretos.");
        }
    }

    window.cadastrar = cadastrar;
    window.entrar = entrar;
    window.tradePag = tradePag;


});

function Trocarcor() {
    let cor = document.getElementById("cor").value;
    let body = document.querySelector("body");


    if (localStorage.getItem("loggedIn") == "true") {
        if (cor === "") {
            alert("Selecione uma cor.");
        } else {
            alert("Cor selecionada: " + cor);
            body.style.backgroundColor = cor;
        }
    } else {
        alert("Você não está logado.");
    }
}

function sair() {
    localStorage.setItem("loggedIn", "false");
}


const pontos = [
    {
        "pontos_de_croche": [
            "Ponto Baixissimo : É um ponto simples e rápido de fazer. É representado pela sigla “pb” e indica onde inserir a agulha para fazer o ponto.",
            "Ponto Baixo : É o ponto mais básico do crochê e serve como base para a maioria dos pontos. É representado pela letra “corr” e indica quantas correntes devem ser feitas.",
            "Ponto Alto : É um ponto mais alto e alongado. É representado pela sigla “pa” e indica onde inserir a agulha para fazer o ponto.",
            "Ponto Alto Triplo : É o ponto mais alto do crochê, com três laçadas. É representado pela sigla “pat” e indica onde inserir a agulha para fazer o ponto.",
            "Ponto Fantasia : São pontos decorativos que dão um toque especial às peças de crochê. Podem ser representados por diferentes abreviações, dependendo do ponto específico."
        ]
    }
];
// caso nao conseguisse
function tradPonto(id) {
    const pag = document.querySelector("#pontos");
    const Pontos = pontos[0].pontos_de_croche;

    if (id >= 0 && id < Pontos.length) {
        pag.innerHTML = Pontos[id];
    } else {
        console.error('Índice fora dos limites do array');
    }
}

function Ponto(id) {
    const pag = document.querySelector("#pontos");
    let url = "/pontos.json";
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, true);

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let response = JSON.parse(xmlHttp.responseText);
            if (response && response.pontos_de_croche && response.pontos_de_croche.length > id) {
                pag.innerHTML = response.pontos_de_croche[id];
            } else {
                console.error('Índice inválido ou dados ausentes.');
            }
        }
    };

    xmlHttp.send();
}

