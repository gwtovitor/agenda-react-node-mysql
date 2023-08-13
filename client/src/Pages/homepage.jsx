
import '../Styles/styles.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <h2>Agenda Online!</h2>

      <button onClick={()=>{navigate('/login')}}className='btn'>Logar</button>
      <button className='btn' onClick={()=>{navigate('/cadastro')}}>Criar Conta</button>
    </div>
  )
}

export default Home
