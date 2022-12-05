
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchases from './pages/Purchases'
import SignUp from './pages/SignUp'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar/>
      {isLoading && (<LoadingScreen/>)}
      <Container className='my-5'> {/*my desde el 1 hasta el 5 max */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/detail/:id' element={<ProductsDetail/>}/>
        
          <Route>
            <Route path='/purchases' element={<Purchases/>}/>
            <Route path='/signup' element={<SignUp />}/>
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
