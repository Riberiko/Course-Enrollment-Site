import {useUser} from './userContext'

function statusCheck(response, errorMessage = 'from backend')
{
    console.log(response)
    const contentType = response.headers.get('Content-Type');
    const message = (contentType.includes('text')) ? response.text() : response.json()
    if(!response.ok) throw Error('[Error] : '+ message)
    return response
}

function isAuthF(userData)
{
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:8000/isAuth', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        .then(res => statusCheck(res))
        .then(() => resolve(true))
        .catch((err) => reject(err))
    })
}

export {statusCheck, isAuthF}