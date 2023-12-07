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

            <nav>
                <Link to='account'>My Account</Link>
            </nav>
            <Routes>
                <Route path="account" element={<Private><AccountInfo /></Private>} />
                <Route path="*" Component={NotFound} />
            </Routes>
        </>
    )
}