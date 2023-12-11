import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './Login'
import DashBoard from './DashBoard'
import '../assets/css/app.css'
import { UserProvider } from '../userContext'

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='login' Component={Login} />
          <Route path='/*' Component={DashBoard} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
