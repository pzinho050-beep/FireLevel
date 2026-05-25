const botaoMenu = document.getElementById("botaoMenu");
const listaMenu = document.getElementById("listaMenu");
const campoBusca = document.getElementById("campoBusca");
const botoesFiltro = document.querySelectorAll(".filtro");
const jogos = document.querySelectorAll(".jogo");
const botoesReservar = document.querySelectorAll(".reservar");
const botoesComprar = document.querySelectorAll(".comprar");
const tipoPedido = document.getElementById("tipoPedido");
const jogoEscolhido = document.getElementById("jogoEscolhido");
const formAgendamento = document.getElementById("formAgendamento");
const aviso = document.getElementById("aviso");
let categoriaAtual = "todos";
botaoMenu.addEventListener("click", function () {
listaMenu.classList.toggle("aberto");
});
function filtrarJogos() {
const textoBusca = campoBusca.value.toLowerCase();
jogos.forEach(function (jogo) {
const nome = jogo.getAttribute("data-nome");
const categoria = jogo.getAttribute("data-categoria");
const encontrouNome = nome.includes(textoBusca);
const encontrouCategoria = categoriaAtual === "todos" || categoriaAtual === categoria;
if (encontrouNome && encontrouCategoria) {
jogo.classList.remove("oculto");
} else {
jogo.classList.add("oculto");
}
});
}
campoBusca.addEventListener("keyup", filtrarJogos);
botoesFiltro.forEach(function (botao) {
botao.addEventListener("click", function () {
botoesFiltro.forEach(function (item) {
item.classList.remove("ativo");
});
botao.classList.add("ativo");
categoriaAtual = botao.getAttribute("data-categoria");
filtrarJogos();
});
});
botoesReservar.forEach(function (botao) {
botao.addEventListener("click", function () {
const nomeDoJogo = botao.getAttribute("data-jogo");
tipoPedido.value = "Aluguel por horario";
jogoEscolhido.value = nomeDoJogo;
aviso.textContent = "Jogo selecionado: " + nomeDoJogo;
document.getElementById("agendamento").scrollIntoView({
behavior: "smooth"
});
});
});
botoesComprar.forEach(function (botao) {
botao.addEventListener("click", function () {
const nomeDoJogo = botao.getAttribute("data-jogo");
tipoPedido.value = "Compra digital";
jogoEscolhido.value = nomeDoJogo;
aviso.textContent = "Compra digital selecionada: " + nomeDoJogo;
document.getElementById("agendamento").scrollIntoView({
behavior: "smooth"
});
});
});
formAgendamento.addEventListener("submit", function (evento) {
evento.preventDefault();
aviso.textContent = "Enviando pedido para o e-mail da FireLevel...";
const dados = new FormData(formAgendamento);
fetch(formAgendamento.action, {
method: "POST",
body: dados,
headers: {
Accept: "application/json"
}
}).then(function (resposta) {
if (resposta.ok) {
aviso.textContent = "Pedido enviado com sucesso!";
formAgendamento.reset();
} else {
aviso.textContent = "Nao foi possivel enviar. Tente novamente.";
}
}).catch(function () {
aviso.textContent = "Erro de conexao. Verifique a internet.";
});
});
