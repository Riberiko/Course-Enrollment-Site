import { useEffect, useState } from "react"
import { statusCheck } from "../helper"

export default ({data, layout, isWaiting, refresh}) => {

    const [more, setMore] = useState(false)
    const [isRegisterd, setRegistered] = useState(false)
    const [isLoading, setLoading] = useState(true)

    function handleClick(isRegisterd, setRegistered, refresh, reason='n/a')
    {
        fetch(`http://localhost:8000/add${!isRegisterd?'Enrolled':'Dropped'}Course`,
        {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'courseId': data.course_id, 'reason':reason})
        }).then(res => statusCheck(res))
        .then(data => {
            console.log(data)
            setRegistered(!isRegisterd)
            console.log(refresh)
            if(refresh) refresh()
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        !isWaiting && fetch('http://localhost:8000/checkStudentEnrolledCourse', {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'courseId': data.course_id
            })
        })
        .then(res => statusCheck(res))
        .then(resData => {
            setLoading(false)
            setRegistered(resData.response)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        !isLoading ?
        <div className={`courseItem ${!layout?'list':''}`}>
            <p onClick={() => setMore(!more)}>
                Name: {data.description}<br/>
                Type: {data.code_type}<br/>
                Teacher: {data.teacher_name}<br/>
                Start: {data.start_time}<br/>
                End: {data.end_time}<br/>
                Enrolled Count: {data.enrolled_count}<br />
                Capacity : {data.capacity}<br/>
                {
                    more &&
                    <>
                        ASS
                    </>
                }
            </p>
            {!isWaiting ? <input type="button" value={isRegisterd ? 'Drop':'Register'} onClick={()=>handleClick(isRegisterd, setRegistered, refresh)}  /> : <p>In wating List</p>}
        </div> : <p>Loading data </p>
    )
}