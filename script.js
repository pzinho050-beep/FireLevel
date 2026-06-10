const botaoMenu = document.getElementById("botaoMenu");
const listaMenu = document.getElementById("listaMenu");
const formContato = document.getElementById("formContato");
const aviso = document.getElementById("aviso");

botaoMenu.addEventListener("click", function () {
listaMenu.classList.toggle("aberto");
});

formContato.addEventListener("submit", function (evento) {
evento.preventDefault();
aviso.textContent = "Enviando contato para a FireLevel...";

const dados = new FormData(formContato);

fetch(formContato.action, {
method: "POST",
body: dados,
headers: {
Accept: "application/json"
}
}).then(function (resposta) {
if (resposta.ok) {
 aviso.textContent = "Contato enviado com sucesso!";
formContato.reset();
} else {
 aviso.textContent = "Nao foi possivel enviar. Tente novamente.";
}
}).catch(function () {
 aviso.textContent = "Erro de conexao. Verifique a internet.";
});
});
