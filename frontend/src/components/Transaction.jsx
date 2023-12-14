/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for past transactions page
*/


import { useEffect, useState } from "react";
import CourseSearch from './CourseSearch'
import { statusCheck } from "../helper";

export default ({layout}) => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [entireCourseList, setEntireCoursesList] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(()=>{
      fetch('http://localhost:8000/GetHistory',
      {
        credentials: 'include'
      }).then(res => statusCheck(res))
      .then(data => {
        setData(data)
        setFilteredData(data)
      })
      .catch(() => {})

      fetch('http://localhost:8000/GetEntireCourseList',
      {
        credentials: 'include'
      }).then(res => statusCheck(res))
      .then(data => {
        setData(data)
        setEntireCoursesList(data)
      })
      .catch(() => {})
    },[])

    function getName(entireCourseList, lookfor)
    {
      const toReturn = entireCourseList.filter(i => i.id == lookfor)
      return (toReturn.length) ? toReturn[0].description : ''
    }

    return (
        <>
          <CourseSearch layout={toggle} setLayout={setToggle} isTransaction={true} items={data} categories={['id']} setList={setFilteredData} />
          {entireCourseList && filteredData ? (
            <>
              {filteredData.map((item, index) => (
                //This is were the transaction component is to go
                <div className={`transactionItem ${!toggle?'list':''}`} key={index}>
                  <p>
                      Name: {getName(entireCourseList, item.course_id)}<br/>
                      Type: {item.action_type}<br/>
                      date: {item.date_time}<br/>
                      Confirmation Id: {item.confirmation_number}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <>Loading the users transactions</>
          )}
        </>
      );
}
