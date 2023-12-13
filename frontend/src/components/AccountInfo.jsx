/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for Account Info page
*/

import { useEffect, useState } from "react"
import { statusCheck } from "../helper"
import ClassItem from "./ClassItem"

export default () => {

    const [data, setData] = useState()

    const [enrolled, setEnrolled] = useState()
    const [dropped, setDropped] = useState()
    const [waiting, setWaiting] = useState()

    const [refresh, setRefresh] = useState()


    function triggerRefrsh()
    {
        setRefresh(!refresh)
    }

    useEffect(()=>{
        fetch('http://localhost:8000/getStudentById',{
            'credentials':'include'
        })
        .then(res => statusCheck(res))
        .then(data => setData(data[0]))
        .catch(err => console.log(err))

        fetch('http://localhost:8000/getEnrolledCourses', {'credentials' : 'include'})
        .then(res => statusCheck(res))
        .then(data => setEnrolled(data.response))
        .catch(err => console.log(err))

        fetch('http://localhost:8000/getDroppedCourses', {'credentials' : 'include'})
        .then(res => statusCheck(res))
        .then(data => setDropped(data.response))
        .catch(err => console.log(err))

        fetch('http://localhost:8000/getWaitingClasses', {'credentials' : 'include'})
        .then(res => statusCheck(res))
        .then(data => setWaiting(data.response))
        .catch(err => console.log(err))
    }, [refresh])

    return(
        (data && enrolled && dropped && waiting) ? 
        <>
            <section>
                <img src="" alt="" />
                <p>Name: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}</p>
                <p>Email: {data.email}</p>
                <p>Phone #: {data.phone_number}</p>

            </section>
            <section>
                <h2>Current Enrolled Classes</h2>
                <div className="flex">
                    {enrolled.length == 0 ? <p>No Enrolled classes</p> : enrolled.map((item, index) => <ClassItem key={index} refresh={triggerRefrsh} layout={true} data={item}/>)}
                </div>
            </section>
            <section>
                <h2>Current Dropped Classes</h2>
                <div className="flex">
                    {dropped.length == 0 ? <p>No Dropped classes</p> : dropped.map((item, index) => <ClassItem key={index} refresh={triggerRefrsh} layout={true} data={item}/>)}
                </div>
            </section>
            <section>
                <h2>Current Wait Listed Classes</h2>
                <div className="flex">
                    {waiting.length == 0 ? <p>No Wait Listed classes</p> : waiting.map((item, index) => <ClassItem key={index} isWaiting={true} layout={true} data={item}/>)}
                </div>
            </section>
        </> : <>Loading User data</>
    )
}
