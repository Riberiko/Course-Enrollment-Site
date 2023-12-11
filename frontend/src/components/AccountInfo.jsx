import { useEffect, useState } from "react"
import { statusCheck } from "../helper"

export default () => {

    const [data, setData] = useState()

    useEffect(()=>{
        fetch('http://localhost:8000/getStudentById',{
            'credentials':'include'
        })
        .then(res => statusCheck(res))
        .then(data => setData(data[0]))
    }, [])

    return(
        data ? 
        <>
            <section>
                <img src="" alt="" />
                <p>Name: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</p>
                <p>Email: {data.email}</p>
                <p>Phone #: {data.phone_number}</p>

            </section>
            <section>
                <h2>Current Enrolled Classes</h2>
            </section>
            <section>
                <h2>Current Dropped Classes</h2>
            </section>
        </> : <>Loading User data</>
    )
}