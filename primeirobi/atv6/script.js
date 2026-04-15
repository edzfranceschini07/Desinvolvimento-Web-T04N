const botao = document.getElementById("adicionar");
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");


botao.addEventListener("click", function() {

    const texto = input.value;

    if (texto === "") {
        return;
    }

    const li = document.createElement("li");

    li.textContent = texto;

    lista.appendChild(li);

    input.value = "";

});


// remover tarefa ao clicar (delegação de eventos)

lista.addEventListener("click", function(event) {

    if (event.target.tagName === "LI") {
        event.target.remove();
    }

});