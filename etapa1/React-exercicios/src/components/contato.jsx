import React from "react";
import "./contatolist"; 

const Contato = ({ contato }) => {
  return (
    <div className="contato">
      <p><strong>Nome:</strong> {contato.nome}</p>
      <p><strong>Telefone:</strong> {contato.telefone}</p>
 
    </div>
  );
};

export default Contato;
