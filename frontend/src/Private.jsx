import { useEffect, useState } from "react"
import { useUser } from './userContext';
import { isAuthF, statusCheck } from './helper'

export default ({children}) => {

    const { userData, setUser } = useUser();
    const [loading, setLoading] = useState(true)
    const [isAuth, setAuth] = useState(false)

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                await isAuthF();
                console.log('User is logged in');
                setAuth(true);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setAuth(false);
                setUser(null);
                setLoading(false);
            }
        };

        checkAuth();
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