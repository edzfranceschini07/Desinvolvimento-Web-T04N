import { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  function adicionarTarefa(e) {
    e.preventDefault();

    if (texto.trim() === "") return;

    const novaTarefa = {
      id: Date.now(),
      text: texto.trim()
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
  }

  function removerTarefa(id) {
    const novaLista = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novaLista);
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <p className="subtitulo">Organize seu dia de forma simples</p>

      <form className="input-area" onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <p className="contador">
        Total de tarefas: <strong>{tarefas.length}</strong>
      </p>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span>{tarefa.text}</span>

            <button
              className="btn-remover"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;