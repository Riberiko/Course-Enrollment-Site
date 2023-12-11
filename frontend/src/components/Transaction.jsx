import { useEffect, useState } from "react";
import CourseSearch from './CourseSearch'
import { statusCheck } from "../helper";

export default ({layout}) => {
    const [isLoading, setLoading] = useState()

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(()=>{
      fetch('http://localhost:8000/GetHistory',
        {
            method: "GET",
            credentials: 'include'
        }).then(res => statusCheck(res))
        .then(data => {
          setData(data)
          setFilteredData(data)
          setLoading(false)
        })
        .catch(err => console.log(err.message))
    },[])

    return (
        <>
          <CourseSearch layout={toggle} setLayout={setToggle} isTransaction={true} items={data} categories={['id', 'name']} setList={setFilteredData} />
          {!isLoading ? (
            <>
              {filteredData.map((item, index) => (
                //This is were the transaction component is to go
                <div className={`transactionItem ${!toggle?'list':''}`}>
                  <p onClick={() => setMore(!more)}>
                      Name: {item.name}<br/>
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