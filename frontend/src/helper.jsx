function statusCheck(response, errorMessage = 'from backend')
{
    if(!response.ok) throw Error('[Error] : '+ errorMessage)
    return response

}

export {statusCheck}