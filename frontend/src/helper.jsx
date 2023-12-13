/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for utility functions
*/


async function statusCheck(response, errorMessage = 'from backend')
{
    const contentType = response.headers.get('Content-Type');
    const message = (contentType.includes('text')) ? await response.text() : await response.json()
    if(!response.ok) throw Error('[Error] : '+ message.response)
    return message
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
