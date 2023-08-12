import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import '../Styles/styles.css'
function Login() {

  const handleClickLogin = (values) =>{
    console.log(values)
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
