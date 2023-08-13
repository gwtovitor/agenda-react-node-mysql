import { useEffect, useState } from 'react';
import api from '../Services/server';
import '../Styles/styles.css';

function Logado() {
  const [agendaData, setAgendaData] = useState([]);
  const handleAdicionarContato = ()=>{

  }
  useEffect(() => {
    async function fetchAgendaData() {
      try {
        const response = await api.get('/getagenda');
        setAgendaData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da agenda', error);
      }
    }
    fetchAgendaData();
  }, []);

  return (
    <div className='container-logado'>
    <h1>Contatos</h1>
    {agendaData.length === 0 ? (
      <p>Você ainda não tem nenhum contato.</p>
    ) : (
      <ul className='list-group'>
        {agendaData.map(contact => (
          <li key={contact.id} className='list-group-item'>
            <strong>{contact.nome}</strong><br />
            Telefone: {contact.telefone}<br />
            Email: {contact.email}<br />
          </li>
        ))}
      </ul>
    )}
    <button onClick={handleAdicionarContato}>Adicionar Contato</button>
  </div>
  
  );
}

export default Logado;
