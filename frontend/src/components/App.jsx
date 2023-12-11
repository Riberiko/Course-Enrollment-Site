import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './Login'
import DashBoard from './DashBoard'
import '../assets/css/app.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='login' Component={Login} />
        <Route path='/*' Component={DashBoard} />
      </Routes>
    </Router>
  )
}

export default App
