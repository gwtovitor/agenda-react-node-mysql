import { useEffect, useState } from 'react';
import api from '../Services/server';
import '../Styles/styles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';


function Logado() {
  const [formAtivo, setFormAtivo] = useState(false);
  const id = localStorage.getItem('id');
  const [agendaData, setAgendaData] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const navigate = useNavigate();

  const validationAgenda = yup.object().shape({
    email: yup.string().email("Não é um email válido").required("Campo Obrigatório"),
    nome: yup.string().required("Campo Obrigatório"),
    telefone: yup.string().min(11, "Digite um telefone válido").required("Campo Obrigatório"),
  });

  const handleAdicionarContato = () => {
    setFormAtivo(!formAtivo);
  }
  const salvarAgenda = async (values) => {
    const response = await api.post('/salvaagenda', {
      email: values.email,
      nome: values.nome,
      telefone: values.telefone,
      userId: id
    })
    if (response.data == 'Email ou Telefone já existem para este usuário') {
      alert(response.data)
    } else {
      alert('Usuario Inserido !')
      window.location.reload();
    }
  }

  useEffect(() => {
    async function fetchAgendaData() {
      try {
        const response = await api.get('/getagenda', {
          params: {
            id: id
          }
        });
        setAgendaData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da agenda', error);
      }
    }

    fetchAgendaData();
  }, [id]);

  const logoff = () => {
    localStorage.removeItem('id')
    navigate('../')
  }

  const deletarContato = async (id) => {
    try {
      const response = await api.delete(`/deletarAgenda?id=${id}`);
      if (response.data == 'Contato deletado com sucesso') {
        alert(response.data)
        window.location.reload()
      } else {
        alert(response.data)
      }
    } catch (error) {
      console.error('Erro ao excluir o contato:', error);
    }
  }


  return (
    <div className='container-logado'>
      <h1>Contatos</h1>
      <button className='btn btn-danger mb-3' onClick={logoff}>Sair</button>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">Pesquisa</span>
          <input
            type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"

            placeholder="Filtrar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </div>
      </div>

      {agendaData.length === 0 ? (
        <p>Você ainda não tem nenhum contato.</p>
      ) : (
        <ul className='list-group'>
          {agendaData
            .filter(contact => contact.nome.toLowerCase().includes(filtroNome.toLowerCase()))
            .sort((a, b) => a.nome.localeCompare(b.nome)) // Organiza os contatos em ordem alfabética
            .map(contact => (
              <div className="contact-item">
                <div className="contact-details">
                  <li key={contact.id} className='list-group-item'>
                    <strong>{contact.nome}</strong><br />
                    Telefone: {contact.telefone}<br />
                    Email: {contact.email}<br />
                    <button className='btn btn-danger me-2' onClick={() => { deletarContato(contact.id) }}>Deletar</button>
                    <button className='btn btn-info'>Modificar</button>
                  </li>
                </div>
              </div>

            ))}
          {agendaData
            .filter(contact => contact.nome.toLowerCase().includes(filtroNome.toLowerCase()))
            .length === 0 && (
              <p>Nenhum contato encontrado.</p>
            )}
        </ul>


      )}
      <button className='btn btn-success' onClick={handleAdicionarContato}>{!formAtivo? ('Adicionar Contato'):('Voltar')}</button>
      {formAtivo ? (
        <Formik
          initialValues={{}}
          onSubmit={salvarAgenda}
          validationSchema={validationAgenda}
        >
          <Form className='login-form'>
            <div className='login-form-group'>
              <Field
                name="nome"
                className="form-control mb-2 mt-2"
                placeholder="Nome"
              />
              <ErrorMessage
                component="span"
                name='nome'
                className='form-error'
              />
            </div>
            <div className='login-form-group'>
              <Field
                name="email"
                type="email"
                className="form-control mb-2"
                placeholder="Email"
              />
              <ErrorMessage
                component="span"
                name='email'
                className='form-error'
              />
            </div>
            <div className='login-form-group'>
              <Field
                name="telefone"
                className="form-control"
                placeholder="Telefone"
              />
              <ErrorMessage
                component="span"
                name='telefone'
                className='form-error'
              />
            </div>
            <button className='btn btn-primary mt-2' type='submit'>Salvar</button>
          </Form>
        </Formik>

      ) : (
        <></>
      )}

    </div>

  );
}

export default Logado;
