import { BrowserRouter, Routes, Route } from "react-router-dom"
import Private from "./Private"

function Header(){
    return(
        <>
            Header
        </>
    )
}

export default () => {
    return(
        <>
            <Header />
            <Routes>
                <Route path="/account" Component={() => <Private><AccountInfo /></Private>} />
            </Routes>
        </>
    )
}