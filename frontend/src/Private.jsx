import { useEffect, useState } from "react"
import { useUser } from './userContext';
import { statusCheck } from './helper'

export default ({children}) => {

    const { userData, setUser } = useUser();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(process.env.BACKEND_URL+'/isAuth', {
            method: 'POST',
            headers: 'application/json',
            body: JSON.stringify({
                'username' : userData.id
            })
        })
        .then(res => statusCheck(res))
        .then(setLoading(false))
        .catch(err => console.log('Error Accessing Private | while checking is Auth'))
    }, [])

    if(loading) return <>Checking Authentification ...</>

    if(userData) return {children}
    else{
        return(
            <>
                <h1>Your session has Ended for some reason, Please provide</h1>
            </>
        )
    }
}