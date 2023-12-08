import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Private from "./Private"
import AccountInfo from "./AccountInfo"
import Transaction from "./Transaction"
import Registration from "./Registration"
import NotFound from "./NotFound"
import { isAuthF, statusCheck } from "./helper"
import { useEffect, useState } from "react"

function Header(){
    return(
        <>
            Header
        </>
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
            <h1>Dashboard</h1>

            <h2>Name : </h2>

            <nav>
                <Link to='account'>My Account</Link>
                <Link to='registration'>Registration</Link>
                <Link to='transactions'>Transaction History</Link>
                <Link to='#' onClick={() => handleLogout(navigate)}>Logout</Link>
            </nav>
            <Routes>
                <Route path="account" element={<Private><AccountInfo /></Private>} />
                <Route path="registration" element={<Private><Registration /></Private>} />
                <Route path="transactions" element={<Private><Transaction /></Private>} />
                <Route path="*" element={<NotFound statusCode={404} message='Page Not Found' />} />
            </Routes>
        </>: <NotFound statusCode={400} message='user Not Authenticated' />
    )
}