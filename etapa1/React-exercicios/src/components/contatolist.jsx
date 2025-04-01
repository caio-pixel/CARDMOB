import React, { useState, useEffect } from "react";
import "../components/contato.css"

const ListaContatos = ({ title }) => {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editTelefone, setEditTelefone] = useState("");


  // Carregar contatos do localStorage
  useEffect(() => {
    const contatosSalvos = localStorage.getItem("contatos");
    if (contatosSalvos) {
      setContatos(JSON.parse(contatosSalvos));
    }
  }, []);

  // Salvar contatos no localStorage
  useEffect(() => {
    localStorage.setItem("contatos", JSON.stringify(contatos));
  }, [contatos]);

  // Adicionar um novo contato
  const adicionarContato = () => {
    if (nome.trim() === "" || telefone.trim() === "") return;

    const novoContato = { id: Date.now(), nome, telefone };
    setContatos([...contatos, novoContato]);
    setNome("");
    setTelefone("");
  };

  // Iniciar edição de um contato
  const iniciarEdicao = (id, nome, telefone) => {
    setEditandoId(id);
    setEditNome(nome);
    setEditTelefone(telefone);
  };

  // Salvar edição do contato
  const salvarEdicao = () => {
    setContatos(
      contatos.map((contato) =>
        contato.id === editandoId
          ? { ...contato, nome: editNome, telefone: editTelefone }
          : contato
      )
    );
    cancelarEdicao();
  };

  // Remover um contato
  const removerContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  // Cancelar a edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditNome("");
    setEditTelefone("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{title}</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="text"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
      />
      <button onClick={adicionarContato}>Adicionar Contato</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {contatos.map((contato) => (
          <li key={contato.id} style={{ margin: "10px 0" }}>
            {editandoId === contato.id ? (
              <>
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                />
                <input
                  type="text"
                  value={editTelefone}
                  onChange={(e) => setEditTelefone(e.target.value)}
                />
                <button onClick={salvarEdicao}>Salvar</button>
                <a href="#" onClick={cancelarEdicao}>
                  Cancelar
                </a>
              </>
            ) : (
              <>
                {contato.nome} - {contato.telefone}
                <button onClick={() => iniciarEdicao(contato.id, contato.nome, contato.telefone)}>
                  Editar
                </button>
                <button onClick={() => removerContato(contato.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaContatos;
