import {useUser} from './userContext'

async function statusCheck(response, errorMessage = 'from backend')
{
    const contentType = response.headers.get('Content-Type');
    const message = (contentType.includes('text')) ? await response.text() : await response.json()
    if(!response.ok) throw Error('[Error] : '+ message)
    return response
}

async function isAuthF()
{
    return new Promise((resolve, reject)=>{
        fetch('http://localhost:8000/isAuth', {
            method: 'POST',
            credentials: 'include',
        })
        .then(res => statusCheck(res))
        .then(() => resolve(true))
        .catch(() => reject(false))
    })
}

export {statusCheck, isAuthF}