import {useUser} from './userContext'

function statusCheck(response, errorMessage = 'from backend')
{
    if(!response.ok) throw Error('[Error] : '+ errorMessage)
    return response
}

function isAuthF(userData)
{
    return new Promise((resolve, reject)=>{
        if(!userData) return
        fetch('http://localhost:8000/isAuth', {
            method: 'POST',
            headers: 'application/json',
            credentials: 'include',
            body: JSON.stringify({
                'username' : async.id
            })
        })
        .then(res => statusCheck(res))
        .then(() => resolve(true))
        .catch(() => reject(false))
    })
}

export {statusCheck, isAuthF}