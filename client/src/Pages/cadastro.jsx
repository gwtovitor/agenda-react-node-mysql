import api from '../Services/server';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import '../Styles/styles.css'
import { useNavigate } from 'react-router-dom';

function Cadastro() {

  const navigate = useNavigate();
  const handleClickCadastro = async (values) => {
    const response = await api.post('/registro', {
      email: values.email,
      senha: values.password,
      nome: values.nome,
      telefone: values.telefone,

    }).then((response) => {
      if (response.data.message == 'Usuário cadastrado com sucesso') {
        alert(response.data.message)
        navigate('../login')
      } else {
        alert(response.data.message)
      }
    })
  }
  const phoneRegExp = /^(\+[1-9]{0,1}[0-9]{1,3}[ ]*)?(\([0-9]{2,3}\)[ ]*)?([0-9]{2,4}[ ]*)?[0-9]{4,5}[ ]*[- ]*[0-9]{4}$/;
  const validationCadastro = yup.object().shape({
    email: yup.string().email("Não é um email válido").required("Campo Obrigatório"),
    nome: yup.string().required("Campo Obrigatório"),
    telefone: yup.string().matches(phoneRegExp, 'Numero de telefone invalido').required("Campo Obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Campo Obrigatório"),
    comfirmpassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });
  return (
    <div className='container'>
      <h1>Cadastre-se</h1>
      <button className='btn btn-danger' onClick={() => { navigate('../') }}>Voltar</button>
      <Formik initialValues={{}}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >
        <Form className='login-form'>
          <div className='login-form-grup'>
            <Field name="email" className="form-control mb-2 mt-2" placeholder="Email" />
            <ErrorMessage
              component="span"
              name='email'
              className='form-error' />
          </div>
          <div className='login-form-grup'>
            <Field name="nome" className="form-control mb-2 mt-2" placeholder="Nome" />
            <ErrorMessage
              component="span"
              name='nome'
              className='form-error' />
          </div>
          <div className='login-form-grup'>
            <Field name="telefone" className="form-control mb-2 mt-2" placeholder="Telefone" />
            <ErrorMessage
              component="span"
              name='telefone'
              className='form-error' />
          </div>
          <div className='login-form-grup'>
            <Field name="password" type='password' className="form-control mb-2 mt-2" placeholder="Senha" />
            <ErrorMessage
              component="span"
              name='password'
              className='form-error' />
          </div>
          <div className='login-form-grup'>
            <Field name="comfirmpassword" type='password' className="form-control mb-2 mt-2" placeholder="Confirme sua Senha" />
            <ErrorMessage
              component="span"
              name='comfirmpassword'
              className='form-error' />
          </div>
          <button className='btn btn-primary' type='submit'>Cadastrar</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Cadastro
