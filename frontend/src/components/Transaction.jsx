import { useState } from "react";
import CourseSearch from './CourseSearch'

export default () => {
    const [isLoading, setLoading] = useState()

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    return (
        <>
          <CourseSearch isTransaction={true} items={data} categories={['id', 'name']} setList={setFilteredData} />
          {!isLoading ? (
            <>
              {filteredData.map((item, index) => (
                //This is were the transaction component is to go
                <></>
              ))}
            </>
          ) : (
            <>Loading the users transactions</>
          )}
        </>
      );
}