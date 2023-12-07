export default ({statusCode, message}) => {
    return(
        <>
            <h1>{statusCode}</h1>
            <p>[Error]: {message}</p>
        </>
    )
}