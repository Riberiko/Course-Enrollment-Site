import { useEffect, useState } from "react"
import { useUser } from './userContext';
import { isAuthF, statusCheck } from './helper'

export default ({children}) => {

    const { userData, setUser } = useUser();
    const [loading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)

    useEffect(()=>{
        isAuthF(userData)
        .then(() => {
            setAuth(true)
            setLoading(false)
        })
        .catch(() => {
            setAuth(false)
            setUser(null)
            setLoading(false)
        })
    }, [])

    if(loading) return <>Checking Authentification ...</>

    if(isAuth) return <>{children}</>
    else{
        return(
            <>
                <h1>Your session has Ended for some reason, Please provide</h1>
            </>
        )
    }
}