import './App.css'
import FetchUser from './components/FetchUser'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import CreateUser from './components/CreateUser'
import Signup from './components/signup'
import Login from './components/Login'
import Home from './components/Home'
import Deposit from './components/Deposit'
import Withdrawl from './components/Withdrawl'
import UpdateUser from './components/UpdateUser'
import Transfer from './components/Transfer'
import Delete from './components/Delete'


function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path="/create" element={<CreateUser/>}></Route>
    <Route path="/fetch" element={<FetchUser/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/deposit" element={<Deposit/>}></Route>
    <Route path="/withdrawal" element={<Withdrawl/>}></Route>
    <Route path="/update" element={<UpdateUser/>}></Route>
    <Route path="/transfer" element={<Transfer/>}></Route>
    <Route path='/delete' element={<Delete/>}></Route>
    </Routes>
      </Router>

    
    </>
  )
}

export default App
