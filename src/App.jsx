import './App.css'
import FetchUser from './components/FetchUser'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import CreateUser from './components/CreateUser'







function App() {

  return (
    <>
    <Router>
    <div>
      <Link to="/create">Create Account</Link> | 
      <Link to="/fetch">Fetch data</Link>  |
      

    </div>
    <Routes>
    <Route path="/create" element={<CreateUser/>}></Route>
    <Route path="/fetch" element={<FetchUser/>}></Route>

    </Routes>
      </Router>

    
    </>
  )
}

export default App
