const input = document.getElementById("tarefaInput");
const addBtn = document.getElementById("addBtn");
const lista = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add("done");
    }

    li.addEventListener("click", () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      renderizar();
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "X";
    btnExcluir.addEventListener("click", (e) => {
      e.stopPropagation();
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizar();
    });

    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  tarefas.push({ texto, concluida: false });
  input.value = "";
  salvarTarefas();
  renderizar();
});

renderizar();
