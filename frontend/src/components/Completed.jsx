import { useEffect, useState } from "react";
import { statusCheck } from "../helper";

export default () => {
    const [data, setData] = useState([])

    useEffect(()=>{
      fetch('http://localhost:8000/getCompletedCourses',
      {
        credentials: 'include'
      }).then(res => statusCheck(res))
      .then(data => {
        setData(data.response)
      })
      .catch(err => console.log(err.message))
    },[])

    return (
        <>
        {data && data.map((item, index) => (
        //This is were the transaction component is to go
        <div className={'transactionItem list'} key={index}>
            <p>
                Name: {item.description}<br/>
                Code Name: {item.code_type+item.code_number}<br/>
                GPA: {item.gpa}<br/>
                Confirmation Id: {item.confirmation_number}<br/>
                Season: {item.season}<br/>
                Year: {item.year}<br/>
            </p>
        </div>
        ))}
        </>
      );
}