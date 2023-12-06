import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import DashBoard from './DashBoard'
import { UserProvider } from './userContext'


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={DashBoard} />
          <Route path='login' Component={Login} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
