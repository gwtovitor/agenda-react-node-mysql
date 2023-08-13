import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/login.jsx'
import Cadastro from './Pages/cadastro.jsx'
import Logado from './Pages/logado.jsx'
function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/home' element={<Logado />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp