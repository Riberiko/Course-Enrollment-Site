import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Private from "./Private"
import AccountInfo from "./AccountInfo"
import NotFound from "./NotFound"

function Header(){
    return(
        <>
            Header
        </>
    )
}

export default () => {
    return(
        <>
            <Header />
            <h1>Dashboard</h1>

            <h2>Name : </h2>

            <nav>
                <Link to='account'>My Account</Link>
                <Link to='registration'>Registration</Link>
            </nav>
            <Routes>
                <Route path="account" element={<Private><AccountInfo /></Private>} />
                <Route path="registration" element={<Private></Private>} />
            </Routes>
        </>
    )
}