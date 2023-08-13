import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import api from '../Services/server';
import '../Styles/styles.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleClickLogin = async (values) =>{
    const response =  await api.post('/login', {
      email: values.email,
      senha: values.password
    })  
    if(response.data.message == 'Usuario ou Senha Inválidos'){
      alert(response.data.message)
    }else{
      localStorage.setItem('id', response.data.message[0].id)
      navigate('/home')
    }
  }
  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email válido").required("Campo Obrigatório"),
    password: yup.string().min(8, "A senha deve ter 8 caracteres").required("Campo Obrigatório"),
  });
  return (
    <div className='container'>
      <h1>Login</h1>
      <Formik initialValues={{}}
      onSubmit={handleClickLogin}
      validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className='login-form-grup'>
            <Field name="email" className="form-fiel" placeholder="Email" />
            <ErrorMessage 
            component="span" 
            name='email' 
            className='form-error'/>
          </div>
          <div className='login-form-grup'>
            <Field name="password" className="form-fiel" placeholder="Senha" />
            <ErrorMessage 
            component="span" 
            name='password' 
            className='form-error'/>
          </div>
          <button className='button' type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
