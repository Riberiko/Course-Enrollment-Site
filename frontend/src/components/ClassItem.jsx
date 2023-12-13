import { useEffect, useState } from "react"
import { statusCheck } from "../helper"

import { useInfoPopup } from '../messageContext';

export default ({data, layout, isWaiting, refresh}) => {

    const [more, setMore] = useState(false)
    const [isRegisterd, setRegistered] = useState(false)
    const [moreInfo, setMoreInfo] = useState()

    const { showPopup } = useInfoPopup();

    function handleClick(isRegisterd, setRegistered, refresh, reason='n/a')
    {
        fetch(`http://localhost:8000/add${!isRegisterd?'Enrolled':'Dropped'}Course`,
        {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'courseId': data.course_id, 'derivedId':data.id, 'reason':reason})
        }).then(res => statusCheck(res))
        .then(data => {
            showPopup(data.response + `${data.confirmationNumber ? ' Confirmation : ' + data.confirmationNumber : ''}`)
            if(refresh) refresh()
        })
        .catch(err => {
            showPopup(err.message, false)
        })
    }

    useEffect(()=>{
        fetch('http://localhost:8000/checkStudentEnrolledCourse', {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'courseId': data.id
            })
        })
        .then(res => statusCheck(res))
        .then(resData => {
            setRegistered(resData.response)
        })
        .catch(err => console.log(err))
        
        fetch('http://localhost:8000/getCourseInfo', {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'derivedId': data.id
            })
        })
        .then(res => statusCheck(res))
        .then(resData => {
            setMoreInfo(resData)
            console.log(resData)
        })
        .catch(err => console.log(err))

        console.log(data)
    }, [])

    const pre = (moreInfo)?moreInfo.requirementsInfo.map(pre => (pre.code_type+pre.code_number + ' '))[0]:''

    return(
        data && moreInfo ?
        <div className={`courseItem ${!layout?'list':''}`}>
            <p onClick={() => setMore(!more)}>
                Name: {data.description}<br/>
                Type: {data.code_type}<br/>
                Teacher: {data.teacher_name}<br/>
                Start: {data.start_time}<br/>
                End: {data.end_time}<br/>
                Enrolled Count: {moreInfo.enrolled_count}<br />
                Capacity : {data.capacity}<br/>
                {
                    more &&
                    <>
                        Location: {data.location}<br/>
                        Season: {data.season}<br/>
                        Year: {data.year}<br/>
                        Pre-req(s): {pre?pre:''}
                    </>
                }
            </p>
            {!isWaiting ? <input type="button" value={isRegisterd ? 'Drop':'Register'} onClick={()=>handleClick(isRegisterd, setRegistered, refresh)}  /> : <p>In wating List</p>}
        </div> : <p>Loading data </p>
    )
}