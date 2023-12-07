import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import DashBoard from './DashBoard'
import { UserProvider } from './userContext'


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' Component={Login} />
          <Route path='dashboard' Component={DashBoard} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
