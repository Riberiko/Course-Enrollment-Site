import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Private from "./Private"
import AccountInfo from "./AccountInfo"
import Transaction from "./Transaction"
import Registration from "./Registration"
import NotFound from "./NotFound"
import '../assets/css/header.css'
import { isAuthF, statusCheck } from "../helper"
import { useEffect, useState } from "react"

function Header(){
    return(
        <header>
            <h3>Some college</h3>
        </header>
    )
}

export default () => {

    const navigate = useNavigate()

    function handleLogout(navigate){
        console.log('called')
        fetch('http://localhost:8000/logout', {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => statusCheck(res))
        .then(() => navigate('/login'))
        .catch((err) => navigate('/login'))
    }

    const [isAuth, setAuth] = useState()

    useEffect(()=>{
        (async()=>{
            const isAuthCheck = await isAuthF()
            setAuth(isAuthCheck)
        })()
    }, [])

    return(
        isAuth ? <>
            <Header />
            <main>
                 <nav>
                    <Link to='account'>My Account</Link>
                    <Link to='registration'>Registration</Link>
                    <Link to='transactions'>Transaction History</Link>
                    { isAuth && <Link to='#' onClick={() => handleLogout(navigate)}>Logout</Link>}
                </nav>
                <article>
                <Routes>
                    <Route path="account" element={<Private><AccountInfo /></Private>} />
                    <Route path="registration" element={<Private><Registration /></Private>} />
                    <Route path="transactions" element={<Private><Transaction /></Private>} />
                    <Route path="*" element={<NotFound statusCode={404} message='Page Not Found' />} />
                </Routes>
                </article>
            </main>
            </>: <NotFound statusCode={400} message='user Not Authenticated' />
    )
}